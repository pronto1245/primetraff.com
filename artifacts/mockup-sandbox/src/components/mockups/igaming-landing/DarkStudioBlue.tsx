import { ArrowRight, Zap } from 'lucide-react';
import bgImage from './assets/dsb-bg.png';

/* ============================================================
   Design tokens — единая система, без шаблонной мешанины
   ============================================================ */
const BLUE = '#3b82f6';

// Один характерный шрифт на весь макет: Unbounded — широкий
// гротеск с полной кириллицей (в духе profitov.partners).
const FONT = "'Unbounded', sans-serif";

// Типографическая шкала (от мелкого к крупному)
const TYPE = {
  micro: 'clamp(9px, 0.8vw, 11px)',     // подпись логотипа
  small: 'clamp(11px, 1vw, 14px)',      // RU/EN, верхний лейбл
  body: 'clamp(12px, 1.15vw, 16px)',    // кнопка CTA
  accent: 'clamp(13px, 1.6vw, 22px)',   // PRIVATE…NETWORK, нижние углы
};

const TRACK = '0.08em'; // единый letter-spacing для акцентных надписей
const PAD = 'clamp(20px, 3vw, 48px)';   // единый отступ от краёв

export function DarkStudioBlue() {
  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
      `}</style>

      {/* ================= HERO (первый экран) ================= */}
      <div
        style={{ width: '100%', height: '100vh' }}
        className="relative overflow-hidden bg-black flex flex-col items-center text-white"
      >

      {/* Фон — синяя версия DarkStudio */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover opacity-60"
          style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      </div>

      {/* Шапка: лого слева, язык + меню справа */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between" style={{ padding: `${PAD} ${PAD} 0` }}>
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
            <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }}></span>
            <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }}></span>
            <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }}></span>
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full text-center" style={{ padding: `clamp(80px, 10vh, 120px) ${PAD} clamp(90px, 12vh, 140px)` }}>

        {/* Верхний лейбл */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: `${BLUE}80` }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: BLUE }}></div>
          </div>
          <div className="uppercase text-zinc-400" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300 }}>
            iGaming Network
          </div>
        </div>

        {/* Заголовок на всю ширину + строка слов */}
        <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw' }}>
          <svg viewBox="0 0 1000 100" className="w-full block" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <text
              x="0" y="88"
              textLength="1000" lengthAdjust="spacingAndGlyphs"
              fill="#fff"
              style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96 }}
            >
              PRIMETRAFF<tspan fill={BLUE}>.COM</tspan>
            </text>
          </svg>
          <div className="w-full flex justify-between uppercase text-white font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
            {['Private', 'Premium', 'iGaming', 'Affiliate', 'Network'].map(w => <span key={w}>{w}</span>)}
          </div>
        </div>

        {/* Линия + CTA */}
        <div className="w-full flex flex-col items-center" style={{ gap: 'clamp(24px, 4vh, 48px)' }}>
          <div className="w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${BLUE}, transparent)` }}></div>
          <button className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group bg-transparent">
            <span className="uppercase font-medium" style={{ fontSize: TYPE.body, letterSpacing: '0.15em' }}>Стать партнёром</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Нижние углы */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between pointer-events-none" style={{ padding: `0 ${PAD} ${PAD}` }}>
        <div className="text-left uppercase text-white font-bold leading-snug" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
          Где трафик превращается<br />в партнёрство.
        </div>
        <div className="text-right uppercase text-white font-bold leading-snug" style={{ fontSize: TYPE.accent, letterSpacing: TRACK }}>
          Работаем для вас<br />с 2025 года
        </div>
      </div>
      </div>

      {/* ================= О НАС (второй экран, как у profitov) ================= */}
      <section className="relative bg-black flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">

          {/* Заголовок: рукописное «Немного» + жирное «О НАС» с наложением */}
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="text-zinc-400" style={{ fontFamily: "'Comforter', cursive", fontSize: 'clamp(64px, 9vw, 130px)', lineHeight: 1, opacity: 0.8 }}>
              Немного
            </div>
            <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(18px, 2.2vw, 30px)', letterSpacing: '0.12em', marginTop: '-0.55em', position: 'relative', zIndex: 1 }}>
              о нас
            </div>
          </div>

          {/* Текст — по центру, строками, как на референсе */}
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 920 }}>
            <p>PrimeTraff — партнёрская программа в iGaming, где интересы партнёра стоят на первом месте.</p>
            <p>С 2025 года мы строим партнёрство на трёх принципах: сервис, прозрачность и результат.</p>
            <p>Защищаем интересы рекламодателей и аффилейтов от мошенничества.</p>
            <p>Выстраиваем понятные процессы и создаём условия, в которых зарабатывают все стороны.</p>
            <p>Наша задача — не просто дать вам оффер, а помочь масштабировать трафик и зарабатывать больше.</p>
            <p style={{ marginTop: '1.9em' }}>PrimeTraff — работаем для вас, чтобы вы зарабатывали.</p>
          </div>
        </div>

        {/* Низ секции: соцсети слева, Support справа, копирайт по центру */}
        <div className="w-full" style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              {['T', 'I'].map(l => (
                <div key={l} className="rounded-full bg-white flex items-center justify-center text-black font-bold cursor-pointer" style={{ width: 40, height: 40, fontSize: 14 }}>{l}</div>
              ))}
            </div>
            <button className="rounded-full border border-white/20 bg-white/5 text-white uppercase cursor-pointer" style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: '14px 36px' }}>
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
