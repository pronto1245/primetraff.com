import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  DollarSign,
  MessageCircle,
  Globe,
  CheckCircle,
  Star,
  Menu,
  X
} from "lucide-react";
import { SiTelegram } from "react-icons/si";

import primeTraffLogo from "@assets/generated_images/primetraff_blue_crystal_logo.png";

import partnerMobilbahis from "@assets/Без_названия_(1)_1768417603829.jpeg";
import partner1win from "@assets/Без_названия_(1)_1768417603829.png";
import partnerRooster from "@assets/Без_названия_(2)_1768417603829.jpeg";
import partnerMrBet from "@assets/Без_названия_(2)_1768417603830.png";
import partnerWinhero from "@assets/Без_названия_(3)_1768417603830.png";
import partnerCorgiBet from "@assets/Без_названия_(4)_1768417603835.png";
import partnerLeon from "@assets/Без_названия_1768417603835.jpeg";
import partnerBettilt from "@assets/img66fbf43306cac_1768417603836.png";
import partnerSportaza from "@assets/img689b36cf850ac_1768417603836.png";
import partnerVegasSlot from "@assets/img69380f65d567f_1768417603836.png";
import partnerBetcool from "@assets/img69400fda54fe8_1768417603836.png";
import partnerHuhuBet from "@assets/img694005f195a65_1768417603836.png";
import partner4rabet from "@assets/NPOpJLBugXCTJRBDe8jY2bWxoKEGmEpA4HtrjRVD_1768417603836.png";

import CrystalScene from "@/components/CrystalScene";

const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";
const LOGIN_URL = "https://primetrack.pro/login";
const TELEGRAM_URL = "https://t.me/primetrack_support_bot";
const TELEGRAM_CHANNEL_URL = "https://t.me/prime_traf";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function BlueBgDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[10%] left-[15%] w-[200px] md:w-[500px] h-[200px] md:h-[500px] rounded-full blur-[60px] md:blur-[150px]" style={{ background: "radial-gradient(circle, rgba(0,140,220,0.15) 0%, rgba(0,100,200,0.05) 50%, transparent 70%)" }} />
      <div className="absolute top-[40%] right-[5%] w-[180px] md:w-[450px] h-[180px] md:h-[450px] rounded-full blur-[60px] md:blur-[130px]" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.12) 0%, rgba(0,120,210,0.04) 50%, transparent 70%)" }} />
      <div className="hidden md:block absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(0,160,240,0.1) 0%, transparent 60%)" }} />
      <div className="hidden md:block absolute bottom-[5%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(60,180,255,0.08) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,16,48,0.4) 100%)" }} />
    </div>
  );
}

