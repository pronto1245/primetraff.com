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
  blog: {
    title: { ru: "Блог", en: "Blog" },
    subtitle: { ru: "Полезные материалы для арбитражников", en: "Useful materials for affiliates" },
    headerLabel: { ru: "Полезные материалы", en: "Useful materials" },
    allCategories: { ru: "Все", en: "All" },
    readMore: { ru: "Читать", en: "Read" },
    backToBlog: { ru: "Назад в блог", en: "Back to Blog" },
    noPosts: { ru: "Пока нет статей в этой категории", en: "No articles in this category yet" },
    noPostsShort: { ru: "Статей пока нет", en: "No posts yet" },
    categories: {
      basics: { ru: "Основные понятия", en: "Basic Concepts" },
      beginner: { ru: "Новичку", en: "For Beginners" },
      traffic: { ru: "Источники трафика", en: "Traffic Sources" },
      trends: { ru: "iGaming Тренды", en: "iGaming Trends" },
      news: { ru: "Новости", en: "News" },
    },
    nav: { ru: "Блог", en: "Blog" },
  },
  landingPage: {
    heroSloganLeft: { ru: "Где трафик превращается\nв партнёрство.", en: "Where traffic becomes\npartnership." },
    heroSloganRight: { ru: "Работаем для вас\nс 2025 года", en: "Working for you\nsince 2025" },
    heroCta: { ru: "Стать партнёром", en: "Become a Partner" },
    aboutLabel: { ru: "Немного", en: "A little bit" },
    aboutTitle: { ru: "О нас", en: "About us" },
    aboutParas: {
      ru: [
        "PrimeTraff — партнёрская сеть в iGaming, созданная для долгосрочного сотрудничества и реального результата.",
        "Мы объединяем рекламодателей и аффилейтов, выстраивая прозрачную и понятную модель работы.",
        "Следим за качеством трафика, защищаем участников от фрода и оперативно решаем возникающие вопросы.",
        "Не гонимся за количеством — развиваем сеть за счёт сильных партнёров и эффективных источников.",
        "Наша цель — сделать сотрудничество предсказуемым, комфортным и выгодным для всех сторон.",
      ],
      en: [
        "PrimeTraff is an iGaming affiliate network built for long-term partnerships and real results.",
        "We connect advertisers and affiliates through a transparent and straightforward business model.",
        "We monitor traffic quality, protect participants from fraud, and resolve issues promptly.",
        "We don't chase volume — we grow the network through strong partners and effective sources.",
        "Our goal is to make collaboration predictable, comfortable, and profitable for all parties.",
      ],
    },
    trustedBy: { ru: "Нам доверяют лидеры рынка", en: "Trusted by market leaders" },
  },
  affiliatesPage: {
    heroParas: {
      ru: [
        "Предоставляем доступ к актуальным офферам под разные источники трафика — за каждым партнёром закрепляется менеджер на весь период работы.",
        "Помогаем с запуском, трекингом, оптимизацией и техническими вопросами.",
        "Сильные результаты открывают доступ к увеличению объёмов и индивидуальным условиям.",
      ],
      en: [
        "We provide access to current offers for different traffic sources — each partner gets a dedicated manager for the entire period.",
        "We help with launch, tracking, optimization, and technical questions.",
        "Strong results unlock volume increases and individual terms.",
      ],
    },
    register: { ru: "Регистрация", en: "Register" },
    login: { ru: "Вход", en: "Login" },
    whyLabel: { ru: "Почему", en: "Why" },
    whyTitle: { ru: "Нам доверяют", en: "They trust us" },
    whyParas: {
      ru: [
        "Мы берём на себя решение ключевых вопросов — от индивидуальных ставок до пересмотра холдов и возможности работы по предоплате.",
        "Партнёры отмечают высокий уровень экспертизы нашей команды и качество сопровождения на каждом этапе.",
        "До запуска тщательно проверяем рекламодателей и условия сотрудничества, снижая вероятность спорных ситуаций и проблем с выплатами.",
        "Вы концентрируетесь на привлечении трафика, а переговоры, контроль и организационные вопросы остаются на нашей стороне.",
        "Ваша задача — приводить качественный трафик. Наша — сделать так, чтобы вы за него получили максимум.",
      ],
      en: [
        "We handle key issues — from individual rates to hold revisions and the possibility of working with prepayment.",
        "Partners note the high level of expertise of our team and the quality of support at every stage.",
        "Before launch, we thoroughly check advertisers and collaboration terms, reducing the likelihood of disputes and payout issues.",
        "You focus on driving traffic, while negotiations, control, and organizational issues remain on our side.",
        "Your task is to bring quality traffic. Ours is to make sure you get the maximum for it.",
      ],
    },
    reviewsTitle: { ru: "Отзывы вебмастеров", en: "Webmaster reviews" },
    reviews: [
      { name: { ru: "Артём", en: "Artem" }, text: { ru: "Работаю с сетью с момента запуска — менеджер всегда на связи, оффер подобрали под мой источник без лишних вопросов. Выплаты приходят строго по графику.", en: "I've been working with the network since launch — the manager is always available, they matched the offer to my source without unnecessary questions. Payments come strictly on schedule." } },
      { name: { ru: "Кирилл", en: "Kirill" }, text: { ru: "Попробовал несколько сетей, здесь лучшая поддержка по запуску. Дали готовое PWA, помогли с постбеками — запустился за день.", en: "I tried several networks — this one has the best launch support. They gave a ready-made PWA, helped with postbacks — I launched in one day." } },
      { name: { ru: "Настя", en: "Nastya" }, text: { ru: "Оффера с реальными KPI, ничего нереального. Менеджер честно говорит что зайдёт, а что нет — это экономит время и бюджет.", en: "Offers with realistic KPIs, nothing impossible. The manager honestly tells you what will work and what won't — this saves time and budget." } },
      { name: { ru: "Денис", en: "Denis" }, text: { ru: "Холд пересмотрели после первых хороших результатов без лишних переговоров. Индивидуальные условия — реально, а не просто слова.", en: "The hold was revised after the first good results without unnecessary negotiations. Individual terms are real, not just words." } },
      { name: { ru: "Влад", en: "Vlad" }, text: { ru: "Уже три потока запустил через эту сеть. Конверт стабильный, рекламодатели серьёзные. Никаких проблем с выплатами за всё время.", en: "I've launched three flows through this network. Conversion is stable, advertisers are serious. No payment issues throughout." } },
      { name: { ru: "Лиза", en: "Liza" }, text: { ru: "Начинала с нуля без трекера — предоставили бесплатно, всё настроили. Первые конверсии пошли уже на второй день после регистрации.", en: "I started from scratch without a tracker — they provided one for free and set everything up. First conversions came on the second day after registration." } },
      { name: { ru: "Роман", en: "Roman" }, text: { ru: "Лью SEO — сеть принимает, условия нормальные. Важно что менеджер понимает специфику источника, а не пытается переключить на другой формат.", en: "I run SEO traffic — the network accepts it, terms are fair. What matters is that the manager understands the source specifics instead of trying to switch me to another format." } },
      { name: { ru: "Юля", en: "Yulia" }, text: { ru: "Несколько раз обращалась с нестандартными вопросами — всегда решали быстро. Ощущение что с живой командой работаешь, а не с ботами.", en: "I had several non-standard issues — they were always resolved quickly. It feels like working with a real team, not bots." } },
    ],
    contactMarquee: { ru: "СВЯЗАТЬСЯ С НАМИ • ", en: "CONTACT US • " },
    contactLabel: { ru: "Обсудить", en: "Discuss" },
    contactTitle: { ru: "Сотрудничество", en: "Partnership" },
    go: { ru: "Перейти", en: "Go" },
    supportDesc: { ru: "на связи 24/7 — решаем любой вопрос быстро", en: "available 24/7 — resolve any issue quickly" },
    managerTitle: { ru: "Менеджер", en: "Manager" },
    managerDesc: { ru: "прямой контакт для обсуждения условий, ставок и запуска", en: "direct contact to discuss terms, rates, and launch" },
    tgChannelDesc: { ru: "новости сети, свежие офферы и апдейты — только по делу", en: "network news, fresh offers, and updates — straight to the point" },
    faqLabel: { ru: "Частые", en: "Frequently" },
    faqTitle: { ru: "Вопросы", en: "Asked Questions" },
    faqItems: [
      {
        q: { ru: "Предоставляете ли вы готовую воронку для пролива?", en: "Do you provide a ready-made funnel?" },
        a: { ru: "Да, в неё входит: готовое PWA-приложение с настроенными PUSH-уведомлениями + конвертящие креативы + инструкция по запуску.", en: "Yes, it includes: a ready-made PWA app with configured PUSH notifications + converting creatives + launch instructions." },
      },
      {
        q: { ru: "Возможно ли получить индивидуальные условия по выплатам?", en: "Can I get individual payout terms?" },
        a: { ru: "Да, активным веб-мастерам мы идём навстречу и готовы предоставлять индивидуальные условия для дополнительного удобства.", en: "Yes, for active webmasters we are open to providing individual terms for additional convenience." },
      },
      {
        q: { ru: "У меня нет трекера, что делать?", en: "I don't have a tracker, what should I do?" },
        a: { ru: "Мы предоставим вам полностью бесплатный трекер с интуитивным интерфейсом, где вы сможете настроить все необходимые параметры, отслеживать конверсии в реальном времени и оптимизировать свои кампании для максимальной эффективности.", en: "We will provide you with a completely free tracker with an intuitive interface where you can configure all necessary parameters, track conversions in real time, and optimize your campaigns for maximum efficiency." },
      },
      {
        q: { ru: "В каких случаях трафик не соответствует минимальным требованиям компании?", en: "When doesn't traffic meet minimum company requirements?" },
        a: { ru: "Трафик не соответствует минимальным требованиям компании в случае: 1. Относится к запрещённым видам трафика. 2. Не соответствует заявленному источнику. 3. Количество повторных депозитов менее 50% от количества первых. 4. Процент дубликатов свыше 10% от всех привлечённых игроков.", en: "Traffic does not meet minimum requirements if: 1. It belongs to prohibited traffic types. 2. It does not match the declared source. 3. The number of re-deposits is less than 50% of first deposits. 4. The duplicate rate exceeds 10% of all attracted players." },
      },
      {
        q: { ru: "По каким моделям вы работаете?", en: "What models do you work with?" },
        a: { ru: "Работаем по CPA, RevShare и гибридным моделям. Модель подбирается под источник трафика и объёмы — оптимальный вариант согласуете с менеджером до запуска.", en: "We work with CPA, RevShare, and hybrid models. The model is selected based on the traffic source and volume — the optimal option is agreed with the manager before launch." },
      },
      {
        q: { ru: "Какие виды трафика вы принимаете?", en: "What types of traffic do you accept?" },
        a: { ru: "Принимаем PWA, ASO, UAC, Facebook, In-App, SEO и другие источники. Главное условие — качество: источник согласовывается с менеджером до старта.", en: "We accept PWA, ASO, UAC, Facebook, In-App, SEO, and other sources. The main condition is quality: the source is agreed with the manager before launch." },
      },
      {
        q: { ru: "Как быстро происходят выплаты?", en: "How fast are payouts?" },
        a: { ru: "Выплаты проходят по согласованному графику без задержек. Для проверенных партнёров возможен пересмотр холдов и работа по предоплате.", en: "Payouts follow an agreed schedule without delays. For verified partners, hold revision and prepayment work is possible." },
      },
      {
        q: { ru: "Есть ли жёсткие KPI по офферам?", en: "Are there strict KPIs for offers?" },
        a: { ru: "По большинству офферов в сети жёстких KPI нет. Но это не значит, что можно лить что угодно: активность игроков мы отслеживаем постоянно, и некачественный трафик в системе не задержится.", en: "Most offers in the network don't have strict KPIs. But this doesn't mean you can drive any traffic: player activity is constantly monitored, and low-quality traffic won't stay in the system." },
      },
      {
        q: { ru: "Как начать работу с вами?", en: "How do I start working with you?" },
        a: { ru: "Зарегистрируйтесь или напишите нам — менеджер свяжется, согласует источник, оффер и условия, после чего вы получите ссылки и сможете запускаться.", en: "Register or write to us — a manager will get in touch, agree on the source, offer, and terms, after which you will receive links and can launch." },
      },
    ],
  },
  advertisersPage: {
    heroParas: {
      ru: [
        "Подключаем проверенных партнёров и помогаем получать целевой трафик без лишнего риска.",
        "Контролируем качество привлечённой аудитории и отслеживаем показатели на каждом этапе работы.",
        "Отсекаем источники, которые не соответствуют согласованным требованиям и KPI.",
        "Эффективные направления получаем возможность масштабировать вместе с рекламодателем.",
        "В результате вы получаете не просто объём, а управляемый поток пользователей с понятной экономикой.",
      ],
      en: [
        "We connect verified partners and help you get targeted traffic without unnecessary risk.",
        "We control the quality of attracted audiences and track metrics at every stage.",
        "We cut off sources that don't meet agreed requirements and KPIs.",
        "Effective directions can be scaled together with the advertiser.",
        "As a result, you get not just volume, but a manageable user flow with a clear economy.",
      ],
    },
    contactUs: { ru: "Связаться с нами", en: "Contact us" },
    whyLabel: { ru: "Почему", en: "Why" },
    whyTitle: { ru: "Нам доверяют", en: "They trust us" },
    whyParas: {
      ru: [
        "Отбираем партнёров вручную — в сети работают только те, кто прошёл проверку качества трафика.",
        "Контролируем каждый поток на всём пути: некачественные источники отключаем сразу, без ожидания претензий.",
        "Масштабируем только рабочие связки — вы получаете стабильный поток с предсказуемой экономикой.",
      ],
      en: [
        "We select partners manually — only those who have passed traffic quality verification work in the network.",
        "We monitor every flow throughout: low-quality sources are disconnected immediately, without waiting for complaints.",
        "We scale only working bundles — you get a stable flow with predictable economics.",
      ],
    },
    reviewsTitle: { ru: "Отзывы о работе с нами", en: "Reviews about working with us" },
    reviews: [
      { name: { ru: "Селена", en: "Selena" }, text: { ru: "Работаем с командой давно, предоставляют веб-мастеров с хорошим трафиком на наши продукты. Как рекламодатель, мы очень довольны сотрудничеством.", en: "We've been working with the team for a long time; they provide webmasters with good traffic for our products. As an advertiser, we are very satisfied with the collaboration." } },
      { name: { ru: "Джон", en: "John" }, text: { ru: "Это первое сотрудничество, когда партнёрская программа реально фильтрует фрод. Трафик качественный, показатели выше, чем мы ожидали.", en: "This is the first collaboration where the affiliate program actually filters fraud. The traffic is high quality and the metrics exceeded our expectations." } },
      { name: { ru: "Марко", en: "Marco" }, text: { ru: "Больше всего качественных потоков с трафиком — результат говорит сам за себя. Работаем уже три года и продолжаем масштабироваться.", en: "The most quality traffic flows come from here — the results speak for themselves. We've been working together for three years and continue to scale." } },
      { name: { ru: "Анна", en: "Anna" }, text: { ru: "Прозрачная работа с источниками: слабые сорсы отключают сами, не дожидаясь наших претензий. Такое отношение — редкость на рынке.", en: "Transparent work with sources: they disconnect weak sources themselves without waiting for our complaints. Such an approach is rare in the market." } },
      { name: { ru: "Давид", en: "David" }, text: { ru: "Качество трафика стабильно высокое, ретеншн игроков заметно лучше среднего по рынку. Рекомендуем как надёжного партнёра.", en: "Traffic quality is consistently high, player retention is noticeably better than the market average. We recommend them as a reliable partner." } },
      { name: { ru: "Ольга", en: "Olga" }, text: { ru: "Быстрая коммуникация и честная позиция по невалиду. Все спорные кейсы решаются в течение суток, без затяжных разбирательств.", en: "Fast communication and an honest stance on invalid traffic. All disputed cases are resolved within a day, without prolonged proceedings." } },
      { name: { ru: "Томас", en: "Thomas" }, text: { ru: "Подключились полгода назад — объёмы выросли в три раза без потери качества. Команда действительно следит за каждым потоком.", en: "We joined six months ago — volumes have tripled without any loss of quality. The team really monitors every flow." } },
      { name: { ru: "Ирина", en: "Irina" }, text: { ru: "Работали со многими сетями, но здесь лучший баланс объёма и качества. Фрода практически нет, конверсия в депозит стабильная.", en: "We've worked with many networks, but here is the best balance of volume and quality. Almost no fraud, stable conversion to deposit." } },
      { name: { ru: "Алекс", en: "Alex" }, text: { ru: "Ценим за принципиальность: сомнительные источники не допускаются вообще. Для нас это ключевой фактор долгосрочного сотрудничества.", en: "We value them for their principles: dubious sources are simply not allowed. For us, this is a key factor for long-term collaboration." } },
      { name: { ru: "Мария", en: "Maria" }, text: { ru: "Отличные показатели по FTD и удержанию. Менеджеры глубоко понимают продукт и подбирают действительно релевантные источники.", en: "Excellent FTD and retention metrics. Managers deeply understand the product and select truly relevant sources." } },
      { name: { ru: "Виктор", en: "Viktor" }, text: { ru: "Сотрудничаем второй год — ни одного серьёзного инцидента с качеством. Масштабируют только то, что реально приносит результат.", en: "We've been working together for two years — not a single serious quality incident. They scale only what actually delivers results." } },
    ],
    contactMarquee: { ru: "СВЯЗАТЬСЯ С НАМИ • ", en: "CONTACT US • " },
    contactLabel: { ru: "Обсудить", en: "Discuss" },
    contactTitle: { ru: "Сотрудничество", en: "Partnership" },
    go: { ru: "Перейти", en: "Go" },
    supportDesc: { ru: "на связи 24/7 — решаем любой вопрос быстро", en: "available 24/7 — resolve any issue quickly" },
    managerTitle: { ru: "Менеджер", en: "Manager" },
    managerDesc: { ru: "прямой контакт для обсуждения условий, ставок и запуска", en: "direct contact to discuss terms, rates, and launch" },
    tgChannelDesc: { ru: "новости сети, свежие офферы и апдейты — только по делу", en: "network news, fresh offers, and updates — straight to the point" },
    faqLabel: { ru: "Частые", en: "Frequently" },
    faqTitle: { ru: "Вопросы", en: "Asked Questions" },
    faqItems: [
      {
        q: { ru: "Как скоро после подключения на продукт пойдёт трафик?", en: "How soon will traffic come to the product after connection?" },
        a: { ru: "Обычно первые переходы появляются сразу после запуска: под ваш продукт мы подбираем веб-мастеров с подходящими источниками заранее, поэтому старт происходит без длительного разгона.", en: "Usually the first clicks appear immediately after launch: we select webmasters with suitable sources for your product in advance, so the start happens without a lengthy warm-up." },
      },
      {
        q: { ru: "По каким ГЕО вы льёте?", en: "What GEOs do you work with?" },
        a: { ru: "Покрываем широкий список регионов — Tier-1, Европу, СНГ, Азию и LatAm. Конкретный набор ГЕО под ваш продукт согласовываем на этапе обсуждения условий.", en: "We cover a wide range of regions — Tier-1, Europe, CIS, Asia, and LatAm. The specific set of GEOs for your product is agreed at the stage of discussing terms." },
      },
      {
        q: { ru: "На какие объёмы трафика можно рассчитывать?", en: "What traffic volumes can be expected?" },
        a: { ru: "Точную цифру заранее назвать нельзя: объём напрямую зависит от условий выкупа с вашей стороны и конверта самого продукта. Чем конкурентнее условия — тем больше сорсов подключается к работе.", en: "The exact number cannot be given in advance: volume directly depends on your buyout terms and the product's conversion rate. The more competitive the terms, the more sources get connected." },
      },
      {
        q: { ru: "Сколько занимает подключение и интеграция?", en: "How long does connection and integration take?" },
        a: { ru: "Скорость зависит от обеих сторон. Если ответы приходят быстро и постбеки настраиваются без задержек, полная интеграция реальна за один рабочий день.", en: "Speed depends on both parties. If responses come quickly and postbacks are set up without delays, full integration is realistic within one business day." },
      },
      {
        q: { ru: "Какие KPI вы готовы принимать в работу?", en: "What KPIs are you willing to work with?" },
        a: { ru: "Для нас главное — реалистичность показателей и баланс интересов: условия должны работать и на бренд, и на веб-мастеров. Офферы с заведомо недостижимыми KPI мы в сеть не берём.", en: "For us, the main thing is the realism of metrics and a balance of interests: terms must work for both the brand and webmasters. We don't take offers with obviously unachievable KPIs into the network." },
      },
      {
        q: { ru: "Есть ли гарантии, что привлечённые игроки будут активны?", en: "Are there guarantees that attracted players will be active?" },
        a: { ru: "Жёстких гарантий активности не даёт никто: она зависит не только от источников, но и от самого продукта и работы его retention-команды. Со своей стороны мы жёстко фильтруем веб-мастеров на входе, что заметно повышает долю качественного трафика.", en: "No one gives strict activity guarantees: it depends not only on sources, but also on the product itself and its retention team's work. On our side, we strictly filter webmasters at entry, which noticeably increases the share of quality traffic." },
      },
      {
        q: { ru: "Из каких шагов состоит запуск?", en: "What steps does the launch consist of?" },
        a: { ru: "Процесс простой: согласование условий → юридическая проверка → интеграция ссылок и настройка постбеков → тестовые конверсии → запуск трафика.", en: "The process is simple: agreement on terms → legal check → link integration and postback setup → test conversions → traffic launch." },
      },
      {
        q: { ru: "Подключаете ли крипто-продукты?", en: "Do you work with crypto products?" },
        a: { ru: "Да, с крипто-вертикалью работаем. Условия и требования по таким продуктам обсуждаются с менеджером индивидуально.", en: "Yes, we work with the crypto vertical. Terms and requirements for such products are discussed with a manager individually." },
      },
    ],
  },
} as const;

export type Translations = typeof translations;

export function t(obj: { ru: string; en: string }, lang: Lang): string {
  return obj[lang];
}
