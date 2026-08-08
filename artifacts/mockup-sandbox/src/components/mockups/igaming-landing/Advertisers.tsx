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
};
const TRACK = '0.08em';
const PAD   = 'clamp(20px, 3vw, 48px)';

export function Advertisers() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&family=Comforter&display=swap');
        ::-webkit-scrollbar { display: none; }
        .btn-fill { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.35); background: rgba(0,0,0,0.45); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .btn-fill span { position: relative; z-index: 1; }
        .btn-fill::before { content: ''; position: absolute; inset: 0; background: #2563eb; transform: translateX(-101%); transition: transform .45s cubic-bezier(.22,1,.36,1); }
        .btn-fill:hover::before { transform: translateX(0); }
        .btn-ghost:hover { border-color: #2563eb; }
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
              style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none', color: item === 'Рекламодателям' ? BLUE : undefined }}>
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

      {/* ===== ADVERTISERS — оформление как «О нас» на главной ===== */}
      <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              Primetraff.com
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em' }}>
              Advertisers
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(12px, 1.2vw, 17px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 1160 }}>
            <p>Проверка каждого аффилейта позволяет минимизировать риски некачественного трафика и защищать интересы всех участников.</p>
            <p>В процессе работы мы делаем ставку на качество, а не на объём: источники с низкими показателями отключаются, а эффективные сорсы получают возможность масштабироваться.</p>
            <p>Наша цель проста — сохранять качество трафика и помогать сильным партнёрам расти вместе с нами.</p>
          </div>

          {/* CTA — Связаться с нами, как «Стать партнёром» на главной */}
          <div className="w-full flex justify-center" style={{ marginTop: 'clamp(40px, 7vh, 72px)' }}>
            <button className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group bg-transparent cursor-pointer">
              <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(12px, 1.15vw, 16px)', letterSpacing: '0.15em' }}>Связаться с нами</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </button>
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
