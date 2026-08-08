import { useState } from 'react';
import { ArrowRight, X, Zap } from 'lucide-react';
import bgImage from './assets/dsb-bg.png';

/* ============================================================
   Design tokens — та же система, что и на главной
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

const BENEFITS = [
  { n: '01', title: 'Высокие ставки',        text: 'RevShare до 50%, CPA выше рынка. Пересматриваем условия по результату — растёшь ты, растут ставки.' },
  { n: '02', title: 'Моментальные выплаты',  text: 'Крипта, карты, банковский перевод. Без задержек и минималок, которые нужно ждать месяцами.' },
  { n: '03', title: 'Прямые рекламодатели',  text: 'Работаем без посредников — офферы напрямую от брендов, никаких урезанных ставок по цепочке.' },
  { n: '04', title: 'Личный менеджер 24/7',  text: 'Не тикеты и боты, а живой человек в Telegram, который отвечает и ночью, и в выходные.' },
  { n: '05', title: 'Чистая статистика',     text: 'Прозрачный трекинг в реальном времени. Видишь то же, что и мы — без шейва и скрытых правок.' },
  { n: '06', title: 'Эксклюзивные офферы',   text: 'ГЕО и продукты, которых нет в паблике. Доступ по результатам первых кап.' },
];

export function Affiliates() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
        .benefit-row:hover { background: rgba(59,130,246,0.05); }
        .benefit-row:hover .benefit-num { color: ${BLUE}; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Шапка — как на главной, fixed */}
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

      {/* Затемнение при меню */}
      <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-30"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity .5s ease' }} />

      {/* Бургер-меню */}
      <div className="fixed top-0 right-0 bottom-0 z-40 flex flex-col justify-center"
        style={{ width: 'clamp(340px, 42vw, 580px)', background: '#0a0a0c', borderLeft: '1px solid rgba(255,255,255,0.08)', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .5s cubic-bezier(.22,1,.36,1)', padding: `0 ${PAD}` }}>
        <nav className="flex flex-col items-end" style={{ gap: 'clamp(18px, 3vh, 28px)' }}>
          {['О нас', 'Аффилейтам', 'Рекламодателям', 'Связаться с нами', 'Блог', 'FAQ'].map(item => (
            <a key={item} href="#" className="uppercase text-white font-medium hover:opacity-60 transition-opacity"
              style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none', color: item === 'Аффилейтам' ? BLUE : undefined }}>
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

      {/* ===== HERO страницы ===== */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ height: '62vh' }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-40" style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10" style={{ padding: `0 ${PAD} clamp(32px, 5vh, 56px)` }}>
          <div className="uppercase text-zinc-400" style={{ fontSize: TYPE.small, letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(16px, 2.5vh, 28px)' }}>
            Для тех, кто льёт
          </div>
          <h1 className="uppercase font-black leading-none" style={{ fontSize: 'clamp(40px, 8vw, 110px)', letterSpacing: '0.01em' }}>
            Аффилей<span style={{ color: BLUE }}>там</span>
          </h1>
        </div>
      </section>

      {/* ===== Преимущества — нумерованные строки ===== */}
      <section className="bg-black" style={{ padding: `clamp(40px, 6vh, 80px) 0` }}>
        {BENEFITS.map((b, i) => (
          <div key={b.n} className="benefit-row flex items-start transition-colors"
            style={{ padding: `clamp(24px, 3.5vh, 40px) ${PAD}`, borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: i === BENEFITS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', gap: 'clamp(20px, 4vw, 64px)' }}>
            <div className="benefit-num font-black text-zinc-600 transition-colors" style={{ fontSize: 'clamp(18px, 2.4vw, 32px)', minWidth: 'clamp(40px, 5vw, 72px)' }}>
              {b.n}
            </div>
            <div className="flex-1 flex flex-col md:flex-row" style={{ gap: 'clamp(8px, 2vw, 48px)' }}>
              <div className="uppercase font-bold" style={{ fontSize: TYPE.accent, letterSpacing: TRACK, flex: '0 0 40%' }}>
                {b.title}
              </div>
              <div className="text-zinc-400" style={{ fontSize: TYPE.body, fontWeight: 300, lineHeight: 1.7 }}>
                {b.text}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-black flex flex-col items-center text-center" style={{ padding: `clamp(60px, 10vh, 120px) ${PAD}` }}>
        <div className="w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${BLUE}, transparent)`, marginBottom: 'clamp(28px, 4vh, 48px)' }} />
        <div className="uppercase font-black leading-tight" style={{ fontSize: 'clamp(22px, 3.4vw, 46px)', marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          Готов лить<br />в <span style={{ color: BLUE }}>плюс</span>?
        </div>
        <button className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group bg-transparent">
          <span className="uppercase font-medium" style={{ fontSize: TYPE.body, letterSpacing: '0.15em' }}>Стать партнёром</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
        </button>
      </section>

      {/* ===== Футер ===== */}
      <div style={{ padding: `0 ${PAD} clamp(20px, 3vh, 32px)` }}>
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
    </div>
  );
}
