import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { NavHeader, FixedFooterBar, SHARED_STYLES, BLUE, FONT, TYPE, TRACK, PAD } from '@/components/nav-header';
import { usePageSnap } from '@/hooks/usePageSnap';
import { useLang } from '@/lib/language-context';
import { t, translations } from '@/lib/i18n';
import bgImage from '@/assets/dsb-bg.webp';

/* ── Partner logos ── */
import logoSpinAura     from '@assets/Без_названия_(21)_1770453425632.webp';
import logoElonbet      from '@assets/Без_названия_(31)_1770453425635.webp';
import logoMagneticslots from '@assets/Без_названия_(30)_1770453425635.webp';
import logoSpinMillion  from '@assets/img69525e9bc7f63_1770453425635.webp';
import logoPrestige     from '@assets/img695261fc58a0d_1770453425636.webp';
import logoWinAirlines  from '@assets/Без_названия_(29)_1770453425635.webp';
import logoYYYCasino    from '@assets/Без_названия_(20)_1770453425635.webp';
import logoFatPirate    from '@assets/Без_названия_(19)_1770453425635.webp';
import logo1WIN         from '@assets/Без_названия_(1)_1770453702150.webp';
import logoMrBet        from '@assets/Без_названия_(2)_1770453702153.webp';
import logoSpincity     from '@assets/Без_названия_(3)_1770453702153.webp';
import logoXONBet       from '@assets/Без_названия_(4)_1770453702154.webp';
import logoCorgibet     from '@assets/Без_названия_(4)_1770453702154.webp';
import logoLeon         from '@assets/Без_названия_(5)_1770453702154.webp';
import logoBruceBet     from '@assets/Без_названия_(5)_1770453702154.webp';
import logoVavada       from '@assets/Без_названия_(6)_1770453702154.webp';
import logoTwin         from '@assets/Без_названия_(6)_1770453702155.webp';
import logo7Slots       from '@assets/Без_названия_(7)_1770453702155.webp';
import logoSlott        from '@assets/Без_названия_(7)_1770453702155.webp';
import logoBooi         from '@assets/Без_названия_(8)_1770453702155.webp';
import logoAmonbet      from '@assets/Без_названия_(8)_1770453702155.webp';
import logoPlayfortuna  from '@assets/Без_названия_(9)_1770453702155.webp';
import logoLuckyWave    from '@assets/Без_названия_(10)_1770453702155.webp';
import logoSlotLair     from '@assets/Без_названия_(10)_1770453702155.webp';
import logoBeef         from '@assets/Без_названия_(11)_1770453702156.webp';
import logoFlagman      from '@assets/Без_названия_(11)_1770453702156.webp';
import logoMartin       from '@assets/Без_названия_(12)_1770453702156.webp';
import logoStarda       from '@assets/Без_названия_(12)_1770453751817.webp';
import logoBets10       from '@assets/Без_названия_(13)_1770453751827.webp';
import logoIrwin        from '@assets/Без_названия_(13)_1770453751827.webp';
import logoIzzi         from '@assets/Без_названия_(14)_1770453751828.webp';
import logoGizbo        from '@assets/Без_названия_(14)_1770453751828.webp';
import logoSlotuna      from '@assets/Без_названия_(15)_1770453751828.webp';
import logoAwintura     from '@assets/Без_названия_(15)_1770453751829.webp';
import logoLegzo        from '@assets/Без_названия_(16)_1770453751829.webp';
import logoHitNSpin     from '@assets/Без_названия_(16)_1770453751829.webp';
import logo1GO          from '@assets/Без_названия_(17)_1770453751830.webp';
import logoVulkanBet    from '@assets/Без_названия_(17)_1770453751830.webp';
import logo1xCasino     from '@assets/Без_названия_(18)_1770453751830.webp';
import logoVerdecasino  from '@assets/Без_названия_(19)_1770453751830.webp';
import logoSlotoro      from '@assets/Без_названия_(20)_1770453751830.webp';
import logoVulkanSpiele from '@assets/Без_названия_(21)_1770453809642.webp';
import logoLex          from '@assets/Без_названия_(23)_1770453809647.webp';
import logoMonro        from '@assets/Без_названия_(24)_1770453809647.webp';
import logoMelbet       from '@assets/Без_названия_(25)_1770453809648.webp';
import logoJugabet      from '@assets/Без_названия_(28)_1770453809648.webp';
import logoVegas        from '@assets/img69380f65d567f_1770453920456.webp';
import logoBr4bet       from '@assets/zQAzTcUzmpmD09fPheuQwWO7Jqm0FxinQatFQkwy_1770453920459.webp';
import logoWinhero      from '@assets/Без_названия_(32)_1770454010355.webp';

