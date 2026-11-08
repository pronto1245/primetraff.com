// Minimal Telegram Bot API client with long polling (no extra dependencies)

function createBot(token) {
  const base = `https://api.telegram.org/bot${token}`;
  let offset = 0;
  let stopped = false;

  async function call(method, params = {}) {
    const res = await fetch(`${base}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const json = await res.json().catch(() => ({}));
    if (!json.ok) {
      const err = new Error(`Bot API ${method}: ${json.error_code || res.status} ${json.description || ""}`.trim());
      err.code = json.error_code || res.status;
      throw err;
    }
    return json.result;
  }

  async function poll(onUpdate) {
    while (!stopped) {
      try {
        const updates = await call("getUpdates", { offset, timeout: 30, allowed_updates: ["message", "callback_query"] });
        for (const u of updates) {
          offset = u.update_id + 1;
          try { await onUpdate(u); } catch (e) { console.error("[bot] update handler:", e.message); }
        }
      } catch (e) {
        console.error("[bot] polling:", e.message);
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  }

  return {
    call,
    poll,
    stop: () => { stopped = true; },
    getMe: () => call("getMe"),
    sendMessage: (chatId, text, extra = {}) => call("sendMessage", { chat_id: chatId, text, disable_web_page_preview: true, ...extra }),
    answerCallbackQuery: (id, text) => call("answerCallbackQuery", { callback_query_id: id, text }),
    editMessageReplyMarkup: (chatId, messageId, markup) =>
      call("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: markup }),
  };
}

module.exports = { createBot };
