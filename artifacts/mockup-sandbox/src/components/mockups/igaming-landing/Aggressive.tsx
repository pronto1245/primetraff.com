import { useEffect, useState, useRef } from 'react';
import { Zap, ArrowRight, ChevronRight, Menu, X, TrendingUp, Globe, DollarSign, Shield, Headset, Star } from 'lucide-react';

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function CounterCard({ num, suffix, label, icon: Icon, delay = 0 }: { num: number; suffix: string; label: string; icon: any; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(num, 2000, started);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center flex flex-col items-center relative z-10 group" style={{ transform: 'skewX(4deg)' }}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
        <Icon className="w-5 h-5" style={{ color: '#00FF88' }} />
      </div>
      <div className="font-black leading-none mb-2 tabular-nums" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '3.5rem', color: '#fff', textShadow: '0 0 30px rgba(0,255,136,0.4)' }}>
        {suffix === '$' ? '$' : ''}{count.toLocaleString()}{suffix !== '$' ? suffix : ''}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'Inter',sans-serif", color: '#6b7280' }}>{label}</div>
    </div>
  );
}

function FloatingSymbol({ symbol, style }: { symbol: string; style: React.CSSProperties }) {
  return (
    <div className="absolute select-none pointer-events-none font-black" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '4rem', color: 'rgba(0,255,136,0.04)', ...style }}>
      {symbol}
    </div>
  );
}

const TICKER_ITEMS = ['CPA UP TO $300', 'REVSHARE 45%', 'HYBRID DEALS', 'WEEKLY PAYOUTS', '500+ OFFERS', '150+ GEO', 'NO SHAVE', 'INSTANT PAYMENTS', 'VIP RATES', 'PRIVATE CAPS'];

