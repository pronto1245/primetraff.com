import { useState, useEffect } from 'react';
import { ArrowRight, Headphones, Send, UserRound } from 'lucide-react';
import { NavHeader, FixedFooterBar, SHARED_STYLES, BLUE, FONT, TYPE, TRACK, PAD } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';
import bgImage from '@/assets/dsb-bg.webp';

const REGISTER_URL = 'https://primetrack.pro/register?ref=ADV-3BT52V85';
const LOGIN_URL    = 'https://primetrack.pro/login';
const SUPPORT_URL  = 'https://t.me/primetrack_support_bot';
const CHANNEL_URL  = 'https://t.me/prime_traf';

const ScrollHint = () => (
  <div className="scroll-hint absolute left-1/2 z-20 pointer-events-none" style={{ bottom: 22, transform: 'translateX(-50%)' }}>
    <svg width="86" height="22" viewBox="0 0 86 22" fill="none">
      <path d="M2 2 L43 19 L84 2" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const FAQ_ITEMS_RU = [
  { q: 'Предоставляете ли вы готовую воронку для пролива?', a: 'Да, в неё входит: готовое PWA-приложение с настроенными PUSH-уведомлениями + конвертящие креативы + инструкция по запуску.' },
  { q: 'Возможно ли получить индивидуальные условия по выплатам?', a: 'Да, активным веб-мастерам мы идём навстречу и готовы предоставлять индивидуальные условия для дополнительного удобства.' },
  { q: 'У меня нет трекера, что делать?', a: 'Мы предоставим вам полностью бесплатный трекер с интуитивным интерфейсом, где вы сможете настроить все необходимые параметры, отслеживать конверсии в реальном времени и оптимизировать свои кампании для максимальной эффективности.' },
  { q: 'В каких случаях трафик не соответствует минимальным требованиям компании?', a: 'Трафик не соответствует минимальным требованиям компании в случае: 1. Относится к запрещённым видам трафика. 2. Не соответствует заявленному источнику. 3. Количество повторных депозитов менее 50% от количества первых. 4. Процент дубликатов свыше 10% от всех привлечённых игроков.' },
  { q: 'По каким моделям вы работаете?', a: 'Работаем по CPA, RevShare и гибридным моделям. Модель подбирается под источник трафика и объёмы — оптимальный вариант согласуете с менеджером до запуска.' },
  { q: 'Какие виды трафика вы принимаете?', a: 'Принимаем PWA, ASO, UAC, Facebook, In-App, SEO и другие источники. Главное условие — качество: источник согласовывается с менеджером до старта.' },
  { q: 'Как быстро происходят выплаты?', a: 'Выплаты проходят по согласованному графику без задержек. Для проверенных партнёров возможен пересмотр холдов и работа по предоплате.' },
  { q: 'Есть ли жёсткие KPI по офферам?', a: 'По большинству офферов в сети жёстких KPI нет. Но это не значит, что можно лить что угодно: активность игроков мы отслеживаем постоянно, и некачественный трафик в системе не задержится.' },
  { q: 'Как начать работу с вами?', a: 'Зарегистрируйтесь или напишите нам — менеджер свяжется, согласует источник, оффер и условия, после чего вы получите ссылки и сможете запускаться.' },
];

const FAQ_ITEMS_EN = [
  { q: 'Do you provide a ready-made funnel?', a: 'Yes, it includes: a ready-made PWA app with configured PUSH notifications + converting creatives + launch instructions.' },
  { q: 'Can I get individual payout terms?', a: 'Yes, for active webmasters we are open to providing individual terms for additional convenience.' },
  { q: "I don't have a tracker, what should I do?", a: 'We will provide you with a completely free tracker with an intuitive interface where you can configure all necessary parameters, track conversions in real time, and optimize your campaigns for maximum efficiency.' },
  { q: "When doesn't traffic meet minimum company requirements?", a: 'Traffic does not meet minimum requirements if: 1. It belongs to prohibited traffic types. 2. It does not match the declared source. 3. The number of re-deposits is less than 50% of first deposits. 4. The duplicate rate exceeds 10% of all attracted players.' },
  { q: 'What models do you work with?', a: 'We work with CPA, RevShare, and hybrid models. The model is selected based on the traffic source and volume — the optimal option is agreed with the manager before launch.' },
  { q: 'What types of traffic do you accept?', a: 'We accept PWA, ASO, UAC, Facebook, In-App, SEO, and other sources. The main condition is quality: the source is agreed with the manager before launch.' },
  { q: 'How fast are payouts?', a: 'Payouts follow an agreed schedule without delays. For verified partners, hold revision and prepayment work is possible.' },
  { q: 'Are there strict KPIs for offers?', a: "Most offers in the network don't have strict KPIs. But this doesn't mean you can drive any traffic: player activity is constantly monitored, and low-quality traffic won't stay in the system." },
  { q: 'How do I start working with you?', a: 'Register or write to us — a manager will get in touch, agree on the source, offer, and terms, after which you will receive links and can launch.' },
];

export default function AffiliatesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { lang } = useLang();

  // Scroll to #contact section on mount if hash is present
  useEffect(() => {
    if (window.location.hash === '#contact') {
      // Small delay so snap-scroll is initialised before we jump
      const timer = setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, []);

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
        @keyframes contact-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .contact-marquee-anim { display: inline-block; animation: contact-marquee 40s linear infinite; }
        .contact-card:hover { border-color: rgba(255,255,255,0.28) !important; background: rgba(255,255,255,0.06) !important; transform: translateY(-4px); }
        .contact-card:hover > div:last-child { opacity: 1 !important; }
        @media (max-width: 768px) { .contact-card { grid-column: span 3; } }
      `}</style>

      <NavHeader activePage="affiliates" />

      {/* ===== AFFILIATES HERO ===== */}
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
              Affiliates
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(12px, 1.2vw, 17px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 1160 }}>
            {lang === 'ru' ? (
              <>
                <p>Предоставляем доступ к актуальным офферам под разные источники трафика — за каждым партнёром закрепляется менеджер на весь период работы.</p>
                <p>Помогаем с запуском, трекингом, оптимизацией и техническими вопросами.</p>
                <p>Сильные результаты открывают возможности для роста объёмов, индивидуальных условий и большего дохода.</p>
              </>
            ) : (
              <>
                <p>We provide access to current offers and terms designed for different traffic sources.</p>
                <p>We help with launch, tracking, optimization, and technical questions.</p>
                <p>Each partner is assigned a dedicated manager who stays in touch throughout the process.</p>
                <p>Strong results open opportunities for volume increases and individual terms.</p>
                <p>We are invested in helping your successful funnels grow and generate more revenue.</p>
              </>
            )}
          </div>

          {/* Registration / Login buttons */}
          <div className="m-pad0 w-full flex items-center justify-between" style={{ marginTop: 'clamp(40px, 7vh, 72px)', padding: '0 clamp(40px, 10vw, 160px)' }}>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-blue-500/60 pb-2 hover:border-blue-400 transition-colors duration-500 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(12px, 1.15vw, 16px)', letterSpacing: '0.15em' }}>
                {lang === 'ru' ? 'Регистрация' : 'Register'}
              </span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </a>
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-blue-500/60 pb-2 hover:border-blue-400 transition-colors duration-500 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(12px, 1.15vw, 16px)', letterSpacing: '0.15em' }}>
                {lang === 'ru' ? 'Вход' : 'Login'}
              </span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY TRUST US ===== */}
      <section className="vh-section relative bg-black flex flex-col justify-between" style={{ height: '82vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)`, overflow: 'hidden' }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            {lang === 'ru' ? 'Почему' : 'Why'}
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(22px, 3.5vh, 40px)' }}>
            {lang === 'ru' ? 'Нам доверяют' : 'They trust us'}
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.75, fontWeight: 400, maxWidth: 1160 }}>
            {lang === 'ru' ? (
              <>
                <p>Мы берём на себя решение ключевых вопросов — от индивидуальных ставок до пересмотра холдов и возможности работы по предоплате.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Партнёры отмечают высокий уровень экспертизы нашей команды и качество сопровождения на каждом этапе.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>До запуска тщательно проверяем рекламодателей и условия сотрудничества, снижая вероятность спорных ситуаций и проблем с выплатами.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Вы концентрируетесь на привлечении трафика, а переговоры, контроль и организационные вопросы остаются на нашей стороне.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Ваша задача — приводить качественный трафик. Наша — сделать так, чтобы вы за него получили максимум.</p>
              </>
            ) : (
              <>
                <p>We handle key issues — from individual rates to hold revisions and the possibility of working with prepayment.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Partners note the high level of expertise of our team and the quality of support at every stage.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Before launch, we thoroughly check advertisers and collaboration terms, reducing the likelihood of disputes and payout issues.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>You focus on driving traffic, while negotiations, control, and organizational issues remain on our side.</p>
                <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Your task is to bring quality traffic. Ours is to make sure you get the maximum for it.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== DISCUSS COOPERATION ===== */}
      <section id="contact" className="relative bg-black flex flex-col justify-between overflow-hidden" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
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
            {CONTACTS.map((c, i) => (
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
                {/* Icon */}
                <div
                  className="flex-shrink-0 rounded-full flex items-center justify-center mb-3"
                  style={{
                    width: 'clamp(44px, 4vw, 60px)',
                    height: 'clamp(44px, 4vw, 60px)',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fff',
                  }}
                >
                  <c.icon style={{ width: '45%', height: '45%' }} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(14px, 1.5vw, 21px)', letterSpacing: '0.08em', marginBottom: 'clamp(8px, 1.2vh, 14px)' }}>
                  {c.title}
                </div>

                {/* Description */}
                <div className="uppercase text-zinc-400 flex-1" style={{ fontSize: 'clamp(9px, 0.88vw, 12px)', letterSpacing: '0.06em', fontWeight: 300, lineHeight: 1.6 }}>
                  {c.desc}
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 mt-3" style={{ color: '#3b82f6' }}>
                  <span className="uppercase" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.15em', fontWeight: 500 }}>
                    {lang === 'ru' ? 'Перейти' : 'Go'}
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                {/* Hover blue glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 70%)',
                    opacity: 0,
                    transition: 'opacity .35s ease',
                  }}
                />
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
