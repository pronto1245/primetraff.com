import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import bgImage from './assets/dsb-bg.png';

/* ============================================================
   Design tokens — та же система, что и на главной
   ============================================================ */
const BLUE = '#3b82f6';
const FONT = "'Unbounded', sans-serif";
const TYPE = {
  micro:  'clamp(9px,  0.8vw, 11px)',
  small:  'clamp(11px, 1vw,   14px)',
};
const TRACK = '0.08em';
const PAD   = 'clamp(20px, 3vw, 48px)';

export function Affiliates() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
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

      {/* ===== AFFILIATES — оформление как «О нас» на главной ===== */}
      <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-25" style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="text-zinc-400" style={{ fontFamily: "'Comforter', cursive", fontSize: 'clamp(44px, 6.5vw, 96px)', lineHeight: 1, opacity: 0.8 }}>
              Primetraff.com
            </div>
            <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(18px, 2.2vw, 30px)', letterSpacing: '0.12em', marginTop: '-0.55em', position: 'relative', zIndex: 1 }}>
              Affiliates
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 920 }}>
            <p>Мы глубоко понимаем принципы работы и экономику аффилейтов — независимо от источника трафика.</p>
            <p style={{ marginTop: '1.9em' }}>Приватные сделки, защита от скама и компетентная команда менеджеров — это не дополнительные преимущества, а базовый уровень, который мы считаем обязательным.</p>
            <p style={{ marginTop: '1.9em' }}>Наша задача — создать условия, в которых аффилейт может спокойно масштабироваться, понимать экономику своих кампаний и быть уверенным, что его интересы защищены.</p>
          </div>
        </div>

        {/* Футер */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}>
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
