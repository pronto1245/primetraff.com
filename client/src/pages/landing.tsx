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

function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-1/3 right-20 w-px h-48 bg-gradient-to-b from-transparent via-emerald-400/15 to-transparent" />
      <div className="absolute top-2/3 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-1/4 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
      <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-emerald-500/20" />
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400/20" />
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 rounded-full bg-emerald-400/30" />
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`
      relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl
      ${hover ? "hover:border-emerald-500/40 hover:bg-slate-800/60 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]" : ""}
      transition-all duration-300
      ${className}
    `}>
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors" data-testid="link-features">Возможности</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors" data-testid="link-how-it-works">Как это работает</a>
            <a href="#partners" className="text-slate-300 hover:text-white transition-colors" data-testid="link-partners">Партнеры</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors" data-testid="link-faq">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors" data-testid="link-telegram-nav">
              <SiTelegram className="w-5 h-5" />
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4" />
          <span>Мгновенное одобрение для опытных арбитражников</span>
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
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800/80 px-8 py-6 text-lg h-auto backdrop-blur-sm">
              <SiTelegram className="w-5 h-5 mr-2" />
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
            { value: "500+", label: "Активных партнеров", id: "partners" },
            { value: "$2M+", label: "Выплачено партнерам", id: "payouts" },
            { value: "24/7", label: "Поддержка онлайн", id: "support" },
            { value: "100%", label: "Честные выплаты", id: "honest" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 lg:p-6" hover={false}>
              <div className="text-center" data-testid={`stat-${stat.id}`}>
                <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-1" data-testid={`text-stat-value-${stat.id}`}>{stat.value}</div>
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
    },
    {
      icon: Globe,
      title: "Большой выбор офферов",
      description: "Все офферы, с которыми мы работаем, уже были пролиты нашей командой. Мы знаем что рекомендовать нашим партнерам.",
    },
    {
      icon: Users,
      title: "Помощь в заливах",
      description: "Мы тестируем связки и делимся ими с партнерами. Всё — от креатива до необходимых инструментов. Вам остается взять ссылку из ЛК.",
    },
    {
      icon: DollarSign,
      title: "Быстрые выплаты",
      description: "Стараемся максимально быстро выплачивать вознаграждение. Если у рекла нет претензий к трафику — средства будут на кошельке в кратчайший срок.",
    },
    {
      icon: MessageCircle,
      title: "Приватный канал со связками",
      description: "Для проверенных партнеров есть закрытый канал с продуктом, креативами, таргетом, плейсментами — всё для профитной настройки пролива.",
    },
    {
      icon: BarChart3,
      title: "Полная аналитика",
      description: "Личный кабинет с детальной статистикой по всем показателям. Видишь каждый клик и депозит по своим subID в реальном времени.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
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
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-5 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all border border-emerald-500/10"
                  data-testid={`card-feature-${i}`}
                >
                  <feature.icon className="w-7 h-7 text-emerald-400" />
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
    },
    {
      step: "02",
      title: "Получите офферы",
      description: "Выберите офферы и получите уникальные трекинговые ссылки.",
      icon: Globe,
    },
    {
      step: "03",
      title: "Лейте трафик",
      description: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.",
      icon: BarChart3,
    },
    {
      step: "04",
      title: "Получайте выплаты",
      description: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.",
      icon: DollarSign,
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/20 backdrop-blur-sm">
                      <step.icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-emerald-500/30">
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
    <section id="partners" className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden">
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
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
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
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-10 py-6 text-lg h-auto shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all">
                Стать партнером
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800/80 px-10 py-6 text-lg h-auto backdrop-blur-sm">
                <SiTelegram className="w-5 h-5 mr-2" />
                Telegram поддержка
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Без холдов</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Быстрое одобрение</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PrimeTraff</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={TELEGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5" />
              <span>Telegram</span>
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FloatingShapes />
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
