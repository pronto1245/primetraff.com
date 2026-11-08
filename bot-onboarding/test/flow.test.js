const test = require("node:test");
const assert = require("node:assert");
const { createOnboarding } = require("../flow");
const T = require("../texts");

const ME = { id: 777n, username: "manager" };
const nowSec = () => Math.floor(Date.now() / 1000);

function setup(partnersList, opts = {}) {
  const store = new Map(); // publisherId → onboarding
  const log = { botMessages: [], dms: [], chats: [], forwards: [], activated: [] };
  const dialogs = new Map(); // telegram user id → messages
  let nextMsgId = 1;

  const pt = {
    listPartners: async () => partnersList.map((p) => ({ ...p, onboarding: store.get(p.publisherId) ?? null })),
    saveOnboarding: async (id, patch) => {
      const now = new Date().toISOString();
      const cur = { ...(store.get(id) || { status: "new" }), ...patch };
      if (patch.status === "contacted") cur.contactedAt = now;
      if (patch.status === "reminded") cur.remindedAt = now;
      if (patch.status === "chat_created") cur.chatCreatedAt = now;
      if (typeof patch.answer === "string") cur.answeredAt = now;
      store.set(id, cur);
      return cur;
    },
    activate: async (id) => {
      log.activated.push(id);
      const cur = { ...(store.get(id) || {}), status: "activated", activatedAt: new Date().toISOString() };
      store.set(id, cur);
      return { relationStatus: "active", onboarding: cur };
    },
  };
  const bot = {
    sendMessage: async (chatId, text, extra) => { log.botMessages.push({ chatId: String(chatId), text, extra }); },
    answerCallbackQuery: async () => {},
    editMessageReplyMarkup: async () => {},
  };
  const users = { nick_ok: 1001n, nick_quiet: 1002n, nick_short: 1003n, nick_private: 1004n };
  const ub = {
    me: ME,
    resolvePartner: async ({ telegramUserId, telegramUsername }) => {
      const id = telegramUserId ? BigInt(telegramUserId) : users[telegramUsername];
      if (!id) throw Object.assign(new Error("USERNAME_NOT_OCCUPIED"), { errorMessage: "USERNAME_NOT_OCCUPIED" });
      return { id };
    },
    send: async (entity, text) => {
      if (typeof entity === "string") return; // /start to the bot
      const key = entity.id.toString();
      if (!dialogs.has(key)) dialogs.set(key, []);
      dialogs.get(key).push({ id: nextMsgId++, out: true, date: nowSec(), message: text });
      log.dms.push({ to: key, text });
    },
    history: async (entity) => [...(dialogs.get(entity.id.toString()) || [])],
    createChat: async ({ title, partner }) => {
      const partnerAdded = partner.id !== users.nick_private;
      log.chats.push({ title, partnerAdded });
      return { chatId: "55", botApiChatId: "-55", partnerAdded, inviteLink: partnerAdded ? null : "https://t.me/+invite", peer: { chat: 55 } };
    },
    forward: async (peer, from, ids) => { log.forwards.push({ from: from.id.toString(), ids }); },
  };
  const flow = createOnboarding({
    pt, bot, ub, botUser: { username: "primegeneratebot" },
    config: { START_AT: "2026-01-01T00:00:00Z", REMINDER_MS: opts.reminderMs ?? 3600_000, SETTLE_MS: 0, CHAT_DELAY_MS: 0 },
  });
  const reply = (username, text) => {
    const key = users[username].toString();
    dialogs.get(key).push({ id: nextMsgId++, out: false, date: nowSec(), message: text });
  };
  return { flow, store, log, reply, dialogs };
}

const P = (id, telegram, shortId = 12) => ({ publisherId: id, shortId, username: id, email: `${id}@x.io`, telegram, relationStatus: "pending" });

test("substantive answer → activation → chat with forwarded DM and welcome", async () => {
  const { flow, store, log, reply } = setup([P("p1", "@nick_ok")]);
  await flow.tick();
  assert.equal(store.get("p1").status, "contacted");
  assert.equal(log.dms[0].text, T.FIRST_MESSAGE);

  reply("nick_ok", "Лью FB на Италию и Испанию");
  await flow.tick(); // answer → activated
  assert.deepEqual(log.activated, ["p1"]);
  assert.equal(store.get("p1").language, "ru");
  assert.equal(log.dms.at(-1).text, T.ACTIVATED.ru);

  await flow.tick(); // chat
  assert.equal(store.get("p1").status, "chat_created");
  assert.equal(store.get("p1").chatTitle, "PRIMETRAFF | ID 012");
  assert.equal(log.forwards[0].ids.length, 3); // first message, answer, activation
  assert.ok(log.botMessages.some((m) => m.chatId === "-55" && m.text === T.CHAT_WELCOME.ru));

  await flow.tick(); // nothing more happens
  assert.equal(log.chats.length, 1);
});

test("empty answer → needs review → admin activates by button", async () => {
  const { flow, store, log, reply } = setup([P("p2", "nick_short")]);
  await flow.tick();
  reply("nick_short", "ok");
  await flow.tick();
  assert.equal(store.get("p2").status, "needs_review");
  const review = log.botMessages.find((m) => m.extra?.reply_markup);
  assert.equal(review.chatId, "777");
  assert.equal(log.activated.length, 0);

  await flow.onUpdate({ callback_query: { id: "q", data: "ob:act:p2", from: { id: 777 }, message: { chat: { id: 777 }, message_id: 1 } } });
  assert.deepEqual(log.activated, ["p2"]);
  assert.equal(log.dms.at(-1).text, T.ACTIVATED.en);

  // a stranger cannot press the buttons
  await flow.onUpdate({ callback_query: { id: "q2", data: "ob:rej:p2", from: { id: 5 }, message: { chat: { id: 5 }, message_id: 2 } } });
  assert.equal(store.get("p2").status, "activated");
});

test("reminder once after the timeout", async () => {
  const { flow, store, log } = setup([P("p3", "nick_quiet")], { reminderMs: 0 });
  await flow.tick();
  await flow.tick();
  assert.equal(store.get("p3").status, "reminded");
  assert.equal(log.dms.at(-1).text, T.REMINDER);
  await flow.tick();
  assert.equal(log.dms.filter((d) => d.text === T.REMINDER).length, 1);
});

test("no telegram / unknown nick / private partner", async () => {
  const { flow, store, log, reply } = setup([P("p4", null), P("p5", "@nobody_here"), P("p6", "t.me/nick_private")]);
  await flow.tick();
  assert.equal(store.get("p4").status, "no_telegram");
  assert.equal(store.get("p5").status, "dm_failed");
  assert.equal(store.get("p6").status, "contacted");
  assert.equal(store.get("p6").telegramUsername, "nick_private");

  reply("nick_private", "SEO, tier 1");
  await flow.tick();
  await flow.tick();
  assert.equal(store.get("p6").status, "chat_created");
  assert.equal(log.chats.at(-1).partnerAdded, false);
  assert.ok(log.dms.some((d) => d.text === T.CHAT_INVITE.en("https://t.me/+invite")));
});

test("username normalization", () => {
  const { flow } = setup([]);
  assert.equal(flow.normalizeUsername("@Nick_1"), "Nick_1");
  assert.equal(flow.normalizeUsername("https://t.me/nick_ok"), "nick_ok");
  assert.equal(flow.normalizeUsername("+79991234567"), null);
  assert.equal(flow.normalizeUsername("ab"), null);
});
