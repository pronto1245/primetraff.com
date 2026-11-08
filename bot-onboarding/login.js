// One-time login of the manager account. Asks for phone, code and 2FA password in the terminal
// and saves the session into .env (TG_SESSION). Nothing is printed or sent anywhere else.
const fs = require("fs");
const path = require("path");
const readline = require("readline");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const envPath = path.join(__dirname, ".env");
const apiId = parseInt(process.env.TG_API_ID, 10);
const apiHash = process.env.TG_API_HASH;
if (!apiId || !apiHash) {
  console.error("❌ Сначала впишите TG_API_ID и TG_API_HASH в bot-onboarding/.env");
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, (a) => resolve(a.trim())));

(async () => {
  const client = new TelegramClient(new StringSession(""), apiId, apiHash, { connectionRetries: 5 });
  client.setLogLevel("error");
  await client.start({
    phoneNumber: () => ask("Номер телефона аккаунта (в формате +79991234567): "),
    phoneCode: () => ask("Код из Telegram: "),
    password: () => ask("Пароль двухэтапной проверки (если нет — Enter): "),
    onError: (e) => console.error("Ошибка:", e.message),
  });
  const me = await client.getMe();
  const session = client.session.save();

  let env = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  env = /^TG_SESSION=.*$/m.test(env) ? env.replace(/^TG_SESSION=.*$/m, `TG_SESSION=${session}`) : `${env.trimEnd()}\nTG_SESSION=${session}\n`;
  fs.writeFileSync(envPath, env, { mode: 0o600 });

  console.log(`✅ Вход выполнен: @${me.username || me.id}. Сессия сохранена в .env`);
  rl.close();
  await client.disconnect();
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
