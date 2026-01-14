import { useState, useEffect, useRef } from "react";
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
  TrendingUp,
  CheckCircle,
  Star,
  Menu,
  X,
  Sparkles,
  Wallet,
  HeadphonesIcon
} from "lucide-react";
import { SiTelegram } from "react-icons/si";

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

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">PrimeTraff</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium" data-testid="link-features">Возможности</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium" data-testid="link-how-it-works">Как это работает</a>
            <a href="#partners" className="text-gray-300 hover:text-white transition-colors font-medium" data-testid="link-partners">Партнеры</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors font-medium" data-testid="link-faq">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all" data-testid="link-telegram-nav">
              <SiTelegram className="w-5 h-5" />
            </a>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-login-nav">
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 font-semibold px-5 h-10">
                Вход
              </Button>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-become-partner-nav">
              <Button className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-bold px-6 h-10 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all border-0">
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
          <div className="md:hidden bg-gray-900/98 backdrop-blur-xl border-t border-gray-800 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-gray-300 py-2 font-medium" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-features">Возможности</a>
              <a href="#how-it-works" className="text-gray-300 py-2 font-medium" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-how-it-works">Как это работает</a>
              <a href="#partners" className="text-gray-300 py-2 font-medium" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-partners">Партнеры</a>
              <a href="#faq" className="text-gray-300 py-2 font-medium" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-faq">FAQ</a>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-login-mobile">
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800 font-semibold">
                  Вход
                </Button>
              </a>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-become-partner-mobile">
                <Button className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 text-white font-bold border-0">
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
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-gray-950 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-sm font-semibold mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Топовая партнёрка для арбитражников</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-6"
        >
          <span className="text-white">Зарабатывай </span>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">больше</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">с каждого лида</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Gambling партнёрка с <span className="text-white font-semibold">топовыми ставками</span>, 
          быстрыми выплатами и личным менеджером для каждого
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-register">
            <Button className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-bold px-10 py-7 text-xl h-auto shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all border-0 rounded-xl">
              <Zap className="w-6 h-6 mr-2" />
              Начать зарабатывать
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-telegram">
            <Button variant="outline" className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-8 py-7 text-xl h-auto rounded-xl font-semibold">
              <SiTelegram className="w-6 h-6 mr-2" />
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
            { value: "500+", label: "Активных партнеров", icon: Users, color: "from-violet-500 to-fuchsia-500" },
            { value: "$2M+", label: "Выплачено", icon: Wallet, color: "from-amber-500 to-orange-500" },
            { value: "24/7", label: "Поддержка", icon: HeadphonesIcon, color: "from-cyan-500 to-blue-500" },
            { value: "100%", label: "Честные выплаты", icon: Shield, color: "from-emerald-500 to-teal-500" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="relative group p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all"
              data-testid={`stat-${stat.label}`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <stat.icon className={`w-8 h-8 mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ stroke: 'url(#gradient)' }} />
              <div className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`} data-testid={`text-stat-value-${i}`}>{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-violet-400" />
        </motion.div>
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
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      icon: Globe,
      title: "Большой выбор офферов",
      description: "Все офферы, с которыми мы работаем, уже были пролиты нашей командой. Мы знаем что рекомендовать нашим партнерам.",
      gradient: "from-violet-500 to-fuchsia-500",
      bgGradient: "from-violet-500/10 to-fuchsia-500/10",
    },
    {
      icon: Users,
      title: "Помощь в заливах",
      description: "Мы тестируем связки и делимся ими с партнерами. Всё — от креатива до необходимых инструментов. Вам остается взять ссылку из ЛК.",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      icon: DollarSign,
      title: "Быстрые выплаты",
      description: "Стараемся максимально быстро выплачивать вознаграждение. Если у рекла нет претензий к трафику — средства будут на кошельке в кратчайший срок.",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/10",
    },
    {
      icon: MessageCircle,
      title: "Приватный канал со связками",
      description: "Для проверенных партнеров есть закрытый канал с продуктом, креативами, таргетом, плейсментами — всё для профитной настройки пролива.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: BarChart3,
      title: "Полная аналитика",
      description: "Личный кабинет с детальной статистикой по всем показателям. Видишь каждый клик и депозит по своим subID в реальном времени.",
      gradient: "from-indigo-500 to-violet-500",
      bgGradient: "from-indigo-500/10 to-violet-500/10",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/30 via-gray-950 to-gray-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Почему выбирают <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">PrimeTraff</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Созданы арбитражниками для арбитражников
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div 
                className="group relative p-8 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full overflow-hidden"
                data-testid={`card-feature-${i}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                </div>
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
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      step: "02",
      title: "Получите офферы",
      description: "Выберите офферы и получите уникальные трекинговые ссылки.",
      icon: Globe,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      step: "03",
      title: "Лейте трафик",
      description: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.",
      icon: BarChart3,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      step: "04",
      title: "Получайте выплаты",
      description: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-950/20 via-gray-950 to-gray-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Как <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">начать</span> зарабатывать
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Простой старт за 5 минут. Никакой бюрократии.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-32 left-[12%] right-[12%] h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 rounded-full opacity-30" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gray-900 border-4 border-gray-950 flex items-center justify-center text-white text-lg font-black">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-16">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-how-it-works-cta">
            <Button className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-bold px-10 py-7 text-xl h-auto shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all border-0 rounded-xl">
              Начать сейчас
              <ArrowRight className="w-6 h-6 ml-2" />
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
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Дмитрий В.",
      role: "Арбитражник",
      avatar: "Д",
      text: "Работаю с PrimeTraff уже полгода. Лучшая аналитика из всех партнёрок, что видел. Постбеки летят мгновенно, статистика точная.",
      rating: 5,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      name: "Мария С.",
      role: "Team Lead",
      avatar: "М",
      text: "Наша команда из 5 человек полностью перешла на PrimeTraff. Удобно работать, все данные в одном месте. Поддержка отвечает за минуты.",
      rating: 5,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-950/30 via-gray-950 to-gray-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Что говорят <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">партнеры</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Реальные отзывы от реальных арбитражников
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-lg" data-testid={`card-testimonial-${i}`}>{testimonial.text}</p>
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
    <section id="partners" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-950/20 via-gray-950 to-gray-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Наши <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">партнеры</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
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
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900/60 border border-gray-800 group-hover:border-violet-500/50 transition-all duration-300">
                  <img 
                    src={partner.img} 
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
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
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/20 via-gray-950 to-gray-950" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Частые <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">вопросы</span>
          </h2>
          <p className="text-gray-400 text-xl">
            Не нашли ответ? Напишите нам в Telegram
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 text-violet-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 whitespace-pre-line leading-relaxed text-lg">{faq.answer}</p>
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
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-fuchsia-900/20 to-gray-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Готовы <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">начать</span>?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Присоединяйтесь к PrimeTraff и получите доступ к лучшим офферам рынка
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-register">
              <Button className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-bold px-12 py-7 text-xl h-auto shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all border-0 rounded-xl">
                <Zap className="w-6 h-6 mr-2" />
                Стать партнером
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
              <Button variant="outline" className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-10 py-7 text-xl h-auto rounded-xl font-semibold">
                <SiTelegram className="w-6 h-6 mr-2" />
                Telegram поддержка
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            {[
              { icon: CheckCircle, text: "Без холдов", color: "text-emerald-400" },
              { icon: CheckCircle, text: "Быстрое одобрение", color: "text-violet-400" },
              { icon: CheckCircle, text: "Поддержка 24/7", color: "text-cyan-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-lg font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={TELEGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-medium"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5" />
              <span>Telegram</span>
            </a>
            <a 
              href="mailto:support@primetraff.com" 
              className="text-gray-400 hover:text-violet-400 transition-colors font-medium"
              data-testid="link-footer-email"
            >
              support@primetraff.com
            </a>
          </div>

          <div className="text-gray-500">
            © 2026 PrimeTraff. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-gray-800 p-4 z-40 md:hidden">
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block" data-testid="button-sticky-cta">
        <Button className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 text-white font-bold py-4 shadow-xl shadow-violet-500/30 border-0 rounded-xl text-lg">
          <Zap className="w-5 h-5 mr-2" />
          Стать партнером
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <StickyCTA />
    </div>
  );
}
