export type Lang = "ru" | "en";

export const translations = {
  nav: {
    features: { ru: "Возможности", en: "Features" },
    howItWorks: { ru: "Как это работает", en: "How It Works" },
    partners: { ru: "Партнеры", en: "Partners" },
    faq: { ru: "FAQ", en: "FAQ" },
    ourChannel: { ru: "Наш канал", en: "Our Channel" },
    login: { ru: "Вход", en: "Login" },
    becomePartner: { ru: "Стать партнером", en: "Become a Partner" },
  },
  hero: {
    subtitle: { ru: "Партнерская программа нового поколения.\nВысокие ставки, моментальные выплаты, поддержка 24/7.", en: "Next-generation affiliate program.\nHigh rates, instant payouts, 24/7 support." },
    loginBtn: { ru: "Вход", en: "Login" },
    registerBtn: { ru: "Регистрация", en: "Register" },
    badges: {
      geo: { ru: "70+ ГЕО", en: "70+ GEOs" },
      partners: { ru: "500+ Партнеров", en: "500+ Partners" },
      payouts: { ru: "Мгновенные выплаты", en: "Instant Payouts" },
    },
    stats: {
      partners: { ru: "Активных партнеров", en: "Active Partners" },
      payouts: { ru: "Выплачено партнерам", en: "Paid to Partners" },
      support: { ru: "Поддержка онлайн", en: "Online Support" },
      honest: { ru: "Честные выплаты", en: "Fair Payouts" },
    },
  },
  features: {
    title: { ru: "Почему выбирают PrimeTraff", en: "Why Choose PrimeTraff" },
    subtitle: { ru: "Созданы арбитражниками для арбитражников. Знаем, что вам нужно.", en: "Built by affiliates for affiliates. We know what you need." },
    items: [
      {
        title: { ru: "Без шейва", en: "No Shaving" },
        description: { ru: "Мы много лет работаем в gambling вертикали и знаем все боли рынка. Гарантируем, что шейва через нашу партнерскую сеть не будет. Честность — наш главный принцип.", en: "We have years of experience in the gambling vertical and understand all market pain points. We guarantee no shaving through our affiliate network. Honesty is our core principle." },
      },
      {
        title: { ru: "Большой выбор офферов", en: "Wide Offer Selection" },
        description: { ru: "Все офферы, с которыми мы работаем, уже были пролиты нашей командой. Мы знаем что рекомендовать нашим партнерам для максимального профита.", en: "All offers we work with have been tested by our team. We know what to recommend to our partners for maximum profit." },
      },
      {
        title: { ru: "Помощь в заливах", en: "Campaign Assistance" },
        description: { ru: "Мы тестируем связки и делимся ими с партнерами. Всё — от креатива до необходимых инструментов. Вам остается взять ссылку из ЛК и начать лить.", en: "We test funnels and share them with partners. Everything from creatives to necessary tools. Just grab the link from your dashboard and start driving traffic." },
      },
      {
        title: { ru: "Быстрые выплаты", en: "Fast Payouts" },
        description: { ru: "Стараемся максимально быстро выплачивать вознаграждение. Если у рекла нет претензий к трафику — средства будут на кошельке в кратчайший срок.", en: "We strive to pay rewards as quickly as possible. If the advertiser has no complaints about the traffic, funds will be in your wallet in the shortest time." },
      },
      {
        title: { ru: "Приватный канал со связками", en: "Private Funnel Channel" },
        description: { ru: "Для проверенных партнеров есть закрытый канал с продуктом, креативами, таргетом, плейсментами — всё для профитной настройки пролива.", en: "For verified partners, there is a private channel with product info, creatives, targeting, placements — everything for profitable campaign setup." },
      },
      {
        title: { ru: "Полная аналитика", en: "Full Analytics" },
        description: { ru: "Личный кабинет с детальной статистикой по всем показателям. Видишь каждый клик и депозит по своим subID в реальном времени.", en: "Personal dashboard with detailed statistics on all metrics. See every click and deposit by your subIDs in real time." },
      },
    ],
  },
  howItWorks: {
    title: { ru: "Как начать зарабатывать", en: "How to Start Earning" },
    subtitle: { ru: "Простой старт за 5 минут. Никакой бюрократии.", en: "Simple start in 5 minutes. No bureaucracy." },
    steps: [
      {
        title: { ru: "Регистрация", en: "Registration" },
        description: { ru: "Заполните форму за 2 минуты. Мгновенное одобрение для опытных арбитражников.", en: "Fill out the form in 2 minutes. Instant approval for experienced affiliates." },
      },
      {
        title: { ru: "Получите офферы", en: "Get Offers" },
        description: { ru: "Выберите офферы и получите уникальные трекинговые ссылки.", en: "Choose offers and get unique tracking links." },
      },
      {
        title: { ru: "Лейте трафик", en: "Drive Traffic" },
        description: { ru: "Запускайте рекламные кампании и отслеживайте результаты в реальном времени.", en: "Launch ad campaigns and track results in real time." },
      },
      {
        title: { ru: "Получайте выплаты", en: "Get Paid" },
        description: { ru: "Выводите заработок ежедневно. Без холдов для проверенных партнеров.", en: "Withdraw earnings daily. No holds for verified partners." },
      },
    ],
    cta: { ru: "Начать сейчас", en: "Start Now" },
  },
  testimonials: {
    title: { ru: "Что говорят партнеры", en: "What Partners Say" },
    subtitle: { ru: "Реальные отзывы от реальных арбитражников", en: "Real reviews from real affiliates" },
    items: [
      { name: { ru: "Алексей К.", en: "Alex K." }, role: { ru: "Media Buyer", en: "Media Buyer" }, avatar: { ru: "А", en: "A" }, text: { ru: "Перешёл с другой партнёрки 3 месяца назад. Ставки реально выше, выплаты как часы. Менеджер всегда на связи, помогает с оптимизацией.", en: "Switched from another network 3 months ago. Rates are really higher, payouts run like clockwork. Manager is always available, helps with optimization." } },
      { name: { ru: "Дмитрий В.", en: "Dmitry V." }, role: { ru: "Арбитражник", en: "Affiliate" }, avatar: { ru: "Д", en: "D" }, text: { ru: "Работаю с PrimeTraff уже полгода. Лучшая аналитика из всех партнёрок, что видел. Постбеки летят мгновенно, статистика точная.", en: "Working with PrimeTraff for 6 months now. Best analytics I've seen across all networks. Postbacks are instant, stats are accurate." } },
      { name: { ru: "Мария С.", en: "Maria S." }, role: { ru: "Team Lead", en: "Team Lead" }, avatar: { ru: "М", en: "M" }, text: { ru: "Наша команда из 5 человек полностью перешла на PrimeTraff. Удобно работать, все данные в одном месте. Поддержка отвечает за минуты.", en: "Our team of 5 fully switched to PrimeTraff. Convenient to work with, all data in one place. Support responds in minutes." } },
      { name: { ru: "Игорь Л.", en: "Igor L." }, role: { ru: "Solo Арбитражник", en: "Solo Affiliate" }, avatar: { ru: "И", en: "I" }, text: { ru: "Лью на Tier-1 гео уже год через PrimeTraff. CR выше на 15-20% по сравнению с конкурентами. Эксклюзивные офферы реально конвертят.", en: "Driving traffic to Tier-1 GEOs for a year through PrimeTraff. CR is 15-20% higher compared to competitors. Exclusive offers really convert." } },
      { name: { ru: "Екатерина Р.", en: "Ekaterina R." }, role: { ru: "Affiliate Manager", en: "Affiliate Manager" }, avatar: { ru: "Е", en: "E" }, text: { ru: "Как менеджер партнёрской программы, ценю прозрачность PrimeTraff. Детальная статистика, честные выплаты, никаких шейвов. Рекомендую всем.", en: "As an affiliate program manager, I value PrimeTraff's transparency. Detailed stats, fair payouts, no shaving. Recommend to everyone." } },
      { name: { ru: "Сергей Н.", en: "Sergey N." }, role: { ru: "Media Buyer", en: "Media Buyer" }, avatar: { ru: "С", en: "S" }, text: { ru: "Начал с тестовых объёмов, сейчас лью по 500+ лидов в день. Масштабировался без проблем, техподдержка помогла с настройкой трекера.", en: "Started with test volumes, now driving 500+ leads per day. Scaled without issues, tech support helped with tracker setup." } },
      { name: { ru: "Олег Т.", en: "Oleg T." }, role: { ru: "Team Lead", en: "Team Lead" }, avatar: { ru: "О", en: "O" }, text: { ru: "Работаем командой из 8 человек. PrimeTraff дал персонального менеджера, индивидуальные условия и приоритетные выплаты. Топовый сервис.", en: "Working as a team of 8. PrimeTraff provided a personal manager, individual terms and priority payouts. Top-tier service." } },
      { name: { ru: "Анна П.", en: "Anna P." }, role: { ru: "Арбитражник", en: "Affiliate" }, avatar: { ru: "А", en: "A" }, text: { ru: "Пробовала 4 партнёрки за последний год. PrimeTraff — единственная, где не было проблем с выплатами. Всё чётко и в срок, без задержек.", en: "Tried 4 networks in the last year. PrimeTraff is the only one with no payout issues. Everything on time, no delays." } },
    ],
  },
  partnersSection: {
    title: { ru: "Наши партнеры", en: "Our Partners" },
    subtitle: { ru: "Работаем с лучшими брендами индустрии", en: "Working with the best brands in the industry" },
  },
  faq: {
    title: { ru: "Частые вопросы", en: "FAQ" },
    subtitle: { ru: "Не нашли ответ? Напишите нам в Telegram", en: "Didn't find an answer? Contact us on Telegram" },
    items: [
      {
        question: { ru: "Предоставляете ли вы готовую воронку для пролива?", en: "Do you provide a ready-made funnel for traffic?" },
        answer: { ru: "Да, в нее входит: готовое PWA-приложение с настроенными PUSH-уведомлениями + конвертящие креативы + инструкция по запуску", en: "Yes, it includes: a ready-made PWA app with configured PUSH notifications + converting creatives + launch instructions" },
      },
      {
        question: { ru: "Возможно ли получить индивидуальные условия по выплатам?", en: "Is it possible to get individual payout terms?" },
        answer: { ru: "Да, активным веб-мастерам мы идем навстречу и готовы предоставлять индивидуальные условия для дополнительного удобства", en: "Yes, we accommodate active webmasters and are ready to provide individual terms for additional convenience" },
      },
      {
        question: { ru: "У меня нет трекера, что делать?", en: "I don't have a tracker, what should I do?" },
        answer: { ru: "Мы предоставим вам полностью бесплатный трекер с интуитивным интерфейсом, где вы сможете настроить все необходимые параметры, отслеживать конверсии в реальном времени и оптимизировать свои кампании для максимальной эффективности", en: "We will provide you with a completely free tracker with an intuitive interface where you can configure all necessary parameters, track conversions in real time and optimize your campaigns for maximum efficiency" },
      },
      {
        question: { ru: "В каких случаях трафик не соответствует минимальным требованиям компании?", en: "In what cases does traffic not meet the company's minimum requirements?" },
        answer: { ru: "Трафик не соответствует минимальным требованиям компании в случае:\n1. Относится к запрещенным видам трафика\n2. Не соответствует заявленному источнику\n3. Количество повторных депозитов не менее 50% от количества первых\n4. Процент дубликатов свыше 10% от всех привлеченных игроков", en: "Traffic does not meet the company's minimum requirements in the following cases:\n1. It belongs to prohibited traffic types\n2. It does not match the declared source\n3. The number of repeat deposits is less than 50% of the first ones\n4. The duplicate rate exceeds 10% of all attracted players" },
      },
    ],
  },
  cta: {
    registrationOpen: { ru: "Регистрация открыта", en: "Registration Open" },
    title1: { ru: "Готовы начать", en: "Ready to Start" },
    title2: { ru: "зарабатывать?", en: "Earning?" },
    subtitle: { ru: "Присоединяйтесь к PrimeTraff сегодня и получите доступ к лучшим офферам рынка", en: "Join PrimeTraff today and get access to the best offers on the market" },
    becomePartner: { ru: "Стать партнером", en: "Become a Partner" },
    telegramSupport: { ru: "Telegram поддержка", en: "Telegram Support" },
    noHolds: { ru: "Без холдов", en: "No Holds" },
    fastApproval: { ru: "Быстрое одобрение", en: "Fast Approval" },
    support247: { ru: "Поддержка 24/7", en: "24/7 Support" },
  },
  footer: {
    description: { ru: "Премиум партнерская сеть для iGaming вертикали с лучшими офферами и условиями.", en: "Premium affiliate network for the iGaming vertical with the best offers and conditions." },
    forPartners: { ru: "Партнерам", en: "For Partners" },
    registration: { ru: "Регистрация", en: "Registration" },
    features: { ru: "Возможности", en: "Features" },
    howItWorks: { ru: "Как это работает", en: "How It Works" },
    reviews: { ru: "Отзывы", en: "Reviews" },
    navigation: { ru: "Навигация", en: "Navigation" },
    partnersLink: { ru: "Партнеры", en: "Partners" },
    loginLink: { ru: "Войти", en: "Login" },
    becomePartner: { ru: "Стать партнером", en: "Become a Partner" },
    support: { ru: "Поддержка", en: "Support" },
    telegramChat: { ru: "Telegram чат", en: "Telegram Chat" },
    ourChannel: { ru: "Наш канал", en: "Our Channel" },
    allRights: { ru: "Все права защищены.", en: "All rights reserved." },
    privacy: { ru: "Политика конфиденциальности", en: "Privacy Policy" },
    terms: { ru: "Условия использования", en: "Terms of Service" },
  },
  popup: {
    specialOffer: { ru: "Специальное предложение", en: "Special Offer" },
    hurryUp: { ru: "Успейте воспользоваться", en: "Don't miss out" },
    days: { ru: "дней", en: "days" },
    hours: { ru: "часов", en: "hours" },
    minutes: { ru: "минут", en: "min" },
    seconds: { ru: "секунд", en: "sec" },
    bonusText: { ru: "Бонус", en: "Bonus" },
    bonusDesc: { ru: "к первой выплате для новых партнеров", en: "to the first payout for new partners" },
    becomePartner: { ru: "Стать партнером", en: "Become a Partner" },
  },
  stickyCta: {
    becomePartner: { ru: "Стать партнером", en: "Become a Partner" },
  },
  scrollToTop: { ru: "Наверх", en: "Back to top" },
} as const;

export type Translations = typeof translations;

export function t(obj: { ru: string; en: string }, lang: Lang): string {
  return obj[lang];
}
