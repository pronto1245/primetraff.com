import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  TrendingUp,
  CheckCircle,
  Star,
  Menu,
  X
} from "lucide-react";
import { SiTelegram } from "react-icons/si";

import primeTraffLogo from "@assets/generated_images/primetraff_affiliate_platform_logo.png";

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

function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[150px]" />
      <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.4)_100%)]" />
      
      {/* Glowing accent lines */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute top-1/3 right-20 w-px h-48 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent" />
      <div className="absolute top-2/3 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute bottom-1/4 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
      <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-emerald-500/30" />
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 rounded-full bg-emerald-400/40" />
    </div>
  );
}

function GlowingDivider() {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </div>
  );
}

function WaveDivider({ flip = false, color = "slate-900" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className={`w-full h-16 md:h-24 fill-${color}`}
        style={{ fill: color === "slate-900" ? "#0f172a" : color === "slate-950" ? "#020617" : "#1e293b" }}
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
      </svg>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true, tilt = true }: { children: React.ReactNode; className?: string; hover?: boolean; tilt?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={`
        relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl
        ${hover ? "hover:border-emerald-500/40 hover:bg-slate-800/60 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]" : ""}
        transition-all duration-300
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <img src={primeTraffLogo} alt="PrimeTraff" className="w-8 h-8 rounded-lg shadow-lg shadow-emerald-500/20" />
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors" data-testid="link-features">Возможности</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors" data-testid="link-how-it-works">Как это работает</a>
            <a href="#partners" className="text-slate-300 hover:text-white transition-colors" data-testid="link-partners">Партнеры</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors" data-testid="link-faq">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors text-sm font-medium px-3 py-1.5 rounded-full" data-testid="link-telegram-channel-nav">
              <SiTelegram className="w-4 h-4 text-[#0088CC]" />
              <span className="text-white">Наш канал</span>
            </a>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-login-nav">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 font-semibold px-6">
                Вход
              </Button>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-become-partner-nav">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all">
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
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-features">Возможности</a>
              <a href="#how-it-works" className="text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-how-it-works">Как это работает</a>
              <a href="#partners" className="text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-partners">Партнеры</a>
              <a href="#faq" className="text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-faq">FAQ</a>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-login-mobile">
                <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-semibold">
                  Вход
                </Button>
              </a>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-become-partner-mobile">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold">
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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/15 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-400/8 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-emerald-600/10 rounded-full blur-[60px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-white text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4" />
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400">без потолка заработка</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
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
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-6 text-lg h-auto shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all">
              Начать зарабатывать
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-telegram">
            <Button variant="outline" className="border-[#0088CC] text-white hover:bg-[#0088CC]/20 px-8 py-6 text-lg h-auto backdrop-blur-sm">
              <SiTelegram className="w-5 h-5 mr-2 text-[#0088CC]" />
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
            { value: "500+", label: "Активных партнеров", id: "partners", gradient: "from-violet-400 to-purple-400" },
            { value: "$2M+", label: "Выплачено партнерам", id: "payouts", gradient: "from-amber-400 to-orange-400" },
            { value: "24/7", label: "Поддержка онлайн", id: "support", gradient: "from-blue-400 to-cyan-400" },
            { value: "100%", label: "Честные выплаты", id: "honest", gradient: "from-emerald-400 to-green-400" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 lg:p-6" hover={false} tilt={false}>
              <div className="text-center" data-testid={`stat-${stat.id}`}>
                <div className={`text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-1`} data-testid={`text-stat-value-${stat.id}`}>{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-slate-500" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Без шейва",
      description: "Мы много лет работаем в gambling вертикали и знаем все боли рынка. Гарантируем, что шейва через нашу партнерскую сеть не будет.",
      iconColor: "text-emerald-400",
      bgGradient: "from-emerald-500/20 to-emerald-600/20",
      bgGradientHover: "group-hover:from-emerald-500/30 group-hover:to-emerald-600/30",
      borderColor: "border-emerald-500/10",
    },
    {
      icon: Globe,
      title: "Большой выбор офферов",
      description: "Все офферы, с которыми мы работаем, уже были пролиты нашей командой. Мы знаем что рекомендовать нашим партнерам.",
      iconColor: "text-blue-400",
      bgGradient: "from-blue-500/20 to-blue-600/20",
      bgGradientHover: "group-hover:from-blue-500/30 group-hover:to-blue-600/30",
      borderColor: "border-blue-500/10",
    },
    {
      icon: Users,
      title: "Помощь в заливах",
      description: "Мы тестируем связки и делимся ими с партнерами. Всё — от креатива до необходимых инструментов. Вам остается взять ссылку из ЛК.",
      iconColor: "text-violet-400",
      bgGradient: "from-violet-500/20 to-violet-600/20",
      bgGradientHover: "group-hover:from-violet-500/30 group-hover:to-violet-600/30",
      borderColor: "border-violet-500/10",
    },
    {
      icon: DollarSign,
      title: "Быстрые выплаты",
      description: "Стараемся максимально быстро выплачивать вознаграждение. Если у рекла нет претензий к трафику — средства будут на кошельке в кратчайший срок.",
      iconColor: "text-amber-400",
      bgGradient: "from-amber-500/20 to-amber-600/20",
      bgGradientHover: "group-hover:from-amber-500/30 group-hover:to-amber-600/30",
      borderColor: "border-amber-500/10",
    },
    {
      icon: MessageCircle,
      title: "Приватный канал со связками",
      description: "Для проверенных партнеров есть закрытый канал с продуктом, креативами, таргетом, плейсментами — всё для профитной настройки пролива.",
      iconColor: "text-pink-400",
      bgGradient: "from-pink-500/20 to-pink-600/20",
      bgGradientHover: "group-hover:from-pink-500/30 group-hover:to-pink-600/30",
      borderColor: "border-pink-500/10",
    },
    {
      icon: BarChart3,
      title: "Полная аналитика",
      description: "Личный кабинет с детальной статистикой по всем показателям. Видишь каждый клик и депозит по своим subID в реальном времени.",
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-cyan-600/20",
      bgGradientHover: "group-hover:from-cyan-500/30 group-hover:to-cyan-600/30",
      borderColor: "border-cyan-500/10",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden bg-slate-900/30">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/6 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Почему выбирают PrimeTraff
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Созданы арбитражниками для арбитражников. Знаем, что вам нужно.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <GlassCard 
                className="p-6 lg:p-8 h-full group"
              >
                <div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-5 ${feature.bgGradientHover} transition-all ${feature.borderColor}`}
                  data-testid={`card-feature-${i}`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </GlassCard>
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
      iconColor: "text-violet-400",
      bgGradient: "from-violet-500/20 to-violet-600/20",
      borderColor: "border-violet-500/20",
      badgeGradient: "from-violet-500 to-violet-600",
      shadowColor: "shadow-violet-500/30",
    },
    {
      step: "02",
      title: "Получите офферы",
      description: "Выберите офферы и получите уникальные трекинговые ссылки.",
      icon: Globe,
      iconColor: "text-blue-400",
      bgGradient: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/20",
      badgeGradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      step: "03",
      title: "Лейте трафик",
      description: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.",
      icon: BarChart3,
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-cyan-600/20",
      borderColor: "border-cyan-500/20",
      badgeGradient: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      step: "04",
      title: "Получайте выплаты",
      description: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.",
      icon: DollarSign,
      iconColor: "text-amber-400",
      bgGradient: "from-amber-500/20 to-amber-600/20",
      borderColor: "border-amber-500/20",
      badgeGradient: "from-amber-500 to-amber-600",
      shadowColor: "shadow-amber-500/30",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/8 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Как начать зарабатывать
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Простой старт за 5 минут. Никакой бюрократии.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgGradient} flex items-center justify-center ${step.borderColor} backdrop-blur-sm`}>
                      <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.badgeGradient} flex items-center justify-center text-white text-sm font-bold shadow-lg ${step.shadowColor}`}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-12">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-how-it-works-cta">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-6 text-lg h-auto shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all">
              Начать сейчас
              <ArrowRight className="w-5 h-5 ml-2" />
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-800/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 w-80 h-80 bg-emerald-500/6 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Что говорят партнеры
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Реальные отзывы от реальных арбитражников
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <GlassCard className="p-6 lg:p-8 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-emerald-500/20">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed" data-testid={`card-testimonial-${i}`}>{testimonial.text}</p>
              </GlassCard>
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
    <section id="partners" className="py-20 lg:py-32 bg-slate-900/30 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/6 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Наши партнеры
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800/30 border border-slate-700/30 hover:border-emerald-500/30 transition-all duration-300">
                  <img 
                    src={partner.img} 
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity" />
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
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden bg-slate-900/30">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/6 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Частые вопросы
          </h2>
          <p className="text-slate-400 text-lg">
            Не нашли ответ? Напишите нам в Telegram
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <GlassCard className="overflow-hidden" hover={false}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-6 pb-6">
                    <p className="text-slate-400 whitespace-pre-line leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </GlassCard>
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600/15 via-emerald-900/5 to-transparent" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Готовы начать зарабатывать?
          </h2>
          <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Присоединяйтесь к PrimeTraff сегодня и получите доступ к лучшим офферам рынка
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-register">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-10 py-6 text-lg h-auto animate-pulse-glow transition-all">
                Стать партнером
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
              <Button variant="outline" className="border-[#0088CC] text-white hover:bg-[#0088CC]/20 px-10 py-6 text-lg h-auto backdrop-blur-sm">
                <SiTelegram className="w-5 h-5 mr-2 text-[#0088CC]" />
                Telegram поддержка
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>Без холдов</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-violet-400" />
              <span>Быстрое одобрение</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
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
    <footer className="py-12 bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={primeTraffLogo} alt="PrimeTraff" className="w-8 h-8 rounded-lg shadow-lg shadow-emerald-500/20" />
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={TELEGRAM_CHANNEL_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors px-4 py-2 rounded-full font-medium"
              data-testid="link-footer-telegram-channel"
            >
              <SiTelegram className="w-5 h-5 text-[#0088CC]" />
              <span className="text-white">Наш канал</span>
            </a>
            <a 
              href={TELEGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-[#0088CC] hover:text-[#0099DD] transition-colors"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5" />
              <span>Поддержка</span>
            </a>
            <a 
              href="mailto:support@primetraff.com" 
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              data-testid="link-footer-email"
            >
              support@primetraff.com
            </a>
          </div>

          <div className="text-slate-500 text-sm">
            © 2026 PrimeTraff. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/50 p-4 z-40 md:hidden">
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block" data-testid="button-sticky-cta">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 shadow-lg shadow-emerald-500/20">
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

  // Show popup after 20 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('offerDismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 20000);

    return () => clearTimeout(showTimer);
  }, []);

  // Countdown timer - starts from 1 day
  useEffect(() => {
    const endTime = localStorage.getItem('offerEndTime');
    let targetTime: number;
    
    if (endTime) {
      targetTime = parseInt(endTime);
    } else {
      targetTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day from now
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
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl shadow-emerald-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          data-testid="button-close-popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with alarm emoji */}
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">⏰</span>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Специальное предложение заканчивается через:
          </h3>
        </div>

        {/* Countdown timer */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
          <div className="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">{timeLeft.days}</div>
            <div className="text-xs text-slate-400 mt-1">дней</div>
          </div>
          <div className="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-slate-400 mt-1">часов</div>
          </div>
          <div className="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs text-slate-400 mt-1">минут</div>
          </div>
          <div className="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs text-slate-400 mt-1">секунд</div>
          </div>
        </div>

        {/* Bonus text */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-lg md:text-xl font-semibold text-white">
            Бонус <span className="text-amber-400">200$</span> к первой выплате для новых партнеров
          </p>
        </div>

        {/* CTA Button */}
        <a 
          href={REGISTER_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
          data-testid="button-popup-cta"
        >
          <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 text-lg animate-pulse-glow">
            Стать партнером
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FloatingShapes />
      <Navigation />
      <HeroSection />
      <GlowingDivider />
      <WaveDivider color="slate-900" />
      <FeaturesSection />
      <GlowingDivider />
      <WaveDivider color="slate-950" flip />
      <HowItWorksSection />
      <GlowingDivider />
      <WaveDivider color="slate-900" />
      <PartnersSection />
      <GlowingDivider />
      <TestimonialsSection />
      <FAQSection />
      <GlowingDivider />
      <WaveDivider color="slate-800" flip />
      <CTASection />
      <Footer />
      <StickyCTA />
      <SpecialOfferPopup />
    </div>
  );
}