function GlowingDivider() {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
    </div>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-16 md:h-24"
        style={{ fill: "rgba(0,80,160,0.15)" }}
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
      </svg>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div 
      className={`
        relative bg-white/[0.06] backdrop-blur-sm md:backdrop-blur-xl border border-white/10 rounded-2xl
        ${hover ? "md:hover:border-sky-400/30 md:hover:bg-white/[0.09] md:hover:shadow-[0_0_30px_-5px_rgba(0,136,204,0.15)]" : ""}
        transition-all duration-300
        ${className}
      `}
    >
      <div className="hidden md:block absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#001a3a]/80 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <img src={primeTraffLogo} alt="PrimeTraff" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/70 hover:text-white transition-colors" data-testid="link-features">Возможности</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors" data-testid="link-how-it-works">Как это работает</a>
            <a href="#partners" className="text-white/70 hover:text-white transition-colors" data-testid="link-partners">Партнеры</a>
            <a href="#faq" className="text-white/70 hover:text-white transition-colors" data-testid="link-faq">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-[#0088CC]/50 bg-[#0088CC]/10 transition-colors text-sm font-medium px-3 py-1.5 rounded-full" data-testid="link-telegram-channel-nav">
              <SiTelegram className="w-4 h-4 text-[#0088CC]" />
              <span className="text-white">Наш канал</span>
            </a>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-login-nav">
              <Button variant="outline" className="border-white/25 text-white/80 font-medium px-5 rounded-full">
                Вход
              </Button>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-become-partner-nav">
              <Button variant="outline" className="border-white/30 text-white font-medium px-5 rounded-full">
                Стать партнером
              </Button>
            </a>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#001a3a]/95 backdrop-blur-xl border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-features">Возможности</a>
              <a href="#how-it-works" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-how-it-works">Как это работает</a>
              <a href="#partners" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-partners">Партнеры</a>
              <a href="#faq" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-faq">FAQ</a>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-login-mobile">
                <Button variant="outline" className="w-full border-white/25 text-white/80 font-medium rounded-full">
                  Вход
                </Button>
              </a>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-become-partner-mobile">
                <Button variant="outline" className="w-full border-white/30 text-white font-medium rounded-full">
                  Стать партнером
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function GlowingOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: "-5%" }}>
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]">
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.25) 0%, rgba(0,136,204,0.12) 30%, rgba(0,80,180,0.05) 55%, transparent 70%)" }} />
        <div className="absolute inset-[15%] rounded-full" style={{ background: "radial-gradient(circle, rgba(100,200,255,0.2) 0%, rgba(0,150,220,0.08) 40%, transparent 70%)" }} />
        <div className="absolute inset-[30%] rounded-full" style={{ background: "radial-gradient(circle, rgba(150,220,255,0.25) 0%, rgba(80,180,255,0.1) 40%, transparent 65%)" }} />
        <div className="absolute inset-[42%] rounded-full" style={{ background: "radial-gradient(circle, rgba(200,240,255,0.35) 0%, rgba(100,200,255,0.12) 50%, transparent 70%)" }} />
        <div className="absolute inset-0 rounded-full animate-[spin_30s_linear_infinite]" style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(0,180,255,0.06) 25%, transparent 50%, rgba(0,136,204,0.06) 75%, transparent 100%)" }} />
        <div className="hidden md:block absolute inset-[-5%] rounded-full border border-white/[0.03]" />
        <div className="hidden md:block absolute inset-[10%] rounded-full border border-white/[0.04]" />
        <div className="hidden md:block absolute inset-[25%] rounded-full border border-white/[0.05]" />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001030 0%, #002060 30%, #0055AA 60%, #0088CC 100%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,200,255,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,100,200,0.2),_transparent_60%)]" />
      <GlowingOrb />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4 text-sky-300" />
          <span>Мгновенное одобрение</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Превращай трафик в прибыль
          <br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #60CFFF, #00AAEE, #0088CC)" }}>без потолка заработка</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Присоединяйтесь к PrimeTraff — партнерской программе нового поколения. 
          Высокие ставки, моментальные выплаты, персональная поддержка 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-register">
            <Button variant="outline" className="border-white/30 text-white font-medium px-8 h-auto py-3 rounded-full backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/5">
              Начать зарабатывать
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-telegram">
            <Button variant="outline" className="border-white/15 text-white/80 px-8 h-auto py-3 rounded-full backdrop-blur-sm">
              <SiTelegram className="w-4 h-4 mr-2 text-[#0088CC]" />
              Написать в Telegram
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: 500, suffix: "+", label: "Активных партнеров", id: "partners", gradient: "from-violet-400 to-purple-400" },
            { value: 2, prefix: "$", suffix: "M+", label: "Выплачено партнерам", id: "payouts", gradient: "from-amber-400 to-orange-400" },
            { value: 24, suffix: "/7", label: "Поддержка онлайн", id: "support", gradient: "from-sky-300 to-cyan-400" },
            { value: 100, suffix: "%", label: "Честные выплаты", id: "honest", gradient: "from-emerald-400 to-green-400" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 lg:p-6" hover={false}>
              <div className="text-center" data-testid={`stat-${stat.id}`}>
                <div className={`text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-1`} data-testid={`text-stat-value-${stat.id}`}>
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}

