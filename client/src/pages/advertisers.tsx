import { useState } from 'react';
import { ArrowRight, Headphones, Send, UserRound } from 'lucide-react';
import { NavHeader, FixedFooterBar, SHARED_STYLES, BLUE, FONT, TYPE, TRACK, PAD } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';
import bgImage from '@/assets/dsb-bg.webp';

const SUPPORT_URL  = 'https://t.me/primetrack_support_bot';
const CHANNEL_URL  = 'https://t.me/prime_traf';

const ScrollHint = () => (
  <div className="scroll-hint absolute left-1/2 z-20 pointer-events-none" style={{ bottom: 22, transform: 'translateX(-50%)' }}>
    <svg width="86" height="22" viewBox="0 0 86 22" fill="none">
      <path d="M2 2 L43 19 L84 2" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const REVIEWS = [
  { name: 'Селена', text: 'Работаем с командой давно, предоставляют веб-мастеров с хорошим трафиком на наши продукты. Как рекламодатель, мы очень довольны сотрудничеством.' },
  { name: 'Джон', text: 'Это первое сотрудничество, когда партнёрская программа реально фильтрует фрод. Трафик качественный, показатели выше, чем мы ожидали.' },
  { name: 'Марко', text: 'Больше всего качественных потоков с трафиком — результат говорит сам за себя. Работаем уже три года и продолжаем масштабироваться.' },
  { name: 'Анна', text: 'Прозрачная работа с источниками: слабые сорсы отключают сами, не дожидаясь наших претензий. Такое отношение — редкость на рынке.' },
  { name: 'Давид', text: 'Качество трафика стабильно высокое, ретеншн игроков заметно лучше среднего по рынку. Рекомендуем как надёжного партнёра.' },
  { name: 'Ольга', text: 'Быстрая коммуникация и честная позиция по невалиду. Все спорные кейсы решаются в течение суток, без затяжных разбирательств.' },
  { name: 'Томас', text: 'Подключились полгода назад — объёмы выросли в три раза без потери качества. Команда действительно следит за каждым потоком.' },
  { name: 'Ирина', text: 'Работали со многими сетями, но здесь лучший баланс объёма и качества. Фрода практически нет, конверсия в депозит стабильная.' },
  { name: 'Алекс', text: 'Ценим за принципиальность: сомнительные источники не допускаются вообще. Для нас это ключевой фактор долгосрочного сотрудничества.' },
  { name: 'Мария', text: 'Отличные показатели по FTD и удержанию. Менеджеры глубоко понимают продукт и подбирают действительно релевантные источники.' },
  { name: 'Виктор', text: 'Сотрудничаем второй год — ни одного серьёзного инцидента с качеством. Масштабируют только то, что реально приносит результат.' },
];

const FAQ_ITEMS_RU = [
  { q: 'Как скоро после подключения на продукт пойдёт трафик?', a: 'Обычно первые переходы появляются сразу после запуска: под ваш продукт мы подбираем веб-мастеров с подходящими источниками заранее, поэтому старт происходит без длительного разгона.' },
  { q: 'По каким ГЕО вы льёте?', a: 'Покрываем широкий список регионов — Tier-1, Европу, СНГ, Азию и LatAm. Конкретный набор ГЕО под ваш продукт согласовываем на этапе обсуждения условий.' },
  { q: 'На какие объёмы трафика можно рассчитывать?', a: 'Точную цифру заранее назвать нельзя: объём напрямую зависит от условий выкупа с вашей стороны и конверта самого продукта. Чем конкурентнее условия — тем больше сорсов подключается к работе.' },
  { q: 'Сколько занимает подключение и интеграция?', a: 'Скорость зависит от обеих сторон. Если ответы приходят быстро и постбеки настраиваются без задержек, полная интеграция реальна за один рабочий день.' },
  { q: 'Какие KPI вы готовы принимать в работу?', a: 'Для нас главное — реалистичность показателей и баланс интересов: условия должны работать и на бренд, и на веб-мастеров. Офферы с заведомо недостижимыми KPI мы в сеть не берём.' },
  { q: 'Есть ли гарантии, что привлечённые игроки будут активны?', a: 'Жёстких гарантий активности не даёт никто: она зависит не только от источников, но и от самого продукта и работы его retention-команды. Со своей стороны мы жёстко фильтруем веб-мастеров на входе, что заметно повышает долю качественного трафика.' },
  { q: 'Из каких шагов состоит запуск?', a: 'Процесс простой: согласование условий → юридическая проверка → интеграция ссылок и настройка постбеков → тестовые конверсии → запуск трафика.' },
  { q: 'Подключаете ли крипто-продукты?', a: 'Да, с крипто-вертикалью работаем. Условия и требования по таким продуктам обсуждаются с менеджером индивидуально.' },
];

const FAQ_ITEMS_EN = [
  { q: 'How soon will traffic come to the product after connection?', a: 'Usually the first clicks appear immediately after launch: we select webmasters with suitable sources for your product in advance, so the start happens without a lengthy warm-up.' },
  { q: 'What GEOs do you work with?', a: 'We cover a wide range of regions — Tier-1, Europe, CIS, Asia, and LatAm. The specific set of GEOs for your product is agreed at the stage of discussing terms.' },
  { q: 'What traffic volumes can be expected?', a: "The exact number cannot be given in advance: volume directly depends on your buyout terms and the product's conversion rate. The more competitive the terms, the more sources get connected." },
  { q: 'How long does connection and integration take?', a: 'Speed depends on both parties. If responses come quickly and postbacks are set up without delays, full integration is realistic within one business day.' },
  { q: 'What KPIs are you willing to work with?', a: "For us, the main thing is the realism of metrics and a balance of interests: terms must work for both the brand and webmasters. We don't take offers with obviously unachievable KPIs into the network." },
  { q: 'Are there guarantees that attracted players will be active?', a: "No one gives strict activity guarantees: it depends not only on sources, but also on the product itself and its retention team's work. On our side, we strictly filter webmasters at entry, which noticeably increases the share of quality traffic." },
  { q: 'What steps does the launch consist of?', a: 'The process is simple: agreement on terms → legal check → link integration and postback setup → test conversions → traffic launch.' },
  { q: 'Do you work with crypto products?', a: 'Yes, we work with the crypto vertical. Terms and requirements for such products are discussed with a manager individually.' },
];

export default function AdvertisersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { lang } = useLang();

  const FAQ_ITEMS = lang === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_EN;

  const CONTACTS = [
    { icon: Headphones, title: 'Support', desc: lang === 'ru' ? 'на связи 24/7 — решаем любой вопрос быстро' : 'available 24/7 — resolve any issue quickly', href: SUPPORT_URL },
    { icon: UserRound, title: lang === 'ru' ? 'Менеджер' : 'Manager', desc: lang === 'ru' ? 'прямой контакт для обсуждения условий, ставок и запуска' : 'direct contact to discuss terms, rates, and launch', href: SUPPORT_URL },
    { icon: Send, title: 'TG-Channel', desc: lang === 'ru' ? 'новости сети, свежие офферы и апдейты — только по делу' : 'network news, fresh offers, and updates — straight to the point', href: CHANNEL_URL },
  ];

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        ${SHARED_STYLES}
        html { scroll-snap-type: y mandatory !important; scroll-behavior: smooth; }
        section { scroll-snap-align: start !important; scroll-snap-stop: always; }
        @keyframes contact-marquee { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .contact-marquee-anim { display: inline-block; animation: contact-marquee 40s linear infinite; }
        @keyframes adv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .adv-marquee { display: flex; width: max-content; animation: adv-marquee 55s linear infinite; }
        .adv-marquee:hover { animation-play-state: paused; }
        .contact-card:hover { border-color: rgba(255,255,255,0.28) !important; background: rgba(255,255,255,0.06) !important; transform: translateY(-4px); }
        .contact-card:hover > div:last-child { opacity: 1 !important; }
      `}</style>

      <NavHeader activePage="advertisers" />

      {/* ===== ADVERTISERS HERO ===== */}
      <section className="m-sec relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{  }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 38%, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.16) 45%, transparent 72%)' }} />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              Primetraff.com
            </div>
            <div className="m-title uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em' }}>
              Advertisers
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(12px, 1.2vw, 17px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 1160 }}>
            {lang === 'ru' ? (
              <>
                <p>Подключаем проверенных партнёров и помогаем получать целевой трафик без лишнего риска.</p>
                <p>Контролируем качество привлечённой аудитории и отслеживаем показатели на каждом этапе работы.</p>
                <p>Отсекаем источники, которые не соответствуют согласованным требованиям и KPI.</p>
                <p>Эффективные направления получаем возможность масштабировать вместе с рекламодателем.</p>
                <p>В результате вы получаете не просто объём, а управляемый поток пользователей с понятной экономикой.</p>
              </>
            ) : (
              <>
                <p>We connect verified partners and help you get targeted traffic without unnecessary risk.</p>
                <p>We control the quality of attracted audiences and track metrics at every stage.</p>
                <p>We cut off sources that don't meet agreed requirements and KPIs.</p>
                <p>Effective directions can be scaled together with the advertiser.</p>
                <p>As a result, you get not just volume, but a manageable user flow with a clear economy.</p>
              </>
            )}
          </div>

          {/* CTA — Contact us */}
          <div className="w-full flex justify-center" style={{ marginTop: 'clamp(40px, 7vh, 72px)' }}>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(12px, 1.15vw, 16px)', letterSpacing: '0.15em' }}>
                {lang === 'ru' ? 'Связаться с нами' : 'Contact us'}
              </span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="vh-section relative bg-black flex flex-col justify-between" style={{ height: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(140px, 19vh, 200px)`, overflow: 'hidden' }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            {lang === 'ru' ? 'Почему' : 'Why'}
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(22px, 3.5vh, 40px)' }}>
            {lang === 'ru' ? 'Нам доверяют' : 'They trust us'}
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.75, fontWeight: 400, maxWidth: 1160 }}>
            {lang === 'ru' ? (
              <>
                <p>Наш фокус — не количество подключённых аффилейтов, а качество партнёрства и трафика.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>
                  Мы несём ответственность за результат и придерживаемся принципиальной позиции в отношении невалидного трафика: сомнительные источники не допускаются, а качество каждого потока контролируется на протяжении всей работы.
                </p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>
                  При этом наша главная задача — максимизировать ваш доход: находить сильные источники, создавать для них лучшие условия и масштабировать то, что действительно приносит результат.
                </p>
              </>
            ) : (
              <>
                <p>Our focus is not the number of connected affiliates, but the quality of partnership and traffic.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>
                  We are responsible for results and maintain a principled position on invalid traffic: dubious sources are not allowed, and the quality of each flow is monitored throughout the work.
                </p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>
                  At the same time, our main task is to maximize your income: find strong sources, create the best conditions for them, and scale what truly delivers results.
                </p>
              </>
            )}
          </div>

          <div className="uppercase font-black text-white" style={{ fontSize: 'clamp(16px, 1.8vw, 26px)', letterSpacing: '0.06em', marginTop: 'clamp(28px, 4.5vh, 52px)', marginBottom: 'clamp(16px, 2.5vh, 30px)' }}>
            {lang === 'ru' ? 'Отзывы о работе с нами' : 'Reviews about working with us'}
          </div>
        </div>

        {/* Reviews auto-scroll */}
        <div className="relative z-10 overflow-hidden" style={{ margin: `0 calc(-1 * ${PAD})` }}>
          <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(40px, 8vw, 140px)', background: 'linear-gradient(to right, #000, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(40px, 8vw, 140px)', background: 'linear-gradient(to left, #000, transparent)' }} />
          <div className="adv-marquee" style={{ gap: 'clamp(14px, 1.6vw, 24px)', padding: '4px 0' }}>
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div key={i} className="flex-shrink-0 rounded-2xl text-left"
                style={{ width: 'clamp(340px, 34vw, 520px)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(20px, 2vw, 30px)' }}>
                <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', letterSpacing: TRACK, marginBottom: 'clamp(10px, 1.4vh, 16px)' }}>{r.name}</div>
                <div className="text-zinc-300" style={{ fontSize: 'clamp(11px, 0.95vw, 13px)', lineHeight: 1.7, fontWeight: 300 }}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DISCUSS COOPERATION ===== */}
      <section className="relative bg-black flex flex-col justify-between overflow-hidden" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90" />
        </div>
        <div className="absolute left-0 right-0 z-0 pointer-events-none overflow-hidden" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="contact-marquee-anim uppercase font-black whitespace-nowrap" style={{ fontSize: 'clamp(90px, 14vw, 220px)', letterSpacing: '0.02em', color: 'transparent', WebkitTextStroke: '1px rgba(59,130,246,0.22)', lineHeight: 1 }}>
            {(lang === 'ru' ? 'СВЯЗАТЬСЯ С НАМИ • ' : 'CONTACT US • ').repeat(6)}
          </div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center" style={{ marginBottom: 'clamp(20px, 2.5vh, 36px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              {lang === 'ru' ? 'Обсудить' : 'Discuss'}
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em' }}>
              {lang === 'ru' ? 'Сотрудничество' : 'Partnership'}
            </div>
          </div>

          {/* Contact cards */}
          <div className="w-full grid" style={{ maxWidth: 1100, gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(8px, 1vw, 16px)' }}>
            {CONTACTS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group relative overflow-hidden flex flex-col no-underline"
                style={{
                  padding: 'clamp(18px, 2.2vh, 28px) clamp(16px, 1.8vw, 28px)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 16,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  textDecoration: 'none',
                  transition: 'border-color .35s ease, background .35s ease, transform .35s ease',
                }}
              >
                <div className="flex-shrink-0 rounded-full flex items-center justify-center mb-3"
                  style={{ width: 'clamp(44px, 4vw, 60px)', height: 'clamp(44px, 4vw, 60px)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}>
                  <c.icon style={{ width: '45%', height: '45%' }} strokeWidth={1.8} />
                </div>
                <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(14px, 1.5vw, 21px)', letterSpacing: '0.08em', marginBottom: 'clamp(8px, 1.2vh, 14px)' }}>
                  {c.title}
                </div>
                <div className="uppercase text-zinc-400 flex-1" style={{ fontSize: 'clamp(9px, 0.88vw, 12px)', letterSpacing: '0.06em', fontWeight: 300, lineHeight: 1.6 }}>
                  {c.desc}
                </div>
                <div className="flex items-center gap-2 mt-3" style={{ color: '#3b82f6' }}>
                  <span className="uppercase" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.15em', fontWeight: 500 }}>
                    {lang === 'ru' ? 'Перейти' : 'Go'}
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 70%)', opacity: 0, transition: 'opacity .35s ease' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative bg-black flex flex-col justify-between" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              {lang === 'ru' ? 'Частые' : 'Frequently'}
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(32px, 5vh, 60px)' }}>
              {lang === 'ru' ? 'Вопросы' : 'Asked Questions'}
            </div>
          </div>
          <div className="faq-scroll w-full" style={{ maxWidth: 1000, maxHeight: 'clamp(300px, 46vh, 430px)' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: i === FAQ_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left bg-transparent border-none cursor-pointer group"
                  style={{ gap: 'clamp(16px, 2vw, 28px)', padding: 'clamp(16px, 2.4vh, 26px) clamp(8px, 1vw, 16px)' }}
                >
                  <span className="font-black flex-shrink-0" style={{ color: openFaq === i ? BLUE : 'rgba(59,130,246,0.5)', fontSize: 'clamp(14px, 1.5vw, 20px)', width: 'clamp(34px, 3.4vw, 52px)', transition: 'color .3s' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="uppercase text-white font-medium flex-1" style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1.15vw, 16px)', letterSpacing: '0.06em', lineHeight: 1.5 }}>{item.q}</span>
                  <span className="flex-shrink-0 text-white" style={{ fontSize: 'clamp(18px, 1.8vw, 26px)', fontWeight: 300, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform .3s ease' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 400 : 0, overflow: 'hidden', transition: 'max-height .45s cubic-bezier(.22,1,.36,1)' }}>
                  <div className="text-zinc-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)', lineHeight: 1.8, fontWeight: 300, letterSpacing: '0.03em', padding: `0 clamp(8px, 1vw, 16px) clamp(18px, 2.6vh, 28px) calc(clamp(34px, 3.4vw, 52px) + clamp(16px, 2vw, 28px))` }}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(20px, 3vh, 36px)' }}>
          <FixedFooterBar />
          <div className="m-copy text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
