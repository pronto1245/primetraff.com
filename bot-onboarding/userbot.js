// Manager account (user session via MTProto): first DM, reading replies, creating the chat.
const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const bigInt = require("big-integer");

function errText(e) {
  return e?.errorMessage || e?.message || String(e);
}

async function createUserbot({ apiId, apiHash, session }) {
  const client = new TelegramClient(new StringSession(session), apiId, apiHash, { connectionRetries: 5 });
  client.setLogLevel("error");
  await client.connect();
  if (!(await client.checkAuthorization())) {
    throw new Error("Manager account session is not authorized — run: npm run login");
  }
  const me = await client.getMe();
  // Fill the entity cache so partners already in dialogs resolve by id after a restart
  try { await client.getDialogs({ limit: 200 }); } catch { /* not critical */ }

  async function resolvePartner({ telegramUserId, telegramUsername }) {
    if (telegramUserId) {
      try { return await client.getEntity(bigInt(telegramUserId)); } catch { /* fall back to username */ }
    }
    if (!telegramUsername) throw new Error("NO_USERNAME");
    const entity = await client.getEntity(telegramUsername);
    if (!(entity instanceof Api.User)) throw new Error("NOT_A_USER");
    if (entity.bot) throw new Error("IS_A_BOT");
    return entity;
  }

  async function send(entity, text) {
    return client.sendMessage(entity, { message: text, linkPreview: false });
  }

  // Messages of the private dialog, oldest first
  async function history(entity, limit = 50) {
    const msgs = await client.getMessages(entity, { limit });
    return msgs.filter((m) => m && !(m instanceof Api.MessageService)).reverse();
  }

  // Creates a basic group with the bot and (if privacy allows) the partner.
  async function createChat({ title, botUsername, partner }) {
    const bot = await client.getEntity(botUsername);
    let result;
    let partnerAdded = true;
    try {
      result = await client.invoke(new Api.messages.CreateChat({ users: [bot, partner], title }));
      const missing = result?.missingInvitees || [];
      if (missing.length > 0) partnerAdded = false;
    } catch (e) {
      if (!/PRIVACY|USER_NOT_MUTUAL_CONTACT|USER_CHANNELS_TOO_MUCH|USER_KICKED/i.test(errText(e))) throw e;
      partnerAdded = false;
      result = await client.invoke(new Api.messages.CreateChat({ users: [bot], title }));
    }
    const updates = result?.updates || result;
    const chat = (updates?.chats || []).find((c) => c instanceof Api.Chat);
    if (!chat) throw new Error("CHAT_NOT_CREATED");
    const chatId = chat.id; // BigInteger

    try {
      await client.invoke(new Api.messages.EditChatAdmin({ chatId, userId: bot, isAdmin: true }));
    } catch (e) {
      console.error("[userbot] make bot admin:", errText(e));
    }

    let inviteLink = null;
    if (!partnerAdded) {
      const invite = await client.invoke(new Api.messages.ExportChatInvite({ peer: new Api.InputPeerChat({ chatId }) }));
      inviteLink = invite?.link || null;
    }
    return { chatId: chatId.toString(), botApiChatId: "-" + chatId.toString(), partnerAdded, inviteLink, peer: new Api.InputPeerChat({ chatId }) };
  }

  async function forward(toPeer, fromEntity, messageIds) {
    if (messageIds.length === 0) return;
    await client.forwardMessages(toPeer, { messages: messageIds, fromPeer: fromEntity });
  }

  return { client, me, resolvePartner, send, history, createChat, forward, errText };
}

module.exports = { createUserbot, errText };