const REGISTER_URL = 'https://primetrack.pro/register?ref=ADV-3BT52V85';

const ScrollHint = () => (
  <div className="scroll-hint absolute left-1/2 z-20 pointer-events-none" style={{ bottom: 22, transform: 'translateX(-50%)' }}>
    <svg width="86" height="22" viewBox="0 0 86 22" fill="none">
      <path d="M2 2 L43 19 L84 2" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function LandingPage() {
  const heroSvgRef = useRef<SVGSVGElement>(null);
  const { lang } = useLang();
  usePageSnap();

  // Mobile Safari doesn't support textLength with custom fonts —
  // measure actual text width and fit it into the frame manually.
  useEffect(() => {
    const fit = () => {
      const svg = heroSvgRef.current; if (!svg) return;
      const texts = Array.from(svg.querySelectorAll('text')) as SVGTextElement[];
      if (texts.length < 2) return;
      const [a, b] = texts;
      a.removeAttribute('transform'); b.removeAttribute('transform');
      const w1 = a.getComputedTextLength(); const w2 = b.getComputedTextLength();
      if (!w1 || !w2) return;
      const k = 988 / (w1 + w2);
      a.setAttribute('transform', `translate(6 0) scale(${k} 1)`);
      b.setAttribute('transform', `translate(${6 + w1 * k} 0) scale(${k} 1)`);
    };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(() => setTimeout(fit, 0));
    const timers = [setTimeout(fit, 600), setTimeout(fit, 1500), setTimeout(fit, 3000)];
    window.addEventListener('resize', fit);
    return () => { timers.forEach(clearTimeout); window.removeEventListener('resize', fit); };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-sec, .no-snap');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('sec-visible');
        const marquees = entry.target.querySelectorAll('.marquee-left, .marquee-right');
        marquees.forEach(m => m.classList.toggle('marquee-paused', !entry.isIntersecting));
      });
    }, { threshold: 0.05 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const row1: { name: string; logo: string }[] = [
    { name: 'SpinAura',     logo: logoSpinAura },
    { name: 'Elonbet',      logo: logoElonbet },
    { name: 'Magneticslots',logo: logoMagneticslots },
    { name: 'Spin Million', logo: logoSpinMillion },
    { name: 'Prestige',     logo: logoPrestige },
    { name: 'WinAirlines',  logo: logoWinAirlines },
    { name: 'YYY Casino',   logo: logoYYYCasino },
    { name: 'FatPirate',    logo: logoFatPirate },
    { name: 'Jugabet',      logo: logoJugabet },
    { name: 'Br4bet',       logo: logoBr4bet },
    { name: '1xCasino',     logo: logo1xCasino },
    { name: '1GO',          logo: logo1GO },
    { name: 'Legzo',        logo: logoLegzo },
    { name: 'Melbet',       logo: logoMelbet },
    { name: 'Monro',        logo: logoMonro },
    { name: 'Lex',          logo: logoLex },
    { name: 'Slotuna',      logo: logoSlotuna },
    { name: 'Corgibet',     logo: logoCorgibet },
    { name: 'VulkanSpiele', logo: logoVulkanSpiele },
    { name: 'Slotoro',      logo: logoSlotoro },
    { name: 'Verdecasino',  logo: logoVerdecasino },
    { name: 'Izzi',         logo: logoIzzi },
    { name: 'Vulkan.bet',   logo: logoVulkanBet },
    { name: 'HitNSpin',     logo: logoHitNSpin },
  ];
  const row2: { name: string; logo: string }[] = [
    { name: 'Awintura',    logo: logoAwintura },
    { name: 'Gizbo',       logo: logoGizbo },
    { name: 'Irwin',       logo: logoIrwin },
    { name: 'Starda',      logo: logoStarda },
    { name: 'Flagman',     logo: logoFlagman },
    { name: 'Bets10',      logo: logoBets10 },
    { name: 'Martin',      logo: logoMartin },
    { name: 'Beef',        logo: logoBeef },
    { name: 'SlotLair',    logo: logoSlotLair },
    { name: 'LuckyWave',   logo: logoLuckyWave },
    { name: 'Amonbet',     logo: logoAmonbet },
    { name: 'Playfortuna', logo: logoPlayfortuna },
    { name: 'Vegas',       logo: logoVegas },
    { name: 'Booi',        logo: logoBooi },
    { name: '7Slots',      logo: logo7Slots },
    { name: 'Vavada',      logo: logoVavada },
    { name: 'Slott',       logo: logoSlott },
    { name: 'Twin',        logo: logoTwin },
    { name: 'Leon',        logo: logoLeon },
    { name: 'XON Bet',     logo: logoXONBet },
    { name: 'BruceBet',    logo: logoBruceBet },
    { name: 'MrBet',       logo: logoMrBet },
    { name: 'Spincity',    logo: logoSpincity },
    { name: '1 WIN',       logo: logo1WIN },
    { name: 'Winhero',     logo: logoWinhero },
  ];

  const BrandItem = ({ name, logo }: { name: string; logo: string }) => (
    <div className="brand-item" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 clamp(20px, 2.5vw, 40px)', flexShrink: 0, opacity: 0.5, transition: 'opacity .3s' }}>
      <img src={logo} alt={name} width={28} height={28} style={{ borderRadius: 6, flexShrink: 0, objectFit: 'cover' }}  loading="lazy" decoding="async" />
      <span className="uppercase font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK, whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        ${SHARED_STYLES}
        .snap-sec { contain: style; }
        .no-snap { contain: style; }
        .no-snap { scroll-snap-align: none; scroll-snap-stop: normal; }
        @keyframes marquee-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .marquee-left  { display: flex; width: max-content; animation: marquee-left  60s linear infinite; }
        .marquee-right { display: flex; width: max-content; animation: marquee-right 60s linear infinite; }
        .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
        .marquee-paused { animation-play-state: paused !important; }
        .brand-item:hover { opacity: 1 !important; }
        @keyframes hint-bounce { 0%, 100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(9px); opacity: 1; } }
        .scroll-hint svg { animation: hint-bounce 1.8s ease-in-out infinite; }
      `}</style>

      <NavHeader activePage="home" />

      {/* ===== HERO ===== */}
      <div style={{ width: '100%', height: '100vh' }} className="snap-sec relative overflow-hidden bg-black flex flex-col items-center text-white">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" className="w-full h-full object-cover opacity-60"
            style={{  }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.16) 45%, transparent 72%)' }} />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 flex flex-col items-center justify-between h-full w-full text-center"
          style={{ padding: `clamp(80px, 10vh, 120px) ${PAD} clamp(90px, 12vh, 140px)` }}>

          {/* Label */}
          <div className="flex flex-col items-center">
            <div className="uppercase text-zinc-400" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300, transform: 'translateY(110px)' }}>
              iGaming Network
            </div>
          </div>

          {/* Hero title */}
          <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw' }}>
            <div className="m-only w-full justify-between uppercase text-white font-bold"
              style={{ fontSize: 9, letterSpacing: '0.1em', lineHeight: 1.6, marginBottom: 10 }}>
              <span style={{ textAlign: 'left' }}>
                {lang === 'ru' ? <>Где трафик<br />превращается<br />в партнёрство</> : <>Where traffic<br />becomes<br />partnership</>}
              </span>
              <span style={{ textAlign: 'right' }}>
                {lang === 'ru' ? <>Работаем<br />для вас с<br />2025 года</> : <>Working<br />for you since<br />2025</>}
              </span>
            </div>
            <svg ref={heroSvgRef} viewBox="0 0 1000 100" className="w-full block" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="comGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb">
                    <animate attributeName="stop-color" values="#2563eb;#60a5fa;#1d4ed8;#3b82f6;#2563eb" dur="6s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#60a5fa">
                    <animate attributeName="stop-color" values="#60a5fa;#1e40af;#3b82f6;#93c5fd;#60a5fa" dur="6s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              <text x="0" y="88" fill="#fff" style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96 }}>PRIMETRAFF</text>
              <text x="0" y="88" fill="url(#comGrad)" style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96 }}>.COM</text>
            </svg>
            <div className="hero-words w-full flex justify-between uppercase text-white font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
              {['Private', 'Premium', 'iGaming', 'Affiliate', 'Network'].map(w => <span key={w}>{w}</span>)}
            </div>
          </div>

          {/* CTA */}
          <div className="w-full flex flex-col items-center" style={{ gap: 'clamp(24px, 4vh, 48px)' }}>
            <div className="w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${BLUE}, transparent)` }} />
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-blue-500 pb-2 hover:border-blue-300 transition-colors duration-500 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="uppercase font-medium text-white" style={{ fontSize: TYPE.body, letterSpacing: '0.15em' }}>
                {t(translations.landingPage.heroCta, lang)}
              </span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </div>
        </div>

        {/* Bottom corners — desktop */}
        <div className="hero-corners absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between pointer-events-none"
          style={{ padding: `0 ${PAD} clamp(96px, 13vh, 120px)` }}>
          <div className="hero-corner text-left uppercase text-white font-bold leading-snug" style={{ fontSize: 'clamp(10px, 1.1vw, 15px)', letterSpacing: TRACK }}>
            {t(translations.landingPage.heroSloganLeft, lang).split('\n').map((line, i) => i === 0 ? <span key={i}>{line}<br /></span> : <span key={i}>{line}</span>)}
          </div>
          <div className="hero-corner text-right uppercase text-white font-bold leading-snug" style={{ fontSize: 'clamp(10px, 1.1vw, 15px)', letterSpacing: TRACK }}>
            {t(translations.landingPage.heroSloganRight, lang).split('\n').map((line, i) => i === 0 ? <span key={i}>{line}<br /></span> : <span key={i}>{line}</span>)}
          </div>
        </div>

        <ScrollHint />
      </div>

      {/* ===== ABOUT + PARTNERS ===== */}
      <section className="snap-sec sec-fade relative bg-black flex flex-col" style={{ minHeight: '100vh', paddingTop: 'clamp(60px, 8vh, 100px)', paddingLeft: PAD, paddingRight: PAD, paddingBottom: '100px' }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(28px, 4.5vh, 48px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              {t(translations.landingPage.aboutLabel, lang)}
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em' }}>
              {t(translations.landingPage.aboutTitle, lang)}
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.8, fontWeight: 400, maxWidth: 1000 }}>
            {translations.landingPage.aboutParas[lang].map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        {/* Partners marquee */}
        <div style={{ marginTop: 'clamp(40px, 6vh, 64px)', overflow: 'hidden' }}>
          <div className="uppercase text-zinc-400 text-center" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(24px, 4vh, 40px)' }}>
            {t(translations.landingPage.trustedBy, lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vh, 28px)' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="marquee-right" style={{ alignItems: 'center' }}>
                {[...row1, ...row1].map((b, i) => <BrandItem key={i} name={b.name} logo={b.logo} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="marquee-left" style={{ alignItems: 'center' }}>
                {[...row2, ...row2].map((b, i) => <BrandItem key={i} name={b.name} logo={b.logo} />)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full" style={{ marginTop: 'clamp(32px, 5vh, 52px)' }}>
          <FixedFooterBar />
          <div className="m-copy text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)', transform: 'translateY(66px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
