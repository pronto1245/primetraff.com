import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const BLUE = '#2E7CF6';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: `all .9s cubic-bezier(.16,1,.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export function DarkStudioBlue() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const stats = [
    ['500+', 'Прямых офферов'],
    ['150+', 'ГЕО покрытие'],
    ['24/7', 'Поддержка'],
    ['0%', 'Шейв'],
  ];

  const features = [
    { no: '01', title: 'Топовые ставки', desc: 'Эксклюзивные CPA до $300 и RevShare до 45% — со старта, без испытательных сроков.' },
    { no: '02', title: 'Выплата день в день', desc: 'Crypto, Capitalist, карты, Wire. Задержки исключены — это стандарт сети.' },
    { no: '03', title: 'Личный менеджер', desc: 'По связкам, конверту и апруву отвечает живой человек. В любое время.' },
    { no: '04', title: 'Прозрачная статистика', desc: 'Реалтайм данные без шейва. Зарабатываешь ты — зарабатываем мы.' },
    { no: '05', title: '150+ ГЕО', desc: 'Tier 1, Tier 2, СНГ. Офферы под любой источник трафика.' },
    { no: '06', title: 'Закрытые офферы', desc: 'Приватные ставки и бренды, доступные только партнёрам сети.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#050507', color: '#fff', fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes pulse-dot { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:.4; transform:scale(.8)} }
        @keyframes beam { 0%,100%{opacity:.5} 50%{opacity:1} }
        .mono { font-family:'Space Mono',monospace; }
        .serif { font-family:'Playfair Display',serif; }
        .link-line { position:relative; }
        .link-line::after { content:''; position:absolute; left:0; bottom:-4px; width:0; height:1px; background:${BLUE}; transition:width .4s; }
        .link-line:hover::after { width:100%; }
        .cta-btn { transition: all .5s; border-bottom:1px solid rgba(255,255,255,0.3); }
        .cta-btn:hover { border-color:#fff; }
        .cta-btn:hover .cta-arrow { transform:translateX(6px); }
        .cta-arrow { transition: transform .5s; }
        .feature-row { transition: all .4s; border-bottom:1px solid rgba(255,255,255,0.08); }
        .feature-row:hover { background:rgba(46,124,246,0.04); padding-left:16px !important; }
        .feature-row:hover .f-no { color:${BLUE}; }
        .feature-row:hover .f-arrow { opacity:1; transform:translate(0,0); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .4s', background: scrolled ? 'rgba(5,5,7,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: BLUE, animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span className="mono" style={{ fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>PrimeTraff</span>
          </div>
          <div className="hidden md:flex" style={{ gap: 40 }}>
            {['Сеть', 'Условия', 'Офферы', 'FAQ'].map(l => (
              <a key={l} href="#" className="mono link-line" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
          <button className="mono" style={{ background: 'none', border: `1px solid rgba(255,255,255,0.2)`, color: '#fff', padding: '10px 24px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 999, transition: 'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}>
            Вход
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', position: 'relative', padding: '120px 24px 60px', overflow: 'hidden' }}>
        {/* subtle abstract bg */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 30%, rgba(46,124,246,0.12) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: '35%', background: `linear-gradient(180deg, transparent, ${BLUE})`, animation: 'beam 3s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* top */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 40 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid rgba(46,124,246,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            </div>
            <span className="mono" style={{ fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#71717a' }}>iGaming Affiliate Network</span>
          </div>
        </Reveal>

        {/* middle */}
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
            <h1 className="serif" style={{ fontSize: 'clamp(64px,10vw,130px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              Prime<br /><span style={{ color: BLUE }}>Traff</span>
            </h1>
            <p style={{ color: '#a1a1aa', fontWeight: 300, fontSize: 18, maxWidth: 380, lineHeight: 1.7, letterSpacing: 0.3 }}>
              Партнёрская сеть нового поколения. Высокие ставки, моментальные выплаты, поддержка 24/7.
            </p>
          </div>
        </Reveal>

        {/* bottom */}
        <Reveal delay={300}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
            <div style={{ width: 1, height: 64, background: `linear-gradient(180deg, ${BLUE}, transparent)` }} />
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="cta-btn mono" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', paddingBottom: 8, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer' }}>
                Стать партнёром <ArrowRight className="cta-arrow" size={16} />
              </button>
              <button className="mono" style={{ background: 'none', border: 'none', color: '#71717a', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', transition: 'color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>
                Telegram
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {stats.map(([n, l], i) => (
            <div key={l} style={{ padding: '48px 24px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div className="serif" style={{ fontSize: 44, fontWeight: 500, marginBottom: 8, color: i === 3 ? BLUE : '#fff' }}>{n}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#71717a' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: BLUE }}>Условия</span>
              <h2 className="serif" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Условия, которых<br />нет <span style={{ color: BLUE }}>у других</span>
              </h2>
            </div>
          </Reveal>

          <div>
            {features.map(({ no, title, desc }, i) => (
              <Reveal key={no} delay={i * 60}>
                <div className="feature-row" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1.4fr 40px', gap: 24, alignItems: 'center', padding: '32px 8px' }}>
                  <span className="mono f-no" style={{ fontSize: 13, color: '#3f3f46', transition: 'color .4s' }}>{no}</span>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 500 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#71717a', fontWeight: 300, lineHeight: 1.7 }}>{desc}</p>
                  <ArrowUpRight className="f-arrow" size={18} color={BLUE} style={{ opacity: 0, transform: 'translate(-6px,6px)', transition: 'all .4s' }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE / ABOUT ── */}
      <section style={{ padding: '120px 24px', background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(46,124,246,0.07) 0%, transparent 70%)`, textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid rgba(46,124,246,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            </div>
            <p className="serif" style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 400, lineHeight: 1.4, fontStyle: 'italic', color: '#e4e4e7' }}>
              Мы работаем, чтобы вы зарабатывали. Прозрачные процессы, в которых выигрывают все стороны.
            </p>
            <span className="mono" style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#52525b' }}>— Команда PrimeTraff</span>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '140px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: '40%', background: `linear-gradient(0deg, transparent, ${BLUE})`, pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: '#71717a' }}>Регистрация открыта</span>
            <h2 className="serif" style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              Готов<br /><span style={{ color: BLUE }}>зарабатывать?</span>
            </h2>
            <p style={{ color: '#a1a1aa', fontWeight: 300, fontSize: 16, maxWidth: 340, lineHeight: 1.7 }}>
              Регистрируйся и получи бамп ставки +10% на первый месяц работы.
            </p>
            <button className="cta-btn mono" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', paddingBottom: 8, fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer' }}>
              Создать аккаунт <ArrowRight className="cta-arrow" size={16} />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#71717a' }}>PrimeTraff © 2026</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Telegram', 'Support', 'Блог'].map(l => (
              <a key={l} href="#" className="mono link-line" style={{ color: '#52525b', textDecoration: 'none', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
