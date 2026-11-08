// Onboarding flow: first DM → reminder → answer → activation → chat. Dependencies are injected.
const { detectLanguage, isSubstantive } = require("./classify");
const { errText } = require("./userbot");
const T = require("./texts");

function createOnboarding({ pt, bot, ub, botUser, config }) {
  const { START_AT, REMINDER_MS, SETTLE_MS, CHAT_DELAY_MS } = config;
  const partners = new Map(); // publisherId → last record from PrimeTrack
  const busy = new Set();     // publisherIds being processed
  const firstSent = new Set(); // first DM already sent in this process (guards against a failed save)

  const pid = (p) => `#${p.shortId != null ? String(p.shortId).padStart(3, "0") : "—"}`;
  const who = (p) => `${pid(p)} ${p.username || ""}${p.email ? ` (${p.email})` : ""}`.trim();
  const ts = (d) => (d ? new Date(d).getTime() : 0);

  function normalizeUsername(raw) {
    if (!raw) return null;
    let v = String(raw).trim();
    v = v.replace(/^https?:\/\//i, "").replace(/^(www\.)?(t\.me|telegram\.me)\//i, "").replace(/^@+/, "");
    v = v.split(/[/?#\s]/)[0];
    return /^[A-Za-z][A-Za-z0-9_]{3,31}$/.test(v) ? v : null;
  }

  async function notifyAdmin(text, extra = {}) {
    try {
      await bot.sendMessage(ub.me.id.toString(), text, extra);
    } catch (e) {
      if (e.code === 403 || e.code === 400) {
        // The manager account has not started the bot yet — start it and retry once
        try {
          await ub.send(botUser.username, "/start");
          await new Promise((r) => setTimeout(r, 1500));
          await bot.sendMessage(ub.me.id.toString(), text, extra);
          return;
        } catch (e2) { console.error("[notify]", e2.message); return; }
      }
      console.error("[notify]", e.message);
    }
  }

  async function save(p, patch) {
    const data = await pt.saveOnboarding(p.publisherId, patch);
    p.onboarding = { ...(p.onboarding || {}), ...data };
    return data;
  }

  // 1. New partner → first DM
  async function contactNew(p) {
    const username = normalizeUsername(p.telegram);
    if (!username) {
      await save(p, { status: "no_telegram", telegramUsername: p.telegram || null, error: p.telegram ? "Некорректный Telegram-ник" : "Нет Telegram в регистрации" });
      await notifyAdmin(`⚠️ Новый партнёр ${who(p)}: ${p.telegram ? `некорректный Telegram «${p.telegram}»` : "нет Telegram в регистрации"}. Свяжитесь вручную.`);
      return;
    }
    if (firstSent.has(p.publisherId)) return;
    try {
      const entity = await ub.resolvePartner({ telegramUsername: username });
      await ub.send(entity, T.FIRST_MESSAGE);
      firstSent.add(p.publisherId);
      await save(p, { status: "contacted", telegramUsername: username, telegramUserId: entity.id.toString(), error: null });
      await notifyAdmin(`🆕 Новый партнёр ${who(p)} — написал в личку @${username}`);
    } catch (e) {
      const reason = errText(e);
      await save(p, { status: "dm_failed", telegramUsername: username, error: `Не удалось написать: ${reason}` });
      await notifyAdmin(`⚠️ Новый партнёр ${who(p)}: не удалось написать @${username} (${reason}). Свяжитесь вручную.`);
    }
  }

  // 2. Waiting for the answer: read the DM, remind after 24h, handle the answer
  async function checkAnswer(p) {
    const ob = p.onboarding;
    const entity = await ub.resolvePartner(ob);
    const msgs = await ub.history(entity, 30);
    const since = Math.floor(ts(ob.contactedAt) / 1000);
    const incoming = msgs.filter((m) => !m.out && m.date >= since);

    if (incoming.length === 0) {
      if (ob.status === "contacted" && Date.now() - ts(ob.contactedAt) >= REMINDER_MS) {
        await ub.send(entity, T.REMINDER);
        await save(p, { status: "reminded" });
        await notifyAdmin(`🔔 Партнёр ${who(p)} не ответил — отправил напоминание`);
      }
      return;
    }

    // The partner may send several messages — wait until he stops typing
    const last = incoming[incoming.length - 1];
    if (Date.now() - last.date * 1000 < SETTLE_MS) return;

    const answer = incoming.map((m) => m.message || (m.media ? "[медиа]" : "")).filter(Boolean).join("\n").slice(0, 4000);
    const language = detectLanguage(answer);
    await save(p, { answer, language });

    if (isSubstantive(answer)) {
      await activate(p, entity, language);
      await notifyAdmin(`✅ Партнёр ${who(p)} ответил: «${answer}»\nАккаунт активирован, скоро создам чат.`);
    } else {
      await save(p, { status: "needs_review" });
      await notifyAdmin(`❓ Партнёр ${who(p)} ответил: «${answer}»\nВ ответе нет источника или гео — проверь.`, {
        reply_markup: { inline_keyboard: [[
          { text: "✅ Активировать", callback_data: `ob:act:${p.publisherId}` },
          { text: "❌ Отклонить", callback_data: `ob:rej:${p.publisherId}` },
        ]] },
      });
    }
  }

  async function activate(p, entity, language) {
    await pt.activate(p.publisherId);
    p.onboarding = { ...(p.onboarding || {}), status: "activated", activatedAt: new Date().toISOString() };
    await ub.send(entity, T.ACTIVATED[language === "ru" ? "ru" : "en"]);
  }

  // 3. Activated → create chat, add bot and partner, forward the DM, welcome
  async function createChat(p) {
    const ob = p.onboarding;
    if (Date.now() - ts(ob.activatedAt) < CHAT_DELAY_MS) return;
    const lang = ob.language === "ru" ? "ru" : "en";
    const entity = await ub.resolvePartner(ob);
    const title = T.chatTitle(p.shortId);

    const chat = await ub.createChat({ title, botUsername: botUser.username, partner: entity });
    await save(p, { status: "chat_created", chatId: chat.botApiChatId, chatTitle: title, error: chat.partnerAdded ? null : "Партнёр не добавлен напрямую — отправлена ссылка" });

    try {
      // Only the onboarding conversation (from the first message on), not older personal history
      const from = ts(ob.contactedAt) / 1000 - 5;
      const msgs = (await ub.history(entity, 50)).filter((m) => m.date >= from);
      await ub.forward(chat.peer, entity, msgs.map((m) => m.id));
    } catch (e) { console.error("[chat] forward:", errText(e)); }

    try { await bot.sendMessage(chat.botApiChatId, T.CHAT_WELCOME[lang]); } catch (e) { console.error("[chat] welcome:", e.message); }

    if (!chat.partnerAdded && chat.inviteLink) {
      await ub.send(entity, T.CHAT_INVITE[lang](chat.inviteLink));
    }
    await notifyAdmin(`💬 Чат создан: ${title}${chat.partnerAdded ? "" : "\nПартнёра нельзя добавить напрямую — отправил ему ссылку-приглашение."}`);
  }

  async function handlePartner(p) {
    if (busy.has(p.publisherId)) return;
    busy.add(p.publisherId);
    try {
      const status = p.onboarding?.status || "new";
      if (status === "new") await contactNew(p);
      else if (status === "contacted" || status === "reminded") await checkAnswer(p);
      else if (status === "activated") await createChat(p);
    } catch (e) {
      const msg = errText(e);
      console.error(`[partner ${p.publisherId}]`, msg);
      const wait = /FLOOD_WAIT_(\d+)/.exec(msg) || (e.seconds ? [null, e.seconds] : null);
      if (wait) await new Promise((r) => setTimeout(r, Math.min(Number(wait[1]), 600) * 1000));
    } finally {
      busy.delete(p.publisherId);
    }
  }

  async function tick() {
    let list;
    try {
      list = await pt.listPartners(new Date(START_AT).toISOString());
    } catch (e) {
      console.error("[tick]", e.message);
      return;
    }
    for (const p of list || []) {
      partners.set(p.publisherId, p);
      if (p.relationStatus === "blocked") continue;
      await handlePartner(p);
    }
  }

  // Admin buttons for answers that need a review
  async function onUpdate(u) {
    if (u.callback_query) {
      const q = u.callback_query;
      const [ns, action, publisherId] = String(q.data || "").split(":");
      if (ns !== "ob" || String(q.from.id) !== ub.me.id.toString()) return bot.answerCallbackQuery(q.id);
      const p = partners.get(publisherId);
      if (!p) return bot.answerCallbackQuery(q.id, "Партнёр не найден, попробуйте через минуту");
      if (p.onboarding?.status !== "needs_review") return bot.answerCallbackQuery(q.id, "Уже обработано");
      busy.add(publisherId);
      try {
        if (action === "act") {
          const entity = await ub.resolvePartner(p.onboarding);
          await activate(p, entity, p.onboarding.language);
          await bot.answerCallbackQuery(q.id, "Активирован");
          await bot.sendMessage(q.message.chat.id, `✅ ${who(p)} активирован, скоро создам чат.`);
        } else if (action === "rej") {
          await save(p, { status: "rejected" });
          await bot.answerCallbackQuery(q.id, "Отклонён");
          await bot.sendMessage(q.message.chat.id, `❌ ${who(p)} отклонён.`);
        }
        await bot.editMessageReplyMarkup(q.message.chat.id, q.message.message_id, { inline_keyboard: [] }).catch(() => {});
      } catch (e) {
        await bot.answerCallbackQuery(q.id, "Ошибка: " + errText(e).slice(0, 150)).catch(() => {});
      } finally {
        busy.delete(publisherId);
      }
      return;
    }
    const m = u.message;
    if (m?.chat?.type === "private" && /^\/start/.test(m.text || "")) {
      if (String(m.from.id) === ub.me.id.toString()) {
        await bot.sendMessage(m.chat.id, "Бот онбординга PrimeTraff работает. Сюда приходят уведомления о новых партнёрах.");
      } else {
        const manager = ub.me.username ? ` @${ub.me.username}` : "";
        await bot.sendMessage(m.chat.id, `Это бот PrimeTraff. По вопросам пишите менеджеру${manager}.\nThis is the PrimeTraff bot. Please contact your manager${manager}.`);
      }
    }
  }


  return { tick, onUpdate, handlePartner, partners, normalizeUsername };
}

module.exports = { createOnboarding };