function HolographicIcon({ icon: Icon, color, glowColor }: { icon: any; color: string; glowColor: string }) {
  return (
    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-5 lg:mb-6">
      <div className="absolute inset-0 rounded-full opacity-30 blur-xl animate-[pulse_4s_ease-in-out_infinite]" style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }} />
      <div className="absolute inset-1 rounded-full border border-white/10" style={{ background: `radial-gradient(circle at 30% 30%, ${color}30, transparent 60%)` }} />
      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 0deg, transparent, ${color}15, transparent, ${color}10, transparent)`, animation: "spin 8s linear infinite" }} />
      <Icon className="w-7 h-7 lg:w-8 lg:h-8 relative z-10" style={{ color, filter: `drop-shadow(0 0 8px ${glowColor})` }} />
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Без шейва",
      description: "Мы много лет работаем в gambling вертикали и знаем все боли рынка. Гарантируем, что шейва через нашу партнерскую сеть не будет.",
      color: "#34d399",
      glowColor: "rgba(52,211,153,0.4)",
    },
    {
      icon: Globe,
      title: "Большой выбор офферов",
      description: "Все офферы, с которыми мы работаем, уже были пролиты нашей командой. Мы знаем что рекомендовать нашим партнерам.",
      color: "#38bdf8",
      glowColor: "rgba(56,189,248,0.4)",
    },
    {
      icon: Users,
      title: "Помощь в заливах",
      description: "Мы тестируем связки и делимся ими с партнерами. Всё — от креатива до необходимых инструментов. Вам остается взять ссылку из ЛК.",
      color: "#a78bfa",
      glowColor: "rgba(167,139,250,0.4)",
    },
    {
      icon: DollarSign,
      title: "Быстрые выплаты",
      description: "Стараемся максимально быстро выплачивать вознаграждение. Если у рекла нет претензий к трафику — средства будут на кошельке в кратчайший срок.",
      color: "#fbbf24",
      glowColor: "rgba(251,191,36,0.4)",
    },
    {
      icon: MessageCircle,
      title: "Приватный канал со связками",
      description: "Для проверенных партнеров есть закрытый канал с продуктом, креативами, таргетом, плейсментами — всё для профитной настройки пролива.",
      color: "#f472b6",
      glowColor: "rgba(244,114,182,0.4)",
    },
    {
      icon: BarChart3,
      title: "Полная аналитика",
      description: "Личный кабинет с детальной статистикой по всем показателям. Видишь каждый клик и депозит по своим subID в реальном времени.",
      color: "#22d3ee",
      glowColor: "rgba(34,211,238,0.4)",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #002060 0%, #001845 50%, #002060 100%)" }} />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/8 rounded-full blur-[200px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Почему выбирают PrimeTraff
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Созданы арбитражниками для арбитражников. Знаем, что вам нужно.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.08} className="text-center">
              <div className="flex flex-col items-center" data-testid={`card-feature-${i}`}>
                <HolographicIcon icon={feature.icon} color={feature.color} glowColor={feature.glowColor} />
                <h3 className="text-base lg:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-[260px]">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Регистрация",
      description: "Заполните форму за 2 минуты. Мгновенное одобрение для опытных арбитражников.",
      icon: Users,
      color: "#a78bfa",
      glowColor: "rgba(167,139,250,0.4)",
      badgeGradient: "from-violet-500 to-violet-600",
    },
    {
      step: "02",
      title: "Получите офферы",
      description: "Выберите офферы и получите уникальные трекинговые ссылки.",
      icon: Globe,
      color: "#38bdf8",
      glowColor: "rgba(56,189,248,0.4)",
      badgeGradient: "from-sky-500 to-sky-600",
    },
    {
      step: "03",
      title: "Лейте трафик",
      description: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.",
      icon: BarChart3,
      color: "#22d3ee",
      glowColor: "rgba(34,211,238,0.4)",
      badgeGradient: "from-cyan-500 to-cyan-600",
    },
    {
      step: "04",
      title: "Получайте выплаты",
      description: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.",
      icon: DollarSign,
      color: "#fbbf24",
      glowColor: "rgba(251,191,36,0.4)",
      badgeGradient: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #001535 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Как начать зарабатывать
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Простой старт за 5 минут. Никакой бюрократии.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <HolographicIcon icon={step.icon} color={step.color} glowColor={step.glowColor} />
                    <div className={`absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${step.badgeGradient} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-12">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-how-it-works-cta">
            <Button variant="outline" className="border-white/25 text-white font-medium px-8 h-auto py-3 rounded-full backdrop-blur-sm">
              Начать сейчас
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Алексей К.",
      role: "Media Buyer",
      avatar: "А",
      text: "Перешёл с другой партнёрки 3 месяца назад. Ставки реально выше, выплаты как часы. Менеджер всегда на связи, помогает с оптимизацией.",
      rating: 5,
    },
    {
      name: "Дмитрий В.",
      role: "Арбитражник",
      avatar: "Д",
      text: "Работаю с PrimeTraff уже полгода. Лучшая аналитика из всех партнёрок, что видел. Постбеки летят мгновенно, статистика точная.",
      rating: 5,
    },
    {
      name: "Мария С.",
      role: "Team Lead",
      avatar: "М",
      text: "Наша команда из 5 человек полностью перешла на PrimeTraff. Удобно работать, все данные в одном месте. Поддержка отвечает за минуты.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #002060 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-0 left-1/2 w-80 h-80 bg-sky-500/6 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Что говорят партнеры
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Реальные отзывы от реальных арбитражников
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="relative bg-white/[0.04] border border-white/8 rounded-xl p-6 lg:p-8 h-full transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 text-sm font-medium border border-white/15" style={{ background: "rgba(0,136,204,0.15)" }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-white/50">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed" data-testid={`card-testimonial-${i}`}>{testimonial.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    { img: partner1win, name: "1win" },
    { img: partnerMobilbahis, name: "Mobilbahis" },
    { img: partnerRooster, name: "Rooster.bet" },
    { img: partnerMrBet, name: "Mr Bet" },
    { img: partnerWinhero, name: "Winhero" },
    { img: partnerCorgiBet, name: "CorgiBet" },
    { img: partnerLeon, name: "Leon" },
    { img: partnerBettilt, name: "Bettilt" },
    { img: partnerSportaza, name: "Sportaza" },
    { img: partnerVegasSlot, name: "Vegas Slot" },
    { img: partnerBetcool, name: "Betcool" },
    { img: partnerHuhuBet, name: "HuhuBet" },
    { img: partner4rabet, name: "4rabet" },
  ];

  return (
    <section id="partners" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #002060 0%, #001845 50%, #002060 100%)" }} />
      <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-sky-500/6 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Наши партнеры
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Работаем с лучшими брендами индустрии
          </p>
        </AnimatedSection>

        <div className="overflow-hidden">
          <div 
            className="flex gap-6"
            style={{
              animation: "scroll 30s linear infinite",
            }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-48 md:w-56 lg:w-64 group"
                data-testid={`card-partner-${i}`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 md:hover:border-sky-400/30">
                  <img 
                    src={partner.img} 
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001030]/60 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Предоставляете ли вы готовую воронку для пролива?",
      answer: "Да, в нее входит: готовое PWA-приложение с настроенными PUSH-уведомлениями + конвертящие креативы + инструкция по запуску",
    },
    {
      question: "Возможно ли получить индивидуальные условия по выплатам?",
      answer: "Да, активным веб-мастерам мы идем навстречу и готовы предоставлять индивидуальные условия для дополнительного удобства",
    },
    {
      question: "У меня нет трекера, что делать?",
      answer: "Мы предоставим вам полностью бесплатный трекер с интуитивным интерфейсом, где вы сможете настроить все необходимые параметры, отслеживать конверсии в реальном времени и оптимизировать свои кампании для максимальной эффективности",
    },
    {
      question: "В каких случаях трафик не соответствует минимальным требованиям компании?",
      answer: "Трафик не соответствует минимальным требованиям компании в случае:\n1. Относится к запрещенным видам трафика\n2. Не соответствует заявленному источнику\n3. Количество повторных депозитов не менее 50% от количества первых\n4. Процент дубликатов свыше 10% от всех привлеченных игроков",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #001535 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-600/6 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Частые вопросы
          </h2>
          <p className="text-white/70 text-lg">
            Не нашли ответ? Напишите нам в Telegram
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={`rounded-xl border transition-all duration-300 ${openIndex === i ? "bg-white/[0.05] border-white/12" : "bg-white/[0.03] border-white/8 hover:border-white/12"}`}>
                <button
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="text-sm lg:text-[15px] font-medium text-white/90 pr-4">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${openIndex === i ? "bg-white/10 rotate-180" : ""}`}>
                    <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
                    <div className="w-10 h-px bg-white/10 mb-4" />
                    <p className="text-sm text-white/60 whitespace-pre-line leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001030 0%, #003080 50%, #0055AA 100%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,136,204,0.2),_transparent_60%)]" />
      <div className="hidden md:block absolute top-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]" />
      <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Готовы начать зарабатывать?
          </h2>
          <p className="text-lg lg:text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            Присоединяйтесь к PrimeTraff сегодня и получите доступ к лучшим офферам рынка
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-register">
              <Button variant="outline" className="border-white/30 text-white font-medium px-10 h-auto py-3 rounded-full backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/5">
                Стать партнером
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
              <Button variant="outline" className="border-white/15 text-white/80 px-10 h-auto py-3 rounded-full backdrop-blur-sm">
                <SiTelegram className="w-4 h-4 mr-2 text-[#0088CC]" />
                Telegram поддержка
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>Без холдов</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-violet-400" />
              <span>Быстрое одобрение</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Поддержка 24/7</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/10" style={{ background: "#001030" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={primeTraffLogo} alt="PrimeTraff" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-6">
            <a 
              href={TELEGRAM_CHANNEL_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-[#0088CC]/10 border border-[#0088CC]/30 transition-colors px-4 py-2 rounded-full font-medium"
              data-testid="link-footer-telegram-channel"
            >
              <SiTelegram className="w-5 h-5 text-[#0088CC]" />
              <span className="text-white">Наш канал</span>
            </a>
            <a 
              href={TELEGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-[#0088CC] transition-colors"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5" />
              <span>Поддержка</span>
            </a>
            <a 
              href="mailto:support@primetraff.com" 
              className="text-white/60 hover:text-sky-400 transition-colors"
              data-testid="link-footer-email"
            >
              support@primetraff.com
            </a>
          </div>

          <div className="text-white/50 text-sm">
            © 2026 PrimeTraff. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-white/10 p-4 z-40 md:hidden" style={{ background: "rgba(0,16,48,0.9)" }}>
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block" data-testid="button-sticky-cta">
        <Button variant="outline" className="w-full border-white/30 text-white font-medium rounded-full">
          Стать партнером
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

function SpecialOfferPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const showTimer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('offerDismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 20000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const endTime = localStorage.getItem('offerEndTime');
    let targetTime: number;
    
    if (endTime) {
      targetTime = parseInt(endTime);
    } else {
      targetTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('offerEndTime', targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('offerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative border border-sky-400/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
        style={{ background: "linear-gradient(135deg, #001545, #002060, #001545)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          data-testid="button-close-popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <Zap className="w-10 h-10 text-sky-400 mx-auto mb-3" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Специальное предложение
          </h3>
          <p className="text-white/70">Успейте воспользоваться</p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-sky-400">{timeLeft.days}</div>
            <div className="text-xs text-white/60 mt-1">дней</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-sky-400">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-white/60 mt-1">часов</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-sky-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs text-white/60 mt-1">минут</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-sky-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs text-white/60 mt-1">секунд</div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-lg md:text-xl font-semibold text-white">
            Бонус <span className="text-amber-400">200$</span> к первой выплате для новых партнеров
          </p>
        </div>

        <a 
          href={REGISTER_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
          data-testid="button-popup-cta"
        >
          <Button variant="outline" className="w-full border-white/30 text-white font-medium py-4 text-lg rounded-full">
            Стать партнером
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.2 }}
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 text-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-sky-400/30 transition-colors"
      style={{ background: "rgba(0,136,204,0.7)" }}
      data-testid="button-scroll-to-top"
      aria-label="Наверх"
    >
      <ChevronDown className="w-6 h-6 rotate-180" />
    </motion.button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen relative" style={{ background: "#001030" }}>
      <BlueBgDecorations />
      <Suspense fallback={null}>
        <CrystalScene />
      </Suspense>
      <Navigation />
      <HeroSection />
      <GlowingDivider />
      <WaveDivider />
      <FeaturesSection />
      <GlowingDivider />
      <WaveDivider flip />
      <HowItWorksSection />
      <GlowingDivider />
      <WaveDivider />
      <PartnersSection />
      <GlowingDivider />
      <TestimonialsSection />
      <FAQSection />
      <GlowingDivider />
      <WaveDivider flip />
      <CTASection />
      <Footer />
      <StickyCTA />
      <SpecialOfferPopup />
      <ScrollToTop />
    </div>
  );
}
