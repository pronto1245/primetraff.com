import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
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
   Эффект декодирования текста (#5)
   ============================================================ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
function useDecodeText(target: string, delay = 0) {
  const [display, setDisplay] = useState(() => target.replace(/[A-Z0-9]/gi, '█'));
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const totalFrames = 28;
    const timeout = setTimeout(() => {
      const tick = () => {
        frame++;
        const progress = frame / totalFrames;
        setDisplay(
          target
            .split('')
            .map((ch, i) => {
              if (ch === '.' || ch === ' ') return ch;
              if (i / target.length < progress) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        if (frame < totalFrames) raf = requestAnimationFrame(tick);
        else setDisplay(target);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, delay]);
  return display;
}

/* ============================================================
   Офферы для горизонтальной ленты (#4)
   ============================================================ */
const OFFERS = [
  { geo: 'RU / UA / KZ', product: 'Slots + Live',  model: 'RevShare 45%', min: '$500',  tag: 'HOT' },
  { geo: 'BR / MX / AR', product: 'Sports Betting', model: 'CPA $120',     min: '$300',  tag: 'NEW' },
  { geo: 'DE / AT / CH', product: 'Casino',         model: 'Hybrid',       min: '$1000', tag: null  },
  { geo: 'IN / PK / BD', product: 'Slots',          model: 'CPA $80',      min: '$200',  tag: 'HOT' },
  { geo: 'NG / GH / KE', product: 'Sports',         model: 'RevShare 40%', min: '$100',  tag: 'NEW' },
  { geo: 'TR / AZ / GE', product: 'Casino + Live',  model: 'CPA $95',      min: '$250',  tag: null  },
];

/* ============================================================
   Компонент
   ============================================================ */
export function DarkStudioBlue() {
  // Декодирование: PRIMETRAFF отдельно, .COM отдельно (разный цвет)
  const decodedMain = useDecodeText('PRIMETRAFF', 300);
  const decodedDot  = useDecodeText('.COM', 600);

  // Горизонтальный скролл мышью
  const hScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = hScrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.2;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
        .offer-card:hover { border-color: ${BLUE} !important; }
        .offer-card:hover .offer-tag-geo { color: ${BLUE} !important; }
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
            <button className="flex flex-col gap-[6px] cursor-pointer bg-transparent border-none p-0">
              <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
              <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
              <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
            </button>
          </div>
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
              <text x="0" y="88" textLength="1000" lengthAdjust="spacingAndGlyphs"
                fill="#fff" style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96 }}>
                {decodedMain}<tspan fill={BLUE}>{decodedDot}</tspan>
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

      {/* ===== ОФФЕРЫ — горизонтальная лента (#4) ===== */}
      <section className="relative bg-black" style={{ padding: `clamp(60px, 8vh, 100px) 0` }}>
        {/* Заголовок секции */}
        <div style={{ padding: `0 ${PAD}`, marginBottom: 'clamp(32px, 5vh, 56px)' }} className="flex items-end justify-between">
          <h2 className="uppercase font-black leading-none" style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', letterSpacing: '0.02em' }}>
            Офферы
          </h2>
          <span className="uppercase text-zinc-500" style={{ fontSize: TYPE.small, letterSpacing: '0.15em' }}>
            скролл → мышью
          </span>
        </div>

        {/* Горизонтальная лента */}
        <div ref={hScrollRef} style={{ overflowX: 'auto', overflowY: 'hidden', display: 'flex', gap: 'clamp(12px, 1.5vw, 20px)', padding: `0 ${PAD} clamp(16px, 2vh, 24px)`, cursor: 'grab', scrollbarWidth: 'none' }}>
          {OFFERS.map((offer, i) => (
            <div key={i} className="offer-card flex-none flex flex-col justify-between"
              style={{ width: 'clamp(220px, 22vw, 300px)', minHeight: 'clamp(180px, 22vh, 240px)', border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(18px, 2.5vw, 28px)', position: 'relative', transition: 'border-color 0.25s' }}>
              {offer.tag && (
                <div className="absolute top-4 right-4 uppercase font-bold" style={{ fontSize: TYPE.micro, letterSpacing: '0.12em', color: BLUE }}>
                  {offer.tag}
                </div>
              )}
              <div className="offer-tag-geo uppercase font-bold transition-colors" style={{ fontSize: TYPE.small, letterSpacing: TRACK, color: 'rgba(255,255,255,0.5)' }}>
                {offer.geo}
              </div>
              <div>
                <div className="uppercase font-bold" style={{ fontSize: 'clamp(14px, 1.8vw, 22px)', letterSpacing: '0.03em', marginBottom: 8 }}>
                  {offer.product}
                </div>
                <div className="uppercase font-black" style={{ fontSize: 'clamp(16px, 2vw, 26px)', letterSpacing: '0.02em', color: BLUE }}>
                  {offer.model}
                </div>
              </div>
              <div className="uppercase text-zinc-500" style={{ fontSize: TYPE.micro, letterSpacing: '0.12em' }}>
                мин. депозит {offer.min}
              </div>
            </div>
          ))}
        </div>

        {/* Линия прогресса-декорации */}
        <div style={{ margin: `clamp(20px, 3vh, 36px) ${PAD} 0`, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </section>
    </div>
  );
}
