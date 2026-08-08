import { useState } from 'react';
import { ArrowRight, X, Zap } from 'lucide-react';
import bgImage from './assets/dsb-bg.png';

/* ============================================================
   Design tokens
   ============================================================ */
const BLUE = '#3b82f6';
const FONT = "'Unbounded', sans-serif";
const TYPE = {
  micro:  'clamp(9px,  0.8vw, 11px)',
  small:  'clamp(11px, 1vw,   14px)',
  body:   'clamp(12px, 1.15vw,16px)',
  accent: 'clamp(13px, 1.6vw, 22px)',
};
const TRACK = '0.08em';
const PAD   = 'clamp(20px, 3vw, 48px)';



/* ============================================================
   Компонент
   ============================================================ */
export function DarkStudioBlue() {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
        @keyframes marquee-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .marquee-left  { display: flex; width: max-content; animation: marquee-left  28s linear infinite; }
        .marquee-right { display: flex; width: max-content; animation: marquee-right 28s linear infinite; }
        .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
        .brand-item:hover { opacity: 1 !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ===== HERO ===== */}
      <div style={{ width: '100%', height: '100vh' }} className="relative overflow-hidden bg-black flex flex-col items-center text-white">

        {/* Фон */}
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-60"
            style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        </div>

        {/* Шапка — fixed */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between" style={{ padding: `${PAD} ${PAD} 0` }}>
          <div className="flex items-center gap-2.5">
            <Zap className="w-6 h-6" style={{ color: BLUE }} fill="currentColor" />
            <div className="flex flex-col leading-none text-left">
              <span className="font-bold uppercase" style={{ fontSize: TYPE.small, letterSpacing: TRACK }}>PrimeTraff</span>
              <span className="uppercase text-zinc-400 mt-1" style={{ fontSize: TYPE.micro, letterSpacing: '0.25em', fontWeight: 300 }}>Affiliate Network</span>
            </div>
          </div>
          <div className="flex items-center" style={{ gap: 'clamp(16px, 2vw, 32px)' }}>
            <div className="font-bold" style={{ fontSize: TYPE.small, letterSpacing: TRACK }}>
              <span className="text-white cursor-pointer">RU</span>
              <span className="text-zinc-500 ml-2 cursor-pointer hover:text-white transition-colors">EN</span>
            </div>
            <button onClick={() => setMenuOpen(o => !o)} className="cursor-pointer bg-transparent border-none p-0">
              {menuOpen ? (
                <X className="text-white" style={{ width: 'clamp(28px, 2.5vw, 40px)', height: 'clamp(28px, 2.5vw, 40px)' }} strokeWidth={1.5} />
              ) : (
                <span className="flex flex-col gap-[6px]">
                  <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
                  <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
                  <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Бургер-меню — панель справа, шапка остаётся видимой (z-50 > z-40) */}
        <div className="fixed top-0 right-0 bottom-0 z-40 flex flex-col justify-center"
          style={{
            width: 'clamp(300px, 34vw, 480px)',
            background: '#0a0a0c',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
            padding: `0 ${PAD}`,
          }}>
          <nav className="flex flex-col items-end" style={{ gap: 'clamp(18px, 3vh, 28px)' }}>
            {['О нас', 'Аффилейтам', 'Рекламодателям', 'Связаться с нами', 'Блог', 'FAQ'].map(item => (
              <a key={item} href="#" className="uppercase text-white font-medium hover:opacity-60 transition-opacity"
                style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none' }}>
                {item}
              </a>
            ))}
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.25)', margin: 'clamp(10px, 2vh, 20px) 0' }} />
            {['Вход', 'Регистрация'].map(item => (
              <a key={item} href="#" className="uppercase text-white font-medium hover:opacity-60 transition-opacity"
                style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none' }}>
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Контент */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full w-full text-center"
          style={{ padding: `clamp(80px, 10vh, 120px) ${PAD} clamp(90px, 12vh, 140px)` }}>

          {/* Лейбл */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: `${BLUE}80` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: BLUE }} />
            </div>
            <div className="uppercase text-zinc-400" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300 }}>
              iGaming Network
            </div>
          </div>

          {/* Заголовок с эффектом декодирования */}
          <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw' }}>
            <svg viewBox="0 0 1000 100" className="w-full block" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
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
              <text x="0" y="88" textLength="1000" lengthAdjust="spacingAndGlyphs"
                fill="#fff" style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96 }}>
                PRIMETRAFF<tspan fill="url(#comGrad)">.COM</tspan>
              </text>
            </svg>
            <div className="w-full flex justify-between uppercase text-white font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
              {['Private', 'Premium', 'iGaming', 'Affiliate', 'Network'].map(w => <span key={w}>{w}</span>)}
            </div>
          </div>

          {/* CTA */}
          <div className="w-full flex flex-col items-center" style={{ gap: 'clamp(24px, 4vh, 48px)' }}>
            <div className="w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${BLUE}, transparent)` }} />
            <button className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group bg-transparent">
              <span className="uppercase font-medium" style={{ fontSize: TYPE.body, letterSpacing: '0.15em' }}>Стать партнёром</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Нижние углы */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between pointer-events-none"
          style={{ padding: `0 ${PAD} ${PAD}` }}>
          <div className="text-left uppercase text-white font-bold leading-snug" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
            Где трафик превращается<br />в партнёрство.
          </div>
          <div className="text-right uppercase text-white font-bold leading-snug" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
            Работаем для вас<br />с 2025 года
          </div>
        </div>
      </div>

      {/* ===== ПАРТНЁРЫ — автоскролл в 2 ряда ===== */}
      <section className="relative bg-black overflow-hidden" style={{ padding: `clamp(60px, 8vh, 100px) 0` }}>
        <div className="uppercase text-zinc-400 text-center" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(36px, 6vh, 60px)' }}>
          Нам доверяют лидеры рынка
        </div>

        {(() => {
          const row1 = [
            { name: 'VULKAN',    domain: 'vulkanvegas.com' },
            { name: 'PIN-UP',    domain: 'pinup.casino' },
            { name: '1WIN',      domain: '1win.pro' },
            { name: 'STAKE',     domain: 'stake.com' },
            { name: 'N1 CASINO', domain: 'n1casino.com' },
            { name: 'GG.BET',    domain: 'gg.bet' },
            { name: 'VAVADA',    domain: 'vavada.com' },
            { name: '1XBET',     domain: '1xbet.com' },
            { name: 'BETBOOM',   domain: 'betboom.ru' },
            { name: 'LEON',      domain: 'leon.bet' },
          ];
          const row2 = [
            { name: 'MOSTBET',   domain: 'mostbet.com' },
            { name: 'MELBET',    domain: 'melbet.com' },
            { name: 'PARIMATCH', domain: 'parimatch.com' },
            { name: 'IZZI',      domain: 'izzicasino.com' },
            { name: 'FRESH',     domain: 'fresh.casino' },
            { name: 'JET',       domain: 'jet.casino' },
            { name: 'RIOBET',    domain: 'riobet.com' },
            { name: 'COLUMBUS',  domain: 'columbuscasino.com' },
            { name: 'BOOI',      domain: 'booi.com' },
            { name: 'KENT',      domain: 'kent.casino' },
          ];

          const BrandItem = ({ name, domain }: { name: string; domain: string }) => (
            <div className="brand-item" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0 clamp(24px, 3vw, 48px)', flexShrink: 0, opacity: 0.4, transition: 'opacity .3s' }}>
              <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt={name} width={22} height={22} style={{ borderRadius: 4, flexShrink: 0 }} />
              <span className="uppercase font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK, whiteSpace: 'nowrap' }}>{name}</span>
            </div>
          );

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vh, 40px)' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className="marquee-right" style={{ alignItems: 'center' }}>
                  {[...row1, ...row1].map((b, i) => <BrandItem key={i} {...b} />)}
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div className="marquee-left" style={{ alignItems: 'center' }}>
                  {[...row2, ...row2].map((b, i) => <BrandItem key={i} {...b} />)}
                </div>
              </div>
            </div>
          );
        })()}
      </section>
      {/* ===== О НАС ===== */}
      <section className="relative bg-black flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="text-zinc-400" style={{ fontFamily: "'Comforter', cursive", fontSize: 'clamp(64px, 9vw, 130px)', lineHeight: 1, opacity: 0.8 }}>
              Немного
            </div>
            <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(18px, 2.2vw, 30px)', letterSpacing: '0.12em', marginTop: '-0.55em', position: 'relative', zIndex: 1 }}>
              о нас
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 920 }}>
            <p>PrimeTraff — партнёрская программа в iGaming, где интересы партнёра стоят на первом месте.</p>
            <p>С 2025 года мы строим партнёрство на трёх принципах: сервис, прозрачность и результат.</p>
            <p>Защищаем интересы рекламодателей и аффилейтов от мошенничества.</p>
            <p>Выстраиваем понятные процессы и создаём условия, в которых зарабатывают все стороны.</p>
            <p>Наша задача — не просто дать вам оффер, а помочь масштабировать трафик и зарабатывать больше.</p>
            <p style={{ marginTop: '1.9em' }}>PrimeTraff — работаем для вас, чтобы вы зарабатывали.</p>
          </div>
        </div>
        <div className="w-full" style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              {['T', 'I'].map(l => (
                <div key={l} className="rounded-full bg-white flex items-center justify-center text-black font-bold cursor-pointer" style={{ width: 40, height: 40, fontSize: 14 }}>{l}</div>
              ))}
            </div>
            <button className="rounded-full border border-white/20 bg-white/5 text-white uppercase cursor-pointer"
              style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: '14px 36px' }}>
              Support
            </button>
          </div>
          <div className="text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>

    </div>
  );
}
