import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Menu, ArrowRight, Play, DollarSign, Zap, Shield, Clock, Users, ChartBar, MessageCircle, ChevronDown } from "lucide-react";

const registrationSchema = z.object({
  email: z.string().email("Введите корректный email"),
  telegram: z.string().min(2, "Введите Telegram username"),
  volume: z.string().min(1, "Выберите объем трафика"),
  trafficSources: z.array(z.string()).min(1, "Выберите хотя бы один источник"),
  paymentMethod: z.string().default("usdt"),
  agreed: z.boolean().refine((val) => val === true, "Необходимо согласие"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

function Navigation({ onOpenModal }: { onOpenModal: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-secondary-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <svg className="w-10 h-10 text-success-500" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="currentColor"/>
              <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-primary-800">TrafficArb Hub</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#benefits" className="text-secondary-600 hover:text-primary-700 transition-all duration-250" data-testid="link-benefits">Преимущества</a>
            <a href="#how-it-works" className="text-secondary-600 hover:text-primary-700 transition-all duration-250" data-testid="link-how-it-works">Как работает</a>
            <a href="#testimonials" className="text-secondary-600 hover:text-primary-700 transition-all duration-250" data-testid="link-testimonials">Отзывы</a>
            <a href="#faq" className="text-secondary-600 hover:text-primary-700 transition-all duration-250" data-testid="link-faq">FAQ</a>
            <Button onClick={onOpenModal} className="bg-success-500 hover:bg-success-600" data-testid="button-become-partner-nav">
              Стать партнером
            </Button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-secondary-200">
          <div className="px-4 py-2 space-y-2">
            <a href="#benefits" className="block py-2 text-secondary-600">Преимущества</a>
            <a href="#how-it-works" className="block py-2 text-secondary-600">Как работает</a>
            <a href="#testimonials" className="block py-2 text-secondary-600">Отзывы</a>
            <a href="#faq" className="block py-2 text-secondary-600">FAQ</a>
            <Button onClick={onOpenModal} className="w-full mt-2 bg-success-500 hover:bg-success-600">
              Стать партнером
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-success-50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 to-success-900/10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" 
          alt="Traffic Analytics Background" 
          className="w-full h-full object-cover opacity-10" 
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-900 mb-6 animate-slide-up">
            Зарабатывайте ежедневно<br />
            <span className="bg-gradient-to-r from-success-500 to-success-600 bg-clip-text text-transparent">с трафик-арбитражем</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Гарантированные выплаты без шейва с аналитикой в реальном времени. 
            Присоединяйтесь к 10,000+ успешных партнеров уже сегодня.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap">
            <Button 
              onClick={onOpenModal} 
              size="lg"
              className="bg-success-500 hover:bg-success-600 text-lg px-8 py-6 shadow-cta hover:shadow-xl transform hover:-translate-y-1 transition-all duration-250"
              data-testid="button-register-hero"
            >
              Зарегистрироваться как партнер
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-accent-400 hover:bg-accent-500 text-white border-accent-400 text-lg px-8 py-6 shadow-cta hover:shadow-xl transform hover:-translate-y-1 transition-all duration-250"
              data-testid="button-watch-demo"
            >
              Смотреть демо
              <Play className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-secondary-200 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-success-500 mb-2" data-testid="text-partner-count">10,000+</div>
                <div className="text-secondary-600">Активных партнеров</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2" data-testid="text-monthly-payouts">$2M+</div>
                <div className="text-secondary-600">Месячные выплаты</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2" data-testid="text-active-offers">500+</div>
                <div className="text-secondary-600">Активных офферов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Устали от задержек выплат?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Большинство арбитражников теряют до 30% прибыли из-за задержек платежей и плохой аналитики
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-error-50 border-2 border-error-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-error-700 mb-4">Обычные сети</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Выплаты раз в месяц или реже",
                "Неточная аналитика и отчеты",
                "Ограниченный выбор офферов",
                "Медленная поддержка"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-error-500 mt-1 flex-shrink-0" />
                  <span className="text-error-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-success-50 border-2 border-success-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-success-700 mb-4">TrafficArb Hub</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Гарантированные выплаты без задержек",
                "Аналитика в реальном времени",
                "500+ эксклюзивных офферов",
                "Поддержка 24/7 в Telegram"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success-500 mt-1 flex-shrink-0" />
                  <span className="text-success-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Интерактивная панель управления
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Полный контроль над вашими кампаниями с продвинутой аналитикой и инструментами оптимизации
          </p>
        </div>

        <div className="bg-secondary-50 rounded-2xl p-8 shadow-xl">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">Панель партнера</h3>
                <p className="text-secondary-600">Добро пожаловать, Алексей Петров</p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-success-100 text-success-700 px-4 py-2 rounded-lg font-semibold">
                  Баланс: $12,450
                </div>
                <Button className="bg-success-500 hover:bg-success-600">Вывести средства</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-success-500 to-success-600 text-white p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">$1,250</div>
                <div className="text-success-100">Сегодня</div>
              </div>
              <div className="bg-gradient-to-r from-accent-400 to-accent-500 text-white p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">$8,900</div>
                <div className="text-accent-100">Эта неделя</div>
              </div>
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">45,230</div>
                <div className="text-primary-100">Клики</div>
              </div>
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">12.5%</div>
                <div className="text-secondary-100">Конверсия</div>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-primary-900 mb-4">Доходы за последние 30 дней</h4>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#38a169", stopOpacity: 0.3}}/>
                      <stop offset="100%" style={{stopColor: "#38a169", stopOpacity: 0}}/>
                    </linearGradient>
                  </defs>
                  <polyline fill="none" stroke="#38a169" strokeWidth="3" points="50,150 100,120 150,100 200,80 250,90 300,70 350,60 400,50 450,40 500,45 550,35 600,30 650,25 700,20 750,15"/>
                  <polyline fill="url(#gradient)" stroke="none" points="50,150 100,120 150,100 200,80 250,90 300,70 350,60 400,50 450,40 500,45 550,35 600,30 650,25 700,20 750,15 750,180 50,180"/>
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-primary-900 mb-4">Активные кампании</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-primary-900">Финансовые услуги</div>
                      <div className="text-sm text-secondary-600">CPA: $45 | CR: 8.2%</div>
                    </div>
                    <div className="text-success-600 font-semibold">$890</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-primary-900">Криптовалюты</div>
                      <div className="text-sm text-secondary-600">CPA: $35 | CR: 12.1%</div>
                    </div>
                    <div className="text-success-600 font-semibold">$1,240</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary-900 mb-4">Последние выплаты</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-primary-900">04.09.2025</div>
                      <div className="text-sm text-secondary-600">USDT TRC-20</div>
                    </div>
                    <div className="text-success-600 font-semibold">$1,250</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-primary-900">03.09.2025</div>
                      <div className="text-sm text-secondary-600">USDT TRC-20</div>
                    </div>
                    <div className="text-success-600 font-semibold">$980</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Высокие комиссии",
      description: "До 80% от прибыли рекламодателя с прозрачной системой расчетов и бонусами за объем",
      color: "success",
      details: ["0-10k$ в месяц: 60%", "10-50k$ в месяц: 70%", "50k$+ в месяц: 80%"]
    },
    {
      icon: Zap,
      title: "Мгновенные выплаты",
      description: "Ежедневные выплаты без минимальных порогов. Получайте заработанное каждый день",
      color: "accent",
      details: ["Минимальная сумма: $50", "Без комиссии на вывод", "USDT, BTC, ETH"]
    },
    {
      icon: ChartBar,
      title: "Продвинутая аналитика",
      description: "Real-time статистика с детальной разбивкой по гео, устройствам и источникам",
      color: "primary",
      details: ["Статистика в реальном времени", "Детальные отчеты", "API интеграция"]
    },
    {
      icon: Shield,
      title: "Антифрод защита",
      description: "Интеллектуальная система защиты от фрода без шейва честного трафика",
      color: "success",
      details: ["ML-алгоритмы", "Честная модерация", "Апелляции 24 часа"]
    },
    {
      icon: Users,
      title: "Персональный менеджер",
      description: "Выделенный менеджер для каждого партнера с объемом от $5,000/месяц",
      color: "accent",
      details: ["Приоритетная поддержка", "Индивидуальные условия", "Эксклюзивные офферы"]
    },
    {
      icon: Clock,
      title: "24/7 Поддержка",
      description: "Круглосуточная поддержка в Telegram с ответом до 15 минут",
      color: "primary",
      details: ["Telegram-бот", "Живые операторы", "База знаний"]
    },
  ];

  const colorClasses: Record<string, { bg: string; bgHover: string; text: string }> = {
    success: { bg: "bg-success-100", bgHover: "group-hover:bg-success-500", text: "text-success-500 group-hover:text-white" },
    accent: { bg: "bg-accent-100", bgHover: "group-hover:bg-accent-400", text: "text-accent-400 group-hover:text-white" },
    primary: { bg: "bg-primary-100", bgHover: "group-hover:bg-primary-500", text: "text-primary-500 group-hover:text-white" },
  };

  return (
    <section id="benefits" className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Шесть ключевых преимуществ, которые делают нас лидером в индустрии трафик-арбитража
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const colors = colorClasses[benefit.color];
            const Icon = benefit.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-250 hover:-translate-y-2 cursor-pointer" data-testid={`card-benefit-${index}`}>
                <div className={`w-16 h-16 ${colors.bg} ${colors.bgHover} rounded-2xl flex items-center justify-center mb-6 transition-all duration-250`}>
                  <Icon className={`w-8 h-8 ${colors.text} transition-all duration-250`} />
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">{benefit.title}</h3>
                <p className="text-secondary-600 mb-6">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: 1, title: "Регистрация", description: "Заполните форму за 2 минуты и получите мгновенный доступ к панели партнера" },
    { step: 2, title: "Выбор офферов", description: "Выберите из 500+ проверенных офферов в популярных вертикалях" },
    { step: 3, title: "Запуск трафика", description: "Получите уникальные ссылки и начните привлекать трафик любым способом" },
    { step: 4, title: "Получение выплат", description: "Отслеживайте конверсии в реальном времени и получайте ежедневные выплаты" },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Как это работает
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Простой процесс из 4 шагов для начала заработка с TrafficArb Hub
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center" data-testid={`step-${item.step}`}>
              <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{item.title}</h3>
              <p className="text-secondary-600">{item.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-secondary-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Дмитрий К.",
      role: "Арбитражник, 3 года опыта",
      avatar: "DK",
      rating: 5,
      text: "Перешел сюда из другой сети и не жалею. Выплаты каждый день, поддержка отвечает за минуты. За месяц заработал на 40% больше.",
      earnings: "$15,000/месяц"
    },
    {
      name: "Анна М.",
      role: "Solo-арбитражник",
      avatar: "AM",
      rating: 5,
      text: "Лучшая партнерка для финансовых офферов. Высокие ставки, честная статистика. Рекомендую всем!",
      earnings: "$8,500/месяц"
    },
    {
      name: "Михаил С.",
      role: "Команда из 5 человек",
      avatar: "MC",
      rating: 5,
      text: "Работаем командой, и TrafficArb Hub идеально подходит. Персональный менеджер, эксклюзивные условия, быстрые выплаты.",
      earnings: "$45,000/месяц"
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Что говорят партнеры
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Реальные отзывы от наших партнеров со всего мира
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-card" data-testid={`testimonial-${index}`}>
              <div className="flex items-center mb-6 gap-4">
                <div className="w-14 h-14 bg-success-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-primary-900">{testimonial.name}</div>
                  <div className="text-sm text-secondary-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 mb-6">"{testimonial.text}"</p>
              <div className="bg-success-50 rounded-lg p-3 text-center">
                <div className="text-success-700 font-bold">{testimonial.earnings}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Как быстро я получу доступ после регистрации?",
      answer: "Доступ к панели партнера предоставляется мгновенно после подтверждения email. Вы сможете сразу начать выбирать офферы и генерировать ссылки."
    },
    {
      question: "Какие способы выплат доступны?",
      answer: "Мы поддерживаем USDT (TRC-20, ERC-20), Bitcoin, Ethereum, банковские переводы и электронные кошельки. Минимальная сумма для вывода - $50 для стандартных партнеров и $25 для VIP."
    },
    {
      question: "Есть ли минимальные требования к трафику?",
      answer: "Нет строгих минимальных требований. Мы работаем как с начинающими арбитражниками, так и с крупными командами. Главное - качество трафика."
    },
    {
      question: "Как часто обновляются офферы?",
      answer: "Новые офферы добавляются ежедневно. Вы получаете уведомления о новых предложениях в вашей вертикали через Telegram-бот."
    },
    {
      question: "Какие вертикали доступны?",
      answer: "Мы работаем с финансами, криптовалютами, гемблингом, беттингом, дейтингом, нутрой и e-commerce. Более 500 активных офферов."
    },
    {
      question: "Как настроить постбэки и интеграции?",
      answer: "Настройка постбэков происходит автоматически через панель партнера. Мы поддерживаем интеграции с Voluum, RedTrack, BeMob, ThriveTracker и другими трекерами."
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-secondary-600">
            Ответы на популярные вопросы о работе с TrafficArb Hub
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-card border border-secondary-200" data-testid={`faq-item-${index}`}>
              <button
                className="w-full text-left p-6 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`button-faq-${index}`}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-semibold text-primary-900">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-secondary-400 transition-transform duration-250 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-secondary-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
      <div className="text-sm font-semibold mb-2">Специальное предложение заканчивается через:</div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-xs text-success-100">дней</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-xs text-success-100">часов</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-xs text-success-100">минут</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-xs text-success-100">секунд</div>
        </div>
      </div>
      <div className="text-xs text-success-100 mt-2">
        Бонус $100 к первой выплате для новых партнеров
      </div>
    </div>
  );
}

