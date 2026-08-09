import { useState } from 'react';
import { ArrowRight, Headphones, Send, UserRound, X, Zap } from 'lucide-react';
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
        .btn-fill { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.35); background: rgba(0,0,0,0.45); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .btn-fill span { position: relative; z-index: 1; }
        .btn-fill::before { content: ''; position: absolute; inset: 0; background: #2563eb; transform: translateX(-101%); transition: transform .45s cubic-bezier(.22,1,.36,1); }
        .btn-fill:hover::before { transform: translateX(0); }
        .btn-ghost:hover { border-color: #2563eb; }
        .contact-row { position: relative; overflow: hidden; transition: background .35s ease; backdrop-filter: blur(2px); }
        @keyframes contact-marquee { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .contact-marquee { display: inline-block; animation: contact-marquee 40s linear infinite; }
        .contact-row:hover { background: #2563eb; } .contact-row:hover span, .contact-row:hover .row-desc { color: #fff !important; }
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
          <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(220deg) saturate(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              Primetraff.com
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em' }}>
              Affiliates
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(12px, 1.2vw, 17px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 1160 }}>
            <p>Предоставляем доступ к актуальным офферам и условиям, рассчитанным на разные источники трафика.</p>
            <p>Помогаем разобраться с запуском, трекингом, оптимизацией и техническими вопросами.</p>
            <p>За каждым партнёром закрепляется менеджер, который остаётся на связи в процессе работы.</p>
            <p>Сильные результаты открывают возможности для увеличения объёмов и получения индивидуальных условий.</p>
            <p>Мы заинтересованы в том, чтобы ваши успешные связки развивались и приносили больше дохода.</p>
          </div>

          {/* Кнопки Регистрация / Вход — сразу под текстом, с отступом от краёв */}
          <div className="w-full flex items-center justify-between" style={{ marginTop: 'clamp(40px, 7vh, 72px)', padding: '0 clamp(40px, 10vw, 160px)' }}>
            <button className="btn-fill rounded-full text-white uppercase cursor-pointer"
              style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: 'clamp(14px, 1.6vh, 18px) 0', width: 'clamp(160px, 15vw, 220px)' }}>
              <span>Регистрация</span>
            </button>
            <button className="btn-fill btn-ghost rounded-full text-white uppercase cursor-pointer"
              style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: 'clamp(14px, 1.6vh, 18px) 0', width: 'clamp(160px, 15vw, 220px)' }}>
              <span>Вход</span>
            </button>
          </div>
        </div>

      </section>

      {/* ===== ПОЧЕМУ НАМ ДОВЕРЯЮТ ===== */}
      <section className="relative bg-black flex flex-col justify-between" style={{ height: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)`, overflow: 'hidden' }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(220deg) saturate(1.1)', opacity: 0.35 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            Почему
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(22px, 3.5vh, 40px)' }}>
            Нам доверяют
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.75, fontWeight: 400, maxWidth: 1160 }}>
            <p>Мы берём на себя решение ключевых вопросов — от индивидуальных ставок до пересмотра холдов и возможности работы по предоплате.</p>
            <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Партнёры отмечают высокий уровень экспертизы нашей команды и качество сопровождения на каждом этапе.</p>
            <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>До запуска тщательно проверяем рекламодателей и условия сотрудничества, снижая вероятность спорных ситуаций и проблем с выплатами.</p>
            <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Вы концентрируетесь на привлечении трафика, а переговоры, контроль и организационные вопросы остаются на нашей стороне.</p>
            <p style={{ marginTop: 'clamp(12px, 2vh, 20px)' }}>Ваша задача — приводить качественный трафик. Наша — сделать так, чтобы вы за него получили максимум.</p>
          </div>
        </div>

      </section>

      {/* ===== ОБСУДИТЬ СОТРУДНИЧЕСТВО ===== */}
      <section className="relative bg-black flex flex-col justify-between overflow-hidden" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(220deg) saturate(1.1)', opacity: 0.25 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90" />
        </div>
        <div className="absolute left-0 right-0 z-0 pointer-events-none overflow-hidden" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="contact-marquee uppercase font-black whitespace-nowrap" style={{ fontSize: 'clamp(90px, 14vw, 220px)', letterSpacing: '0.02em', color: 'transparent', WebkitTextStroke: '1px rgba(59,130,246,0.22)', lineHeight: 1 }}>
            {'СВЯЗАТЬСЯ С НАМИ • '.repeat(6)}
          </div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              Обсудить
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(32px, 5vh, 60px)' }}>
              Сотрудничество
            </div>
          </div>
          <div className="w-full" style={{ maxWidth: 1100 }}>
            {[
              { icon: Headphones, title: 'Support', desc: 'на связи 24/7 — решаем любой вопрос быстро' },
              { icon: UserRound, title: 'Менеджер', desc: 'прямой контакт для обсуждения условий, ставок и запуска' },
              { icon: Send, title: 'TG-Channel', desc: 'новости сети, свежие офферы и апдейты — только по делу' },
            ].map((c, i) => (
              <a key={c.title} href="#" className="contact-row group flex items-center no-underline"
                style={{ gap: 'clamp(16px, 2vw, 28px)', padding: 'clamp(18px, 2.6vh, 28px) clamp(12px, 1.5vw, 24px)', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: i === 2 ? '1px solid rgba(255,255,255,0.12)' : 'none', textDecoration: 'none' }}>
                <span className="font-black flex-shrink-0" style={{ color: 'rgba(59,130,246,0.85)', fontSize: 'clamp(18px, 2.2vw, 32px)', letterSpacing: '0.04em', width: 'clamp(44px, 4.5vw, 70px)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-shrink-0 rounded-full flex items-center justify-center font-bold"
                  style={{ width: 'clamp(38px, 3.4vw, 52px)', height: 'clamp(38px, 3.4vw, 52px)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 'clamp(13px, 1.2vw, 18px)' }}>
                  <c.icon style={{ width: '48%', height: '48%' }} strokeWidth={1.8} />
                </span>
                <span className="uppercase font-bold text-white" style={{ fontSize: 'clamp(14px, 1.5vw, 22px)', letterSpacing: '0.08em', minWidth: 'clamp(120px, 16vw, 240px)' }}>{c.title}</span>
                <span className="row-desc uppercase text-zinc-400 flex-1" style={{ fontSize: 'clamp(9px, 0.95vw, 13px)', letterSpacing: '0.06em', fontWeight: 300 }}>{c.desc}</span>
                <ArrowRight className="w-5 h-5 text-white flex-shrink-0 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
        {/* Футер */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(20px, 3vh, 36px)' }}>
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
