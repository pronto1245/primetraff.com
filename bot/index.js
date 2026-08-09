require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const TOKEN    = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = parseInt(process.env.TELEGRAM_ADMIN_CHAT_ID, 10);

if (!TOKEN || !ADMIN_ID) {
  console.error('❌ Нет TELEGRAM_BOT_TOKEN или TELEGRAM_ADMIN_CHAT_ID');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// Map: userId → { userName, lastMsgId }  — данные пользователей
const users = new Map();

// Если админ нажал "Ответить" — сюда кладём userId ожидаемого ответа
let pendingReplyTo = null;

console.log('✅ PrimeTraff Support Bot запущен');

// ─── /start ────────────────────────────────────────────────────────────────
bot.onText(/\/start/, (msg) => {
  if (msg.chat.id === ADMIN_ID) {
    bot.sendMessage(ADMIN_ID, '👋 Бот запущен. Нажимай кнопку <b>✍️ Ответить</b> под сообщением пользователя.', { parse_mode: 'HTML' });
    return;
  }
  bot.sendMessage(msg.chat.id,
    '👋 Привет! Это поддержка <b>PrimeTraff</b>.\n\nНапиши своё сообщение — менеджер ответит в ближайшее время.',
    { parse_mode: 'HTML' }
  );
});

// ─── Пользователь пишет боту ───────────────────────────────────────────────
bot.on('message', async (msg) => {
  const userId   = msg.chat.id;
  if (userId === ADMIN_ID) return;
  if (msg.text && msg.text.startsWith('/')) return;

  const firstName = msg.from.first_name || '';
  const lastName  = msg.from.last_name  || '';
  const username  = msg.from.username ? `@${msg.from.username}` : null;
  const userName  = username || [firstName, lastName].filter(Boolean).join(' ') || 'Без имени';

  users.set(userId, { userName });

  try {
    const header = `👤 <b>${userName}</b>  |  <code>${userId}</code>\n━━━━━━━━━━━━━━━━━━━━\n`;

    const replyMarkup = {
      inline_keyboard: [[
        { text: '✍️ Ответить', callback_data: `reply:${userId}` }
      ]]
    };

    if (msg.text) {
      await bot.sendMessage(ADMIN_ID, header + msg.text, {
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      });
    } else if (msg.photo) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;
      await bot.sendPhoto(ADMIN_ID, fileId, {
        caption: header + (msg.caption || ''),
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      });
    } else if (msg.video) {
      await bot.sendVideo(ADMIN_ID, msg.video.file_id, {
        caption: header + (msg.caption || ''),
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      });
    } else if (msg.document) {
      await bot.sendDocument(ADMIN_ID, msg.document.file_id, {
        caption: header + (msg.caption || ''),
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      });
    } else if (msg.voice) {
      await bot.sendVoice(ADMIN_ID, msg.voice.file_id, {
        caption: header,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      });
    } else if (msg.sticker) {
      await bot.sendMessage(ADMIN_ID, header, { parse_mode: 'HTML' });
      await bot.sendSticker(ADMIN_ID, msg.sticker.file_id, { reply_markup: replyMarkup });
    } else {
      await bot.sendMessage(ADMIN_ID, header, { parse_mode: 'HTML' });
      await bot.forwardMessage(ADMIN_ID, userId, msg.message_id);
      await bot.sendMessage(ADMIN_ID, '⬆️ Сообщение выше', { reply_markup: replyMarkup });
    }

    await bot.sendMessage(userId, '✅ Сообщение получено. Менеджер ответит вам в ближайшее время.');

  } catch (err) {
    console.error('Ошибка пересылки:', err.message);
  }
});

// ─── Кнопка "Ответить" ─────────────────────────────────────────────────────
bot.on('callback_query', async (query) => {
  if (query.from.id !== ADMIN_ID) return;

  const data = query.data;
  if (!data.startsWith('reply:')) return;

  const targetUserId = parseInt(data.split(':')[1], 10);
  const session = users.get(targetUserId);
  const userName = session ? session.userName : String(targetUserId);

  pendingReplyTo = targetUserId;

  await bot.answerCallbackQuery(query.id);
  await bot.sendMessage(ADMIN_ID,
    `✍️ Пишешь ответ для <b>${userName}</b>.\n\nОтправь сообщение — оно уйдёт пользователю.\n/cancel — отменить`,
    { parse_mode: 'HTML' }
  );
});

// ─── Ответ админа после нажатия кнопки ────────────────────────────────────
bot.on('message', async (msg) => {
  if (msg.chat.id !== ADMIN_ID) return;
  if (!pendingReplyTo) return;

  // Отмена
  if (msg.text && msg.text === '/cancel') {
    pendingReplyTo = null;
    await bot.sendMessage(ADMIN_ID, '❌ Отправка отменена.');
    return;
  }

  const targetUserId = pendingReplyTo;
  const session = users.get(targetUserId);
  const userName = session ? session.userName : String(targetUserId);
  pendingReplyTo = null;

  try {
    if (msg.text) {
      await bot.sendMessage(targetUserId, msg.text);
    } else if (msg.photo) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;
      await bot.sendPhoto(targetUserId, fileId, { caption: msg.caption || '' });
    } else if (msg.video) {
      await bot.sendVideo(targetUserId, msg.video.file_id, { caption: msg.caption || '' });
    } else if (msg.document) {
      await bot.sendDocument(targetUserId, msg.document.file_id, { caption: msg.caption || '' });
    } else if (msg.voice) {
      await bot.sendVoice(targetUserId, msg.voice.file_id);
    } else if (msg.sticker) {
      await bot.sendSticker(targetUserId, msg.sticker.file_id);
    }

    await bot.sendMessage(ADMIN_ID, `✅ Ответ отправлен → <b>${userName}</b>`, { parse_mode: 'HTML' });
  } catch (err) {
    console.error('Ошибка ответа:', err.message);
    await bot.sendMessage(ADMIN_ID, `❌ Не смог отправить: ${err.message}`);
  }
});

// ─── Polling errors ────────────────────────────────────────────────────────
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});
