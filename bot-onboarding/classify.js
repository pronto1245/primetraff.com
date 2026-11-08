// Reads a partner's free-text answer: language, and whether it names a traffic source or a GEO.

const SOURCE_STEMS = [
  "fb", "facebook", "фб", "фейсбук", "фейс", "meta", "мета",
  "tt", "tiktok", "tik tok", "тикток", "тик ток", "тт",
  "seo", "сео", "ppc", "ппц", "google", "гугл", "uac", "уак", "adwords", "ads",
  "insta", "инст", "instagram",
  "email", "e-mail", "мейл", "емейл", "имейл", "рассылк", "sms", "смс",
  "push", "пуш", "inpage", "in-page", "inapp", "in-app", "инапп", "ин-апп", "иннапп",
  "aso", "асо", "pwa", "пва", "прил", "app",
  "telegram", "телеграм", "телега", "тг", "tg",
  "influ", "инфлю", "блогер", "blogger", "stream", "стрим", "twitch", "kick", "youtube", "ютуб", "yt",
  "native", "натив", "тизер", "teaser", "pop", "попс", "поп", "propeller", "richads",
  "bing", "яндекс", "yandex", "директ", "vk", "вк", "mytarget", "snapchat", "снэп", "reddit", "twitter", "твиттер",
  "дорв", "doorway", "мотив", "incent", "cpa", "контекст", "context", "медийк", "баннер", "banner",
  "whatsapp", "ватсап", "viber", "вайбер", "квиз", "quiz", "арбитраж", "трафик", "traffic",
];

const GEO_STEMS = [
  "tier", "тир", "т1", "т2", "т3", "latam", "латам", "europe", "европ", "снг", "cis", "asia", "ази", "africa", "африк",
  "mena", "nordic", "сканди", "worldwide", "весь мир", "мир", "ww",
  "ital", "итал", "spain", "испан", "german", "герман", "france", "франц", "brazil", "бразил", "mexic", "мексик",
  "india", "инди", "turk", "турц", "poland", "польш", "canad", "канад", "austral", "австрал", "chile", "чили",
  "peru", "перу", "argent", "аргент", "colomb", "колумб", "portug", "португ", "austria", "австри", "swiss", "switzerland", "швейц",
  "netherland", "holland", "нидерл", "голланд", "belgi", "бельг", "greece", "грец", "czech", "чех", "romani", "румын",
  "hungar", "венгр", "kazakh", "казах", "uzbek", "узбек", "azerb", "азерб", "ukrain", "украин", "russia", "росси", "рф",
  "japan", "япон", "korea", "коре", "thai", "таил", "vietnam", "вьетнам", "philippin", "филиппин", "indones", "индонез",
  "malays", "малайз", "nigeria", "нигер", "kenya", "кени", "egypt", "египет", "uae", "оаэ", "emirat", "эмират", "saudi", "саудов",
  "finland", "финлян", "norway", "норвег", "sweden", "швец", "denmark", "дани", "ireland", "ирланд", "англи", "britain", "британ", "england",
  "usa", "сша", "америк", "america", "zealand", "зеланд", "bangladesh", "бангладеш", "pakistan", "пакистан", "ecuador", "эквадор",
  "bolivia", "боливи", "venezuel", "венесуэл", "uruguay", "уругва", "paraguay", "парагва", "georgia", "грузи", "armeni", "армени",
  "moldov", "молдов", "belarus", "беларус", "белорус", "serbi", "серби", "croati", "хорвати", "slovak", "словак", "sloven", "словен",
  "bulgar", "болгар", "lithuan", "литв", "latvi", "латви", "eston", "эстони", "cyprus", "кипр", "israel", "израил",
  "morocco", "марокк", "tunis", "тунис", "south africa", "юар", "ghana", "гана", "dominican", "доминик", "costa rica", "коста",
  "guatemala", "гватемал", "panama", "панам", "kyrgyz", "киргиз", "кыргыз", "tajik", "таджик",
];

// ISO 3166 alpha-2 codes that partners usually write as GEO
const ISO_CODES = new Set((
  "AE AR AT AU AZ BD BE BG BO BR BY CA CH CL CO CR CY CZ DE DK DO EC EE EG ES FI FR GB GE GH GR GT HR HU ID IE IL IN IT " +
  "JP KE KG KR KZ LT LV MA MD MX MY NG NL NO NZ PA PE PH PK PL PT PY RO RS RU SA SE SI SK TH TJ TN TR UA UK US UY UZ VE VN ZA"
).split(" "));

// Two-letter codes that are also common words when written in lowercase
const LOWERCASE_WORD_CODES = new Set(["it", "in", "us", "at", "be", "no", "is", "id", "my", "me", "ma", "pe", "pa", "do", "so", "to", "by", "an", "as", "or", "on", "of", "if", "go", "he", "hi", "we", "up", "am"]);

function detectLanguage(text) {
  const cyr = (text.match(/[а-яё]/gi) || []).length;
  const lat = (text.match(/[a-z]/gi) || []).length;
  return cyr > 0 && cyr >= lat ? "ru" : "en";
}

function words(text) {
  return text.split(/[^\p{L}\p{N}-]+/u).filter(Boolean);
}

function hasSource(text) {
  const lower = text.toLowerCase();
  return SOURCE_STEMS.some((stem) => {
    if (stem.length <= 3) return words(lower).some((w) => w === stem || w.replace(/-/g, "") === stem.replace(/-/g, ""));
    return lower.includes(stem);
  });
}

function hasGeo(text) {
  const lower = text.toLowerCase();
  for (const w of words(text)) {
    const upper = w.toUpperCase();
    if (w.length === 2 && ISO_CODES.has(upper)) {
      if (w === upper) return true; // written as a code: IT, ES
      if (!LOWERCASE_WORD_CODES.has(w.toLowerCase())) return true;
    }
  }
  return GEO_STEMS.some((stem) => {
    if (stem.length <= 2) return words(lower).includes(stem);
    return lower.includes(stem);
  });
}

// Activate only when the answer actually says something about the source or the GEO.
function isSubstantive(text) {
  if (!text || !text.trim()) return false;
  return hasSource(text) || hasGeo(text);
}

module.exports = { detectLanguage, isSubstantive, hasSource, hasGeo };
