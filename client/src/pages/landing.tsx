import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Clock, 
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

import partnerImg1 from "@assets/stock_images/casino_gambling_slot_c5847f21.jpg";
import partnerImg2 from "@assets/stock_images/casino_gambling_slot_399e0348.jpg";
import partnerImg3 from "@assets/stock_images/casino_gambling_slot_aaabdd7b.jpg";
import partnerImg4 from "@assets/stock_images/casino_gambling_slot_d4ada583.jpg";
import partnerImg5 from "@assets/stock_images/casino_gambling_slot_c0654f56.jpg";
import partnerImg6 from "@assets/stock_images/casino_gambling_slot_d2eee45a.jpg";
import partnerImg7 from "@assets/stock_images/casino_gambling_slot_7c71aa52.jpg";
import partnerImg8 from "@assets/stock_images/casino_gambling_slot_60c73ee8.jpg";
import partnerImg9 from "@assets/stock_images/casino_gambling_slot_488e6e1a.jpg";
import partnerImg10 from "@assets/stock_images/casino_gambling_slot_297d1a29.jpg";

const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";
const TELEGRAM_URL = "https://t.me/primetrack_support_bot";

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
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
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-become-partner-nav">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6">
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>Мгновенное одобрение для опытных арбитражников</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Зарабатывайте на трафике
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">до $500+ в день</span>
        </h1>

        <p className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Присоединяйтесь к PrimeTraff — партнерской программе нового поколения. 
          Высокие ставки, моментальные выплаты, персональная поддержка 24/7.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-register">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-6 text-lg h-auto">
              Начать зарабатывать
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-telegram">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg h-auto">
              <SiTelegram className="w-5 h-5 mr-2" />
              Написать в Telegram
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {[
            { value: "500+", label: "Активных партнеров", id: "partners" },
            { value: "$2M+", label: "Выплачено партнерам", id: "payouts" },
            { value: "24ч", label: "Максимум на выплату", id: "payout-time" },
            { value: "99.9%", label: "Uptime платформы", id: "uptime" },
          ].map((stat, i) => (
            <div key={i} className="text-center" data-testid={`stat-${stat.id}`}>
              <div className="text-2xl lg:text-4xl font-bold text-emerald-400 mb-1" data-testid={`text-stat-value-${stat.id}`}>{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
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
      icon: DollarSign,
      title: "Высокие ставки",
      description: "До $150 за депозит. Конкурентные RevShare условия до 50%.",
    },
    {
      icon: Zap,
      title: "Мгновенные выплаты",
      description: "Выплаты в течение 24 часов. USDT, Bitcoin, карты — на выбор.",
    },
    {
      icon: BarChart3,
      title: "Детальная аналитика",
      description: "Отслеживайте конверсии в реальном времени. Полная статистика по subID.",
    },
    {
      icon: Shield,
      title: "Антифрод защита",
      description: "Прозрачные условия. Детализированный учёт всех конверсий.",
    },
    {
      icon: Users,
      title: "Персональный менеджер",
      description: "Поддержка 24/7 в Telegram. Помощь с оптимизацией связок.",
    },
    {
      icon: Globe,
      title: "Все гео и вертикали",
      description: "Gambling, betting, dating, crypto — любые офферы.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Почему выбирают PrimeTraff
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Созданы арбитражниками для арбитражников. Знаем, что вам нужно.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <Card 
              key={i} 
              className="bg-slate-800/50 border-slate-700/50 p-6 lg:p-8 hover:border-emerald-500/30 transition-all duration-300 group"
              data-testid={`card-feature-${i}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all">
                <feature.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </Card>
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
    },
    {
      step: "02",
      title: "Получите офферы",
      description: "Выберите офферы и получите уникальные трекинговые ссылки.",
    },
    {
      step: "03",
      title: "Лейте трафик",
      description: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.",
    },
    {
      step: "04",
      title: "Получайте выплаты",
      description: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Как начать зарабатывать
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Простой старт за 5 минут. Никакой бюрократии.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-bold text-emerald-500/10 mb-4">{step.step}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-1/2 border-t border-dashed border-slate-700" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-how-it-works-cta">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-6 text-lg h-auto">
              Начать сейчас
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
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
    <section id="testimonials" className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Что говорят партнеры
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Реальные отзывы от реальных арбитражников
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <Card 
              key={i} 
              className="bg-slate-800/50 border-slate-700/50 p-6 lg:p-8"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
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
              <p className="text-slate-300">{testimonial.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    { img: partnerImg1, name: "Casino Partner 1" },
    { img: partnerImg2, name: "Casino Partner 2" },
    { img: partnerImg3, name: "Casino Partner 3" },
    { img: partnerImg4, name: "Casino Partner 4" },
    { img: partnerImg5, name: "Casino Partner 5" },
    { img: partnerImg6, name: "Casino Partner 6" },
    { img: partnerImg7, name: "Casino Partner 7" },
    { img: partnerImg8, name: "Casino Partner 8" },
    { img: partnerImg9, name: "Casino Partner 9" },
    { img: partnerImg10, name: "Casino Partner 10" },
  ];

  return (
    <section id="partners" className="py-20 lg:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Наши партнеры
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Работаем с лучшими брендами индустрии
          </p>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex animate-scroll gap-6"
            style={{
              animation: "scroll 30s linear infinite",
            }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-48 md:w-56 lg:w-64"
                data-testid={`card-partner-${i}`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300">
                  <img 
                    src={partner.img} 
                    alt={partner.name}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
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
    <section id="faq" className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Частые вопросы
          </h2>
          <p className="text-slate-400 text-lg">
            Не нашли ответ? Напишите нам в Telegram
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/30"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-testid={`button-faq-${i}`}
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 whitespace-pre-line">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          Готовы начать зарабатывать?
        </h2>
        <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Присоединяйтесь к PrimeTraff сегодня и получите доступ к лучшим офферам рынка
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-register">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-10 py-6 text-lg h-auto">
              Стать партнером
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-10 py-6 text-lg h-auto">
              <SiTelegram className="w-5 h-5 mr-2" />
              Telegram поддержка
            </Button>
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-slate-500">
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
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
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
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 z-40 md:hidden">
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block" data-testid="button-sticky-cta">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3">
          Стать партнером
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
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
