import React, { useEffect, useState } from 'react';
import { Play, TrendingUp, Zap, Headset, Crown, ArrowRight, ChevronRight, Menu, X, Shield, Globe } from 'lucide-react';

export function Aggressive() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans overflow-x-hidden selection:bg-[#00FF88] selection:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .font-condensed { font-family: 'Barlow Condensed', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3);
        }
        
        .box-glow {
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
        }
        
        .hover-box-glow:hover {
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.4), inset 0 0 10px rgba(0, 255, 136, 0.2);
          border-color: #00FF88;
        }

        .diagonal-bg {
          background: linear-gradient(135deg, #0A0A0F 0%, #0A0A0F 40%, rgba(0, 255, 136, 0.05) 40%, rgba(0, 255, 136, 0.05) 60%, #0A0A0F 60%, #0A0A0F 100%);
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
      `}} />

      {/* Navigation */}
      <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${isScrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}\`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#00FF88] rounded flex items-center justify-center transform -skew-x-12 box-glow">
              <Zap className="w-6 h-6 text-black" fill="currentColor" />
            </div>
            <span className="font-condensed text-3xl font-bold tracking-wider uppercase">
              Prime<span className="text-[#00FF88]">Traff</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-inter font-semibold text-sm uppercase tracking-wider text-gray-300">
            <a href="#benefits" className="hover:text-[#00FF88] transition-colors">Преимущества</a>
            <a href="#offers" className="hover:text-[#00FF88] transition-colors">Офферы</a>
            <a href="#partners" className="hover:text-[#00FF88] transition-colors">Партнеры</a>
            <a href="#faq" className="hover:text-[#00FF88] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors">
              Вход
            </button>
            <button className="bg-[#00FF88] text-black px-6 py-2.5 font-bold uppercase tracking-wider transform -skew-x-12 hover:bg-white transition-colors hover-box-glow">
              <span className="inline-block transform skew-x-12">Уникализатор</span>
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0F] z-40 pt-24 px-6 md:hidden flex flex-col gap-6">
          <a href="#benefits" className="font-condensed text-3xl font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Преимущества</a>
          <a href="#offers" className="font-condensed text-3xl font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Офферы</a>
          <a href="#partners" className="font-condensed text-3xl font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Партнеры</a>
          <a href="#faq" className="font-condensed text-3xl font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="h-px bg-white/10 w-full my-4"></div>
          <button className="bg-[#00FF88] text-black py-4 font-bold uppercase tracking-wider text-xl text-center">
            Уникализатор
          </button>
          <button className="border border-white/20 py-4 font-bold uppercase tracking-wider text-xl text-center mt-2">
            Вход
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 clip-diagonal overflow-hidden flex items-center min-h-[90vh]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/hero-aggressive.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse"></span>
              <span className="font-inter text-[#00FF88] text-xs font-bold uppercase tracking-widest">Top CPA Network 2024</span>
            </div>
            
            <h1 className="font-condensed text-7xl md:text-9xl lg:text-[140px] font-black uppercase leading-[0.85] tracking-tighter mb-6">
              DOMINATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#0088FF] text-glow">
                IGAMING
              </span>
            </h1>
            
            <p className="font-inter text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed">
              Эксклюзивные офферы, приватные ставки и моментальные выплаты для топов арбитража. Лей туда, где платят больше.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-[#00FF88] text-black px-10 py-5 font-black text-lg uppercase tracking-wider transform -skew-x-12 hover:bg-white transition-all hover:scale-105 hover-box-glow group flex items-center justify-center gap-3">
                <span className="inline-block transform skew-x-12">Стать партнером</span>
                <ArrowRight className="w-5 h-5 transform skew-x-12 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white/20 px-10 py-5 font-black text-lg uppercase tracking-wider transform -skew-x-12 hover:border-[#0088FF] hover:text-[#0088FF] transition-all group flex items-center justify-center gap-3">
                <span className="inline-block transform skew-x-12">Смотреть офферы</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateY(-30deg) rotateX(10deg)' }}></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-24 z-20 container mx-auto px-6">
        <div className="bg-[#111116] border border-white/10 p-8 transform -skew-x-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88]/5 to-[#0088FF]/5"></div>
          
          <div className="relative text-center md:border-r border-white/10 last:border-0 transform skew-x-6 flex flex-col items-center">
            <TrendingUp className="w-8 h-8 text-[#00FF88] mb-4 opacity-50" />
            <div className="font-condensed text-5xl md:text-6xl font-black text-white text-glow mb-1">500+</div>
            <div className="font-inter text-sm font-bold uppercase tracking-widest text-gray-500">Прямых офферов</div>
          </div>
          
          <div className="relative text-center lg:border-r border-white/10 last:border-0 transform skew-x-6 flex flex-col items-center">
            <Globe className="w-8 h-8 text-[#00FF88] mb-4 opacity-50" />
            <div className="font-condensed text-5xl md:text-6xl font-black text-white text-glow mb-1">150+</div>
            <div className="font-inter text-sm font-bold uppercase tracking-widest text-gray-500">ГЕО по всему миру</div>
          </div>
          
          <div className="relative text-center md:border-r border-white/10 last:border-0 transform skew-x-6 flex flex-col items-center">
            <Zap className="w-8 h-8 text-[#00FF88] mb-4 opacity-50" />
            <div className="font-condensed text-5xl md:text-6xl font-black text-white text-glow mb-1">$50K+</div>
            <div className="font-inter text-sm font-bold uppercase tracking-widest text-gray-500">Выплат в месяц</div>
          </div>
          
          <div className="relative text-center transform skew-x-6 flex flex-col items-center">
            <Crown className="w-8 h-8 text-[#00FF88] mb-4 opacity-50" />
            <div className="font-condensed text-5xl md:text-6xl font-black text-white text-glow mb-1">1000+</div>
            <div className="font-inter text-sm font-bold uppercase tracking-widest text-gray-500">Активных вебов</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="benefits" className="py-32 relative diagonal-bg">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-condensed text-5xl md:text-7xl font-black uppercase mb-6">
              Почему <span className="text-[#00FF88]">PrimeTraff</span>?
            </h2>
            <p className="font-inter text-gray-400 text-lg md:text-xl">
              Мы создали экосистему, в которой арбитражники зарабатывают больше, а работают комфортнее. Никакого шейва — только профит.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Высокие ставки", desc: "Эксклюзивные условия со старта. Бампы ставок для проверенных партнеров." },
              { icon: Zap, title: "Быстрые выплаты", desc: "Платим день в день. Любые удобные методы: Crypto, Capitalist, Карты, Wire." },
              { icon: Headset, title: "Поддержка 24/7", desc: "Личный менеджер, который реально помогает с конвертом и связками." },
              { icon: Shield, title: "Без шейва", desc: "Прозрачная стата в реальном времени. Мы зарабатываем, когда зарабатываешь ты." }
            ].map((feat, i) => (
              <div key={i} className="bg-[#111116]/80 border border-white/5 p-8 hover-box-glow transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88]/10 rounded-full blur-3xl group-hover:bg-[#00FF88]/20 transition-all"></div>
                <feat.icon className="w-12 h-12 text-[#00FF88] mb-6 relative z-10 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h3 className="font-condensed text-2xl font-bold uppercase mb-4 relative z-10">{feat.title}</h3>
                <p className="font-inter text-gray-400 relative z-10 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Preview Highlight */}
      <section className="py-24 relative overflow-hidden bg-[#050508] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-condensed text-5xl md:text-7xl font-black uppercase mb-2">
                Топ <span className="text-[#00FF88]">Офферы</span>
              </h2>
              <p className="font-inter text-gray-400 text-lg uppercase tracking-wider font-bold">Свежие и конвертящие бренды</p>
            </div>
            <button className="text-[#00FF88] font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2 text-sm">
              Все офферы <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-[#1A1A24] relative overflow-hidden border border-white/5 group-hover:border-[#00FF88]/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img src="/__mockup/images/chips-aggressive.png" alt="Offer visual" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-[#00FF88] text-black text-xs font-bold px-2 py-1 uppercase rounded-sm">CPA</span>
                    <span className="bg-[#0088FF] text-white text-xs font-bold px-2 py-1 uppercase rounded-sm">Tier 1</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <h4 className="font-condensed text-3xl font-bold uppercase mb-1">Casino Brand {item}</h4>
                    <div className="flex gap-4">
                      <div className="text-[#00FF88] font-bold">Up to $250</div>
                      <div className="text-gray-400 font-bold">AU, DE, FI</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Trust */}
      <section id="partners" className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-inter text-sm font-bold uppercase tracking-widest text-gray-500 mb-12">Нам доверяют лидеры рынка</h2>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['VULKAN', 'PIN-UP', '1WIN', 'STAKE', 'N1', 'GG.BET'].map((partner, i) => (
              <div key={i} className="font-condensed text-4xl font-black uppercase text-white tracking-widest hover:text-[#00FF88] transition-colors cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative clip-diagonal-reverse bg-[#00FF88]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-black">
          <h2 className="font-condensed text-6xl md:text-8xl font-black uppercase mb-6 leading-none">
            ГОТОВ <br/>ЗАРАБАТЫВАТЬ?
          </h2>
          <p className="font-inter font-bold text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Регистрируйся сейчас и получи бамп ставки +10% на первый месяц работы.
          </p>
          <button className="bg-black text-[#00FF88] px-12 py-6 font-black text-2xl uppercase tracking-wider transform -skew-x-12 hover:bg-white hover:text-black transition-all hover:scale-105 shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
            <span className="inline-block transform skew-x-12">Создать аккаунт</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050508] pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="w-8 h-8 bg-[#00FF88] rounded flex items-center justify-center transform -skew-x-12">
                  <Zap className="w-5 h-5 text-black" fill="currentColor" />
                </div>
                <span className="font-condensed text-2xl font-bold tracking-wider uppercase">
                  Prime<span className="text-[#00FF88]">Traff</span>
                </span>
              </div>
              <p className="font-inter text-gray-500 text-sm max-w-sm">
                Премиальная iGaming партнерская сеть. Монетизируй свой трафик с максимальным профитом.
              </p>
            </div>

            <div className="flex gap-16 text-center md:text-left">
              <div>
                <h4 className="font-condensed font-bold text-xl uppercase mb-4">Навигация</h4>
                <div className="flex flex-col gap-2 font-inter text-gray-400 text-sm font-medium">
                  <a href="#" className="hover:text-[#00FF88] transition-colors">О нас</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">Офферы</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">Правила</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">Контакты</a>
                </div>
              </div>
              <div>
                <h4 className="font-condensed font-bold text-xl uppercase mb-4">Контакты</h4>
                <div className="flex flex-col gap-2 font-inter text-gray-400 text-sm font-medium">
                  <a href="#" className="hover:text-[#00FF88] transition-colors text-white">t.me/primetraff_support</a>
                  <a href="#" className="hover:text-[#00FF88] transition-colors">support@primetraff.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-inter text-gray-600 font-medium">
            <p>© 2024 PrimeTraff. All rights reserved.</p>
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