export function Aggressive() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const features = [
    { icon: TrendingUp, title: 'Топовые ставки', desc: 'Эксклюзивные CPA до $300 и RevShare до 45% — со старта без вопросов.' },
    { icon: DollarSign, title: 'Выплата день в день', desc: 'Crypto, Capitalist, карты, Wire. Задержек нет — это наш стандарт.' },
    { icon: Headset, title: 'Менеджер 24/7', desc: 'Личный менеджер по связкам, конверту и апруву — не бот, живой человек.' },
    { icon: Shield, title: 'Нет шейва', desc: 'Реалтайм статистика, честные условия. Зарабатываешь ты — зарабатываем мы.' },
    { icon: Globe, title: '150+ ГЕО', desc: 'Tier 1, Tier 2, СНГ — покрываем всё. Находим офферы под любой источник.' },
    { icon: Star, title: 'Закрытые офферы', desc: 'Приватные ставки и закрытые бренды только для партнёров сети.' },
  ];

  const offers = [
    { name: 'SpinAura', cpa: '$240', geo: 'AU · DE · FI', tags: ['CPA', 'Tier 1'], hot: true },
    { name: 'ElonBet', cpa: '$180', geo: 'BR · MX · CL', tags: ['RS', 'Tier 2'], hot: false },
    { name: 'Prestige', cpa: '$300', geo: 'CA · NZ · IE', tags: ['CPA', 'VIP'], hot: true },
  ];

  const navStyle: React.CSSProperties = scrolled
    ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .3s', background: 'rgba(5,5,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0' }
    : { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .3s', padding: '24px 0' };

  return (
    <div style={{ minHeight: '100vh', background: '#05050A', color: '#fff', fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(5deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(15px) rotate(-4deg)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(8deg)} }
        @keyframes glow-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        .ticker-inner { display:flex; gap:0; animation: ticker 30s linear infinite; width:max-content; }
        .ticker-inner:hover { animation-play-state:paused; }
        .skewbtn { transform:skewX(-12deg); display:inline-flex; align-items:center; }
        .skewbtn-inner { transform:skewX(12deg); display:inline-flex; align-items:center; gap:10px; }
        .card-glow:hover { box-shadow: 0 0 40px rgba(0,255,136,0.15), 0 0 0 1px rgba(0,255,136,0.3) !important; }
        .neon-text { text-shadow: 0 0 20px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.3); }
        .scanline::after { content:''; position:absolute; inset:0; overflow:hidden; pointer-events:none; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#00FF88', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'skewX(-12deg)', boxShadow: '0 0 20px rgba(0,255,136,0.4)' }}>
              <Zap size={20} color="#000" fill="#000" style={{ transform: 'skewX(12deg)' }} />
            </div>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>
              Prime<span style={{ color: '#00FF88' }}>Traff</span>
            </span>
          </div>

          <div className="hidden md:flex" style={{ gap: 32, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
            {['Преимущества', 'Офферы', 'Партнеры', 'FAQ'].map(l => (
              <a key={l} href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00FF88')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>{l}</a>
            ))}
          </div>

          <div className="hidden md:flex" style={{ gap: 12, alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', color: '#9ca3af', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, cursor: 'pointer' }}>Вход</button>
            <button className="skewbtn" style={{ background: '#00FF88', border: 'none', cursor: 'pointer', padding: '10px 24px', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,255,136,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#00FF88'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.3)'; }}>
              <span className="skewbtn-inner" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: 2, color: '#000', textTransform: 'uppercase' }}>Уникализатор</span>
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenu(!menu)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menu && (
        <div style={{ position: 'fixed', inset: 0, background: '#05050A', zIndex: 40, paddingTop: 96, paddingLeft: 24, paddingRight: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {['Преимущества', 'Офферы', 'Партнеры', 'FAQ'].map(l => (
            <a key={l} href="#" onClick={() => setMenu(false)} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 40, fontWeight: 900, textTransform: 'uppercase', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 16 }}>{l}</a>
          ))}
          <button style={{ background: '#00FF88', color: '#000', padding: '16px', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 900, textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginTop: 16 }}>Уникализатор</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        {/* grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)', backgroundSize: '70px 70px', pointerEvents: 'none' }} />
        {/* glow orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none', animation: 'glow-pulse 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,136,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', animation: 'glow-pulse 5s ease-in-out infinite 1s' }} />
        {/* floating card symbols */}
        <FloatingSymbol symbol="♠" style={{ top: '15%', right: '12%', fontSize: '8rem', color: 'rgba(0,255,136,0.06)', animation: 'float1 7s ease-in-out infinite' }} />
        <FloatingSymbol symbol="♥" style={{ top: '55%', right: '8%', fontSize: '6rem', color: 'rgba(255,60,60,0.05)', animation: 'float2 9s ease-in-out infinite' }} />
        <FloatingSymbol symbol="♣" style={{ top: '70%', left: '8%', fontSize: '7rem', color: 'rgba(0,255,136,0.05)', animation: 'float3 8s ease-in-out infinite' }} />
        <FloatingSymbol symbol="♦" style={{ top: '25%', left: '3%', fontSize: '5rem', color: 'rgba(255,180,0,0.05)', animation: 'float1 6s ease-in-out infinite 2s' }} />
        <FloatingSymbol symbol="7" style={{ top: '40%', right: '20%', fontSize: '12rem', color: 'rgba(0,255,136,0.03)', animation: 'float2 10s ease-in-out infinite' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10, width: '100%' }}>
          {/* badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)', borderRadius: 999, marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00FF88', display: 'inline-block', animation: 'glow-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'Inter',sans-serif", color: '#00FF88', fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>iGaming Affiliate Network · 2026</span>
          </div>

          <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, lineHeight: 0.85, letterSpacing: -2, marginBottom: 24, fontSize: 'clamp(72px,12vw,150px)', textTransform: 'uppercase' }}>
            PRIME<br />
            <span className="neon-text" style={{ color: '#00FF88', WebkitTextStroke: '1px rgba(0,255,136,0.3)' }}>TRAFF</span>
          </h1>

          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(16px,2.5vw,22px)', color: '#6b7280', maxWidth: 600, lineHeight: 1.6, marginBottom: 48, fontWeight: 500 }}>
            Эксклюзивные CPA-офферы для iGaming. Моментальные выплаты. <br />
            <span style={{ color: '#fff', fontWeight: 700 }}>Лей туда, где реально платят.</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 64 }}>
            <button className="skewbtn" style={{ background: '#00FF88', border: 'none', cursor: 'pointer', padding: '18px 40px', boxShadow: '0 0 30px rgba(0,255,136,0.3)', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'skewX(-12deg) scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(0,255,136,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'skewX(-12deg) scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,255,136,0.3)'; }}>
              <span className="skewbtn-inner" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 900, color: '#000', letterSpacing: 2, textTransform: 'uppercase' }}>
                Стать партнером <ArrowRight size={20} />
              </span>
            </button>
            <button className="skewbtn" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', padding: '18px 40px', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0088FF'; (e.currentTarget as HTMLElement).style.color = '#0088FF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}>
              <span className="skewbtn-inner" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>
                Вход в кабинет
              </span>
            </button>
          </div>

          {/* mini stats inline */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            {[['500+', 'офферов'], ['150+', 'гео'], ['$50K+', 'выплат/мес']].map(([n, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 900, color: '#00FF88' }}>{n}</span>
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: '#00FF88', padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 20 }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 900, color: '#000', textTransform: 'uppercase', letterSpacing: 3, padding: '0 32px', whiteSpace: 'nowrap', flexShrink: 0 }}>
              ◆ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding: '80px 24px', background: '#080810', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px)', backgroundSize: '1px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', transform: 'skewX(-4deg)', overflow: 'hidden' }}>
            {[
              { icon: TrendingUp, num: 500, suffix: '+', label: 'Прямых офферов' },
              { icon: Globe, num: 150, suffix: '+', label: 'Гео покрытие' },
              { icon: DollarSign, num: 50000, suffix: '+', label: 'Выплат / месяц' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '48px 32px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <CounterCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="benefits" style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#00FF88', fontWeight: 800, fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>Почему мы</p>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,7vw,80px)', textTransform: 'uppercase', lineHeight: 0.9 }}>
              УСЛОВИЯ,<br /><span style={{ color: '#00FF88' }}>КОТОРЫХ НЕТ</span><br />У ДРУГИХ
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card-glow"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ padding: '40px 32px', background: hoveredFeature === i ? '#0D0D18' : '#0A0A12', border: '1px solid rgba(255,255,255,0.05)', transition: 'all .3s', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
                {hoveredFeature === i && <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.1), transparent 70%)', pointerEvents: 'none' }} />}
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, transition: 'transform .3s', transform: hoveredFeature === i ? 'scale(1.1)' : 'scale(1)' }}>
                  <Icon size={22} color="#00FF88" />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 900, textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFERS ── */}
      <section id="offers" style={{ padding: '80px 24px', background: '#080810', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,6vw,72px)', textTransform: 'uppercase', lineHeight: 0.9 }}>
              Горячие<br /><span style={{ color: '#00FF88' }}>Офферы</span>
            </h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00FF88', background: 'none', border: 'none', fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>
              Все офферы <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 2 }}>
            {offers.map((offer, i) => (
              <div key={i} className="card-glow" style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0A0A12', transition: 'all .3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                {offer.hot && (
                  <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: '#FF3B3B', color: '#fff', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 10px', animation: 'glow-pulse 2s ease-in-out infinite' }}>
                    HOT 🔥
                  </div>
                )}
                <div style={{ height: 140, background: 'linear-gradient(135deg, #0D0D1A 0%, #111126 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 64, fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: -2 }}>{offer.name.toUpperCase()}</span>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6 }}>
                    {offer.tags.map(t => (
                      <span key={t} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 900, padding: '3px 10px', letterSpacing: 1, textTransform: 'uppercase', background: t === 'CPA' ? '#00FF88' : t === 'VIP' ? '#FFB700' : '#0088FF', color: (t === 'CPA' || t === 'VIP') ? '#000' : '#fff' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 900, textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 }}>{offer.name} Casino</h4>
                  <div style={{ display: 'flex', gap: 20, fontSize: 14, fontWeight: 700 }}>
                    <span style={{ color: '#00FF88' }}>До {offer.cpa}</span>
                    <span style={{ color: '#6b7280' }}>{offer.geo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="partners" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: '#374151', fontWeight: 800, fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 48 }}>Нам доверяют лидеры рынка</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 60px', filter: 'grayscale(1)', opacity: 0.35 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'grayscale(0)'; (e.currentTarget as HTMLElement).style.opacity = '0.8'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'grayscale(1)'; (e.currentTarget as HTMLElement).style.opacity = '0.35'; }}>
            {['VULKAN', 'PIN-UP', '1WIN', 'STAKE', 'N1', 'GG.BET', 'VAVADA', '1XBET'].map(n => (
              <span key={n} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 32, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', cursor: 'default', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00FF88')}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #05050A 0%, #0A1A0A 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <p style={{ color: '#00FF88', fontWeight: 800, fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}>Регистрация открыта</p>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(60px,10vw,110px)', textTransform: 'uppercase', lineHeight: 0.88, marginBottom: 32 }}>
            ГОТОВ<br />
            <span className="neon-text" style={{ color: '#00FF88' }}>ЗАРАБАТЫВАТЬ</span><br />
            БОЛЬШЕ?
          </h2>
          <p style={{ color: '#6b7280', fontSize: 18, marginBottom: 48, fontWeight: 500 }}>
            Регистрируйся и получи <span style={{ color: '#fff', fontWeight: 700 }}>бамп ставки +10%</span> на первый месяц работы.
          </p>
          <button className="skewbtn" style={{ background: '#00FF88', border: 'none', cursor: 'pointer', padding: '22px 56px', boxShadow: '0 0 40px rgba(0,255,136,0.35)', transition: 'all .2s', fontSize: 22 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'skewX(-12deg) scale(1.05)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(0,255,136,0.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'skewX(-12deg) scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,255,136,0.35)'; }}>
            <span className="skewbtn-inner" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 900, color: '#000', letterSpacing: 2, textTransform: 'uppercase' }}>
              Создать аккаунт <ArrowRight size={22} />
            </span>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#030306', padding: '60px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, background: '#00FF88', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'skewX(-12deg)', boxShadow: '0 0 15px rgba(0,255,136,0.3)' }}>
                  <Zap size={17} color="#000" fill="#000" style={{ transform: 'skewX(12deg)' }} />
                </div>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Prime<span style={{ color: '#00FF88' }}>Traff</span></span>
              </div>
              <p style={{ color: '#374151', fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Премиальная iGaming партнерская сеть. Монетизируй трафик с максимальным профитом.</p>
            </div>
            <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, color: '#fff' }}>Навигация</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#4b5563' }}>
                  {['О нас', 'Офферы', 'Блог', 'Правила'].map(l => <a key={l} href="#" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#00FF88')} onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}>{l}</a>)}
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, color: '#fff' }}>Контакты</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  {['t.me/primetraff_support', 'support@primetraff.com', 'Уникализатор', '2FA Генератор'].map(l => (
                    <a key={l} href="#" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#00FF88')} onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}>{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#1f2937' }}>
            <span>© 2026 PrimeTraff. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Terms of Service', 'Privacy Policy'].map(l => <a key={l} href="#" style={{ color: '#1f2937', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#1f2937')}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