function FinalCTASection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-r from-success-500 to-success-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Готовы увеличить доходы в 3 раза?
        </h2>
        <p className="text-xl text-success-100 mb-8 max-w-2xl mx-auto">
          Присоединяйтесь к 10,000+ успешных партнеров уже сегодня. 
          Ограниченное количество мест для новых партнеров!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 flex-wrap">
          <Button 
            onClick={onOpenModal}
            size="lg"
            className="bg-white text-success-600 hover:bg-success-50 font-bold py-4 px-8 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-250"
            data-testid="button-cta-register"
          >
            Стать партнером сейчас
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            asChild
            size="lg"
            className="bg-success-700 hover:bg-success-800 font-bold py-4 px-8 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-250"
          >
            <a href="https://t.me/traffichub_support" target="_blank" rel="noopener noreferrer" data-testid="link-telegram-cta">
              Связаться в Telegram
              <MessageCircle className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
        
        <CountdownTimer />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6 gap-3">
              <svg className="w-10 h-10 text-success-500" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="currentColor"/>
                <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold">TrafficArb Hub</span>
            </div>
            <p className="text-primary-200 mb-6">
              Ведущая платформа трафик-арбитража с ежедневными выплатами и профессиональной поддержкой.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Быстрые ссылки</h3>
            <ul className="space-y-3">
              <li><a href="#benefits" className="text-primary-200 hover:text-white transition-all duration-250">Преимущества</a></li>
              <li><a href="#how-it-works" className="text-primary-200 hover:text-white transition-all duration-250">Как работает</a></li>
              <li><a href="#testimonials" className="text-primary-200 hover:text-white transition-all duration-250">Отзывы</a></li>
              <li><a href="#faq" className="text-primary-200 hover:text-white transition-all duration-250">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Поддержка</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://t.me/traffichub_support" className="text-primary-200 hover:text-white transition-all duration-250 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:support@traffichub.com" className="text-primary-200 hover:text-white transition-all duration-250">
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Правовая информация</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-200 hover:text-white transition-all duration-250">Условия использования</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition-all duration-250">Политика конфиденциальности</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition-all duration-250">Соглашение партнера</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-200">
              © 2025 TrafficArb Hub. Все права защищены.
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center text-primary-200 gap-2">
                <Shield className="w-4 h-4 text-success-500" />
                <span className="text-sm">SSL защищено</span>
              </div>
              <div className="flex items-center text-primary-200 gap-2">
                <Check className="w-4 h-4 text-success-500" />
                <span className="text-sm">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      telegram: "",
      volume: "",
      trafficSources: [],
      paymentMethod: "usdt",
      agreed: false,
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время через Telegram.",
    });
    form.reset();
    onClose();
  };

  const trafficSources = [
    { id: "facebook", label: "Facebook" },
    { id: "google", label: "Google" },
    { id: "tiktok", label: "TikTok" },
    { id: "native", label: "Native" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-success-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-primary-900">Стать партнером</DialogTitle>
            <DialogDescription className="text-secondary-600 mt-2">Мгновенное одобрение для опытных арбитражников</DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram *</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} data-testid="input-telegram" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Месячный объем трафика *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-volume">
                        <SelectValue placeholder="Выберите объем" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1k-10k">1K - 10K посетителей</SelectItem>
                      <SelectItem value="10k-50k">10K - 50K посетителей</SelectItem>
                      <SelectItem value="50k-100k">50K - 100K посетителей</SelectItem>
                      <SelectItem value="100k+">100K+ посетителей</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trafficSources"
              render={() => (
                <FormItem>
                  <FormLabel>Основные источники трафика *</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {trafficSources.map((source) => (
                      <FormField
                        key={source.id}
                        control={form.control}
                        name="trafficSources"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(source.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, source.id]);
                                  } else {
                                    field.onChange(value.filter((v) => v !== source.id));
                                  }
                                }}
                                data-testid={`checkbox-${source.id}`}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {source.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Предпочитаемый способ выплат</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-payment">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="usdt">USDT TRC-20</SelectItem>
                      <SelectItem value="bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreed"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-agree"
                    />
                  </FormControl>
                  <FormLabel className="text-xs text-secondary-600 font-normal leading-relaxed">
                    Я согласен с условиями использования и политикой конфиденциальности
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-success-500 hover:bg-success-600"
              data-testid="button-submit-registration"
            >
              Зарегистрироваться
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
              <div className="bg-success-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-success-700">Мгновенное одобрение!</div>
                <div className="text-xs text-success-600">Получите доступ к панели партнера сразу после регистрации</div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function StickyCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-success-500 p-4 z-40 md:hidden">
      <Button 
        onClick={onOpenModal}
        className="w-full bg-white text-success-600 hover:bg-success-50 font-bold py-3 px-6 shadow-lg"
        data-testid="button-sticky-cta"
      >
        Стать партнером
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation onOpenModal={() => setModalOpen(true)} />
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <ProblemSection />
      <DashboardPreview />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <StickyCTA onOpenModal={() => setModalOpen(true)} />
      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
