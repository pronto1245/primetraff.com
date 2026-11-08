require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { createPrimeTrack } = require("./primetrack");
const { createBot } = require("./botapi");
const { createUserbot, errText } = require("./userbot");
const { createOnboarding } = require("./flow");

const env = process.env;
for (const key of ["PRIMETRACK_URL", "PRIMETRACK_API_KEY", "BOT_TOKEN", "TG_API_ID", "TG_API_HASH", "TG_SESSION", "START_AT"]) {
  if (!env[key]) { console.error(`❌ ${key} is not set in bot-onboarding/.env`); process.exit(1); }
}
if (isNaN(new Date(env.START_AT).getTime())) { console.error("❌ START_AT must be an ISO date"); process.exit(1); }

const config = {
  START_AT: env.START_AT,
  REMINDER_MS: (parseFloat(env.REMINDER_HOURS) || 24) * 3600 * 1000,
  SETTLE_MS: (parseInt(env.ANSWER_SETTLE_SECONDS, 10) || 45) * 1000,
  CHAT_DELAY_MS: (parseInt(env.CHAT_DELAY_SECONDS, 10) || 90) * 1000,
};
const POLL_MS = (parseInt(env.POLL_SECONDS, 10) || 60) * 1000;

async function main() {
  const pt = createPrimeTrack({ baseUrl: env.PRIMETRACK_URL, apiKey: env.PRIMETRACK_API_KEY });
  const bot = createBot(env.BOT_TOKEN);
  const botUser = await bot.getMe();
  const ub = await createUserbot({ apiId: parseInt(env.TG_API_ID, 10), apiHash: env.TG_API_HASH, session: env.TG_SESSION });
  const flow = createOnboarding({ pt, bot, ub, botUser, config });
  console.log(`✅ PrimeTraff onboarding: bot @${botUser.username}, manager @${ub.me.username || ub.me.id}, partners joined after ${env.START_AT}`);
  bot.poll(flow.onUpdate);
  for (;;) {
    await flow.tick();
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
}

main().catch((e) => { console.error("❌", errText(e)); process.exit(1); });
