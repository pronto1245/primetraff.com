import { useEffect, useState } from 'react';
import { TrendingUp, Zap, Headset, Crown, ArrowRight, ChevronRight, Menu, X, Shield, Globe } from 'lucide-react';

export function Aggressive() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = isScrolled
    ? 'fixed top-0 w-full z-50 transition-all duration-300 bg-black/90 backdrop-blur-md border-b border-white/5 py-4'
    : 'fixed top-0 w-full z-50 transition-all duration-300 bg-transparent py-6';

  const features = [
    { icon: TrendingUp, title: 'Высокие ставки', desc: 'Эксклюзивные условия со старта. Бампы ставок для проверенных партнеров.' },
    { icon: Zap, title: 'Быстрые выплаты', desc: 'Платим день в день. Crypto, Capitalist, Карты, Wire — любой метод.' },
    { icon: Headset, title: 'Поддержка 24/7', desc: 'Личный менеджер, который реально помогает с конвертом и связками.' },
    { icon: Shield, title: 'Без шейва', desc: 'Прозрачная стата в реальном времени. Мы зарабатываем вместе с тобой.' },
  ];

  const partners = ['VULKAN', 'PIN-UP', '1WIN', 'STAKE', 'N1', 'GG.BET'];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
        .fc { font-family: 'Barlow Condensed', sans-serif; }
        .fi { font-family: 'Inter', sans-serif; }
        .tglow { text-shadow: 0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.3); }
        .bglow { box-shadow: 0 0 20px rgba(0,255,136,0.25); }
        .hglow:hover { box-shadow: 0 0 30px rgba(0,255,136,0.4), inset 0 0 10px rgba(0,255,136,0.1); border-color: #00FF88 !important; }
        .clip-d { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
        .clip-dr { clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%); }
        .skew-btn { transform: skewX(-12deg); }
        .skew-inner { display: inline-block; transform: skewX(12deg); }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .pulse { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#00FF88] rounded flex items-center justify-center bglow" style={{ transform: 'skewX(-12deg)' }}>
              <Zap className="w-5 h-5 text-black" fill="currentColor" style={{ transform: 'skewX(12deg)' }} />
            </div>
            <span className="fc text-2xl font-black tracking-wider uppercase">
              Prime<span className="text-[#00FF88]">Traff</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 fi font-semibold text-sm uppercase tracking-wider text-gray-300">
            <a href="#benefits" className="hover:text-[#00FF88] transition-colors">Преимущества</a>
            <a href="#offers" className="hover:text-[#00FF88] transition-colors">Офферы</a>
            <a href="#partners" className="hover:text-[#00FF88] transition-colors">Партнеры</a>
            <a href="#faq" className="hover:text-[#00FF88] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="fi text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">
              Вход
            </button>
            <button className="bg-[#00FF88] text-black px-5 py-2.5 fi font-bold uppercase tracking-wider skew-btn hover:bg-white transition-colors bglow">
              <span className="skew-inner">Уникализатор</span>
            </button>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0F] z-40 pt-24 px-6 flex flex-col gap-6 md:hidden">
          {['Преимущества', 'Офферы', 'Партнеры', 'FAQ'].map((item) => (
            <a key={item} href="#" className="fc text-4xl font-black uppercase border-b border-white/10 pb-4" onClick={() => setMobileMenuOpen(false)}>{item}</a>
          ))}
          <button className="bg-[#00FF88] text-black py-4 fi font-bold uppercase tracking-wider text-xl text-center mt-4">
            Уникализатор
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="clip-d relative overflow-hidden flex items-center min-h-screen pb-32" style={{ background: 'linear-gradient(135deg, #0A0A0F 0%, #0D1117 50%, #0A1628 100%)' }}>
        {/* grid bg */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #00FF88, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #0088FF, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] pulse" />
            <span className="fi text-[#00FF88] text-xs font-bold uppercase tracking-widest">Top CPA Network · iGaming</span>
          </div>

          <h1 className="fc font-black uppercase leading-[0.85] tracking-tighter mb-6" style={{ fontSize: 'clamp(80px, 14vw, 160px)' }}>
            DOMINATE<br />
            <span className="tglow" style={{ color: '#00FF88' }}>iGAMING</span>
          </h1>

          <p className="fi text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed">
            Эксклюзивные офферы, приватные ставки и моментальные выплаты для топов арбитража. Лей туда, где платят больше.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-[#00FF88] text-black px-10 py-5 fi font-black text-lg uppercase tracking-wider skew-btn hover:bg-white transition-all hover:scale-105 bglow flex items-center justify-center gap-3">
              <span className="skew-inner flex items-center gap-3">Стать партнером <ArrowRight className="w-5 h-5" /></span>
            </button>
            <button className="border-2 border-white/20 px-10 py-5 fi font-black text-lg uppercase tracking-wider skew-btn hover:border-[#0088FF] hover:text-[#0088FF] transition-all flex items-center justify-center">
              <span className="skew-inner">Смотреть офферы</span>
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-6">
        <div className="border border-white/10 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 backdrop-blur-xl" style={{ background: '#111116', transform: 'skewX(-3deg)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.05), rgba(0,136,255,0.05))' }} />
          {[
            { icon: TrendingUp, num: '500+', label: 'Прямых офферов' },
            { icon: Globe, num: '150+', label: 'ГЕО по всему миру' },
            { icon: Zap, num: '$50K+', label: 'Выплат в месяц' },
            { icon: Crown, num: '1000+', label: 'Активных вебов' },
          ].map(({ icon: Icon, num, label }, i) => (
            <div key={i} className="text-center flex flex-col items-center relative z-10" style={{ transform: 'skewX(3deg)' }}>
              <Icon className="w-7 h-7 text-[#00FF88] mb-3 opacity-60" />
              <div className="fc text-5xl md:text-6xl font-black text-white tglow mb-1">{num}</div>
              <div className="fi text-xs font-bold uppercase tracking-widest text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="benefits" className="py-32 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="fc font-black uppercase mb-6" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
              Почему <span style={{ color: '#00FF88' }}>PrimeTraff</span>?
            </h2>
            <p className="fi text-gray-400 text-lg md:text-xl">
              Никакого шейва. Только профит, прозрачность и условия для топов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="border border-white/5 p-8 hglow transition-all duration-300 group relative overflow-hidden" style={{ background: '#111116' }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,255,136,0.15)' }} />
                <Icon className="w-12 h-12 mb-6 relative z-10 group-hover:scale-110 transition-transform" style={{ color: '#00FF88' }} strokeWidth={1.5} />
                <h3 className="fc text-2xl font-bold uppercase mb-4 relative z-10">{title}</h3>
                <p className="fi text-gray-400 relative z-10 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="py-24 border-y border-white/5" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="fc font-black uppercase mb-2" style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}>
                Топ <span style={{ color: '#00FF88' }}>Офферы</span>
              </h2>
              <p className="fi text-gray-400 text-base uppercase tracking-wider font-bold">Свежие и конвертящие бренды</p>
            </div>
            <button className="fi text-[#00FF88] font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2 text-sm">
              Все офферы <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'SpinAura Casino', cpa: '$220', geo: 'AU, DE, FI', tags: ['CPA', 'Tier 1'] },
              { name: 'ElonBet', cpa: '$180', geo: 'BR, MX, CL', tags: ['RS', 'Tier 2'] },
              { name: 'Prestige Casino', cpa: '$300', geo: 'CA, NZ, IE', tags: ['CPA', 'VIP'] },
            ].map((offer, i) => (
              <div key={i} className="group cursor-pointer border border-white/5 group-hover:border-[#00FF88]/50 transition-colors overflow-hidden" style={{ background: '#1A1A24' }}>
                <div className="h-40 relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a30, #0a0a20)' }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <span className="fc text-5xl font-black uppercase text-white/10 group-hover:text-white/20 transition-colors">{i + 1}</span>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {offer.tags.map((tag) => (
                      <span key={tag} className="fi text-xs font-bold px-2 py-1 uppercase" style={{ background: tag === 'CPA' ? '#00FF88' : '#0088FF', color: tag === 'CPA' ? '#000' : '#fff' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="fc text-2xl font-bold uppercase mb-2">{offer.name}</h4>
                  <div className="flex gap-4 fi text-sm font-bold">
                    <span style={{ color: '#00FF88' }}>Up to {offer.cpa}</span>
                    <span className="text-gray-400">{offer.geo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="fi text-xs font-bold uppercase tracking-widest text-gray-600 mb-12">Нам доверяют лидеры рынка</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
            {partners.map((name) => (
              <span key={name} className="fc text-3xl font-black uppercase tracking-widest hover:text-[#00FF88] transition-colors cursor-default">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="clip-dr py-32 relative" style={{ background: '#00FF88' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-black">
          <h2 className="fc font-black uppercase leading-none mb-6" style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}>
            ГОТОВ<br />ЗАРАБАТЫВАТЬ?
          </h2>
          <p className="fi font-bold text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Регистрируйся и получи бамп ставки +10% на первый месяц.
          </p>
          <button className="bg-black text-[#00FF88] px-12 py-6 fi font-black text-2xl uppercase tracking-wider skew-btn hover:bg-white hover:text-black transition-all hover:scale-105" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.4)' }}>
            <span className="skew-inner">Создать аккаунт</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-20 pb-10 border-t border-white/5" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-[#00FF88] rounded flex items-center justify-center bglow" style={{ transform: 'skewX(-12deg)' }}>
                  <Zap className="w-4 h-4 text-black" fill="currentColor" style={{ transform: 'skewX(12deg)' }} />
                </div>
                <span className="fc text-2xl font-black tracking-wider uppercase">Prime<span style={{ color: '#00FF88' }}>Traff</span></span>
              </div>
              <p className="fi text-gray-500 text-sm max-w-xs leading-relaxed">
                Премиальная iGaming партнерская сеть. Монетизируй трафик с максимальным профитом.
              </p>
            </div>

            <div className="flex gap-16">
              <div>
                <h4 className="fc font-bold text-lg uppercase mb-4">Навигация</h4>
                <div className="flex flex-col gap-2 fi text-gray-400 text-sm">
                  {['О нас', 'Офферы', 'Блог', 'Правила'].map((l) => (
                    <a key={l} href="#" className="hover:text-[#00FF88] transition-colors">{l}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="fc font-bold text-lg uppercase mb-4">Контакты</h4>
                <div className="flex flex-col gap-2 fi text-gray-400 text-sm">
                  <a href="#" className="hover:text-[#00FF88] transition-colors text-white">t.me/primetraff_support</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">support@primetraff.com</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">Уникализатор</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">2FA Генератор</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 fi text-xs text-gray-600">
            <p>© 2026 PrimeTraff. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
