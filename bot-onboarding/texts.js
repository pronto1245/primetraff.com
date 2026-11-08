// All texts sent to partners. Edit freely; restart the process after changes.

const FIRST_MESSAGE =
  "Привет! Вижу твою регистрацию у нас в партнерке PrimeTraff, подскажи, какой у тебя источник и какие гео льешь?\n\n" +
  "Hi! I see you've registered with our PrimeTraff affiliate program. Could you tell me your traffic source and which GEOs you run?";

const REMINDER =
  "Привет! Напомню о себе 🙂 Подскажи, какой у тебя источник и какие гео льешь?\n\n" +
  "Hi! Just a quick reminder 🙂 What's your traffic source and which GEOs do you run?";

const ACTIVATED = {
  ru: "Аккаунт активирован! Можешь пока ознакомиться с сайтом и офферами. Скоро создам чат, там продолжим общение.",
  en: "Your account is activated! Feel free to look around the site and offers. I'll create a chat shortly and we'll continue there.",
};

// Sent in DM only when the partner could not be added to the chat directly
const CHAT_INVITE = {
  ru: (link) => `Создал чат, заходи: ${link}`,
  en: (link) => `I've created a chat, join here: ${link}`,
};

// Posted by the bot in the new chat
const CHAT_WELCOME = {
  ru: "Привет! Я бот PrimeTraff 🤖 Здесь будут уведомления и подбор офферов. Менеджер тоже в чате — пиши сюда по любым вопросам.",
  en: "Hi! I'm the PrimeTraff bot 🤖 You'll get notifications and offer suggestions here. Your manager is in this chat too — write here with any questions.",
};

function chatTitle(shortId) {
  return `PRIMETRAFF | ID ${shortId != null ? String(shortId).padStart(3, "0") : "—"}`;
}

module.exports = { FIRST_MESSAGE, REMINDER, ACTIVATED, CHAT_INVITE, CHAT_WELCOME, chatTitle };
