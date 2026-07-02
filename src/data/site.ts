/** Central route + nav config so links stay consistent across every page. */

export const NAV_LINKS = [
  { label: "Как это работает", href: "/#how" },
  { label: "AI-оркестратор", href: "/#orchestrator" },
  { label: "Тарифы", href: "/#pricing" },
  { label: "Отрасли", href: "/#industries" },
  { label: "Блог", href: "/blog" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Услуги",
    links: [
      { label: "Full", href: "/#pricing" },
      { label: "MTPE", href: "/#pricing" },
      { label: "Express", href: "/#pricing" },
    ],
  },
  {
    title: "Отрасли",
    links: [
      { label: "IT и SaaS", href: "/otrasli/it-saas" },
      { label: "Нефтегаз и энергетика", href: "/otrasli/neftegaz" },
      { label: "Машиностроение", href: "/otrasli/mashinostroenie" },
      { label: "Медтех и фарма", href: "/otrasli/medteh" },
    ],
  },
  {
    title: "Платформа",
    links: [
      { label: "AI-оркестратор", href: "/#orchestrator" },
      { label: "Термбаза и TM", href: "/#glossary" },
      { label: "Форматы", href: "/#formats" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/o-nas" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/kontakty" },
    ],
  },
];

/** Industry verticals — single source of truth for slugs, routes and content. */
export interface IndustryStep {
  iconName: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface Industry {
  slug: string; // route segment under /otrasli/
  name: string;
  iconName: string;
  heroTitle: string;
  heroSubtitle: string;
  docTypes: { title: string; desc: string }[];
  steps: IndustryStep[];
  formats: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "it-saas",
    name: "IT и SaaS",
    iconName: "cpu",
    heroTitle: "Технический перевод для IT и SaaS-продуктов",
    heroSubtitle:
      "Строки интерфейса, документация API и справочные центры — переведены с сохранением плейсхолдеров и разметки.",
    docTypes: [
      { title: "UI-строки и локализация", desc: "Строки интерфейса с сохранением переменных, плейсхолдеров и ограничений по длине." },
      { title: "API-документация", desc: "Референсы эндпоинтов, SDK-гайды и примеры кода — без искажения синтаксиса." },
      { title: "Пользовательские соглашения", desc: "EULA, политика конфиденциальности, условия использования с юридической точностью." },
      { title: "Справочные центры", desc: "Базы знаний и статьи поддержки, адаптированные под тон продукта." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите YAML/JSON-строки, Markdown-документацию или экспорт справочного центра.", bullets: ["JSON, YAML, Markdown", "Git-совместимые форматы"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель, обученную на технической и IT-терминологии." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с опытом в разработке проверяет термины и плейсхолдеры." },
      { iconName: "package-check", title: "Сдача", description: "Готовые строки — с сохранением исходной структуры файла." },
    ],
    formats: ["JSON", "YAML", "PO", "XLIFF", "Markdown", "XML"],
  },
  {
    slug: "neftegaz",
    name: "Нефтегаз и энергетика",
    iconName: "flame",
    heroTitle: "Технический перевод для нефтегазовой отрасли",
    heroSubtitle:
      "Регламенты, паспорта безопасности и чертежи трубопроводов — переведены инженером с профильным образованием.",
    docTypes: [
      { title: "Технические паспорта и регламенты", desc: "Паспорта безопасности, регламенты эксплуатации, инструкции по технике безопасности." },
      { title: "Проектная документация", desc: "ТУ, ТЗ и пояснительные записки к проектам обустройства месторождений." },
      { title: "Чертежи и схемы", desc: "Схемы трубопроводов и P&ID с сохранением исходной верстки DWG/PDF." },
      { title: "Сертификаты и разрешения", desc: "Сертификаты соответствия и разрешительная документация для надзорных органов." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите чертежи, регламенты и сертификаты в исходном формате.", bullets: ["DWG, PDF, DOCX, XLSX", "Чертежи и схемы P&ID"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под отраслевую и нормативную терминологию." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с опытом в нефтегазовой отрасли проверяет терминологию и нормы." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением исходной верстки и чертежей." },
    ],
    formats: ["PDF", "DOCX", "DWG", "XLSX"],
  },
  {
    slug: "mashinostroenie",
    name: "Машиностроение",
    iconName: "cog",
    heroTitle: "Технический перевод для машиностроения",
    heroSubtitle:
      "Конструкторская документация, инструкции по эксплуатации и спецификации — с сохранением ГОСТ-терминологии.",
    docTypes: [
      { title: "Конструкторская документация", desc: "Чертежи КД, сборочные чертежи и спецификации по ГОСТ 2.1XX." },
      { title: "Инструкции по эксплуатации", desc: "Руководства пользователя и регламенты технического обслуживания." },
      { title: "Технические условия", desc: "ТУ на изготовление, приёмку и испытания продукции." },
      { title: "Каталоги запчастей", desc: "Номенклатура и каталоги комплектующих с точной терминологией." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите чертежи КД, спецификации и руководства в исходном формате.", bullets: ["DWG, DXF, PDF, XLSX", "Чертежи и спецификации"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под машиностроительную терминологию и ГОСТ." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с техническим образованием проверяет обозначения и допуски." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением исходных чертежей и таблиц." },
    ],
    formats: ["DWG", "DXF", "PDF", "XLSX"],
  },
  {
    slug: "medteh",
    name: "Медтех и фарма",
    iconName: "pill",
    heroTitle: "Технический перевод для медтеха и фармы",
    heroSubtitle:
      "Инструкции к оборудованию, регистрационные досье и клинические протоколы — с точностью, требуемой регулятором.",
    docTypes: [
      { title: "Инструкции к оборудованию", desc: "Руководства по эксплуатации медицинских приборов и инструкции IFU." },
      { title: "Регистрационные досье", desc: "Досье для регистрации медизделий и лекарственных препаратов." },
      { title: "Клинические протоколы", desc: "Протоколы исследований и информированные согласия для пациентов." },
      { title: "Маркировка и упаковка", desc: "Тексты маркировки, вкладыши-инструкции и упаковочные материалы." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите инструкции, досье и протоколы в исходном формате.", bullets: ["PDF, DOCX, XML", "Досье и вкладыши-инструкции"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под медицинскую и фармацевтическую терминологию." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с медицинским образованием проверяет точность формулировок." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением регуляторной структуры." },
    ],
    formats: ["PDF", "DOCX", "XML"],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
export const otherIndustries = (slug: string) => INDUSTRIES.filter((i) => i.slug !== slug);
