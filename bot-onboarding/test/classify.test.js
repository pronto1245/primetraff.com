const test = require("node:test");
const assert = require("node:assert");
const { detectLanguage, isSubstantive } = require("../classify");

test("substantive answers", () => {
  for (const t of ["FB, Италия и Испания", "fb it es", "лью тт на бразилию", "SEO, tier 1", "PPC DE AT CH", "асо, латам",
    "Facebook, Italy", "push in-page, азия", "инфлюенсеры, снг", "UAC BR MX", "мотив", "Google Ads, Canada"]) {
    assert.equal(isSubstantive(t), true, t);
  }
});

test("empty answers", () => {
  for (const t of ["ок", "ok", "?", "привет", "hi", "да", "Hello there", "спасибо", "it is ok", "сейчас напишу", "👍"]) {
    assert.equal(isSubstantive(t), false, t);
  }
});

test("language", () => {
  assert.equal(detectLanguage("Лью FB на Италию"), "ru");
  assert.equal(detectLanguage("FB Italy"), "en");
  assert.equal(detectLanguage("fb тир 1"), "ru");
  assert.equal(detectLanguage("Facebook, Spain"), "en");
});
