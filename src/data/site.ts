/** Central route + nav config so links stay consistent across every page. */

export const NAV_LINKS = [
  { label: "Переводчик", href: "/perevodchik" },
  { label: "AI-оркестратор", href: "/product/orchestrator" },
  { label: "Услуги", href: "/uslugi" },
  { label: "Тарифы", href: "/tarify" },
  { label: "Отрасли", href: "/#industries" },
  { label: "Блог", href: "/blog" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Продукт",
    links: [
      { label: "Переводчик", href: "/perevodchik" },
      { label: "Тарифы", href: "/tarify" },
      { label: "Кабинет", href: "/app" },
    ],
  },
  {
    title: "Отрасли",
    links: [
      { label: "IT и SaaS", href: "/otrasli/it-saas" },
      { label: "Нефтегаз и энергетика", href: "/otrasli/neftegaz" },
      { label: "Машиностроение", href: "/otrasli/mashinostroenie" },
      { label: "Медтех и фарма", href: "/otrasli/medteh" },
      { label: "Энергетика", href: "/otrasli/energetika" },
      { label: "Строительство", href: "/otrasli/stroitelstvo" },
      { label: "Химпром", href: "/otrasli/himprom" },
      { label: "Автопром и транспорт", href: "/otrasli/avtoprom" },
      { label: "Металлургия", href: "/otrasli/metallurgiya" },
      { label: "Авиация и космос", href: "/otrasli/aviatsiya" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { label: "Все услуги", href: "/uslugi" },
      { label: "Перевод с китайского", href: "/uslugi/perevod-kitajskogo-oborudovaniya" },
      { label: "Перевод инструкций", href: "/uslugi/perevod-instrukcij" },
      { label: "Перевод чертежей", href: "/uslugi/perevod-chertezhej" },
      { label: "Паспорта безопасности", href: "/uslugi/perevod-pasportov-bezopasnosti" },
      { label: "Перевод патентов", href: "/uslugi/perevod-patentov" },
      { label: "Локализация ПО", href: "/uslugi/lokalizaciya-po" },
      { label: "ТУ и спецификации", href: "/uslugi/perevod-tu-i-specifikacij" },
      { label: "Регламенты ТО", href: "/uslugi/perevod-reglamentov-to" },
      { label: "Каталоги запчастей", href: "/uslugi/perevod-katalogov-zapchastej" },
      { label: "Сертификаты", href: "/uslugi/perevod-sertifikatov" },
      { label: "Нормативная документация", href: "/uslugi/perevod-normativnoj-dokumentacii" },
      { label: "Тендерная документация", href: "/uslugi/perevod-tendernoj-dokumentacii" },
    ],
  },
  {
    title: "Языковые пары",
    links: [
      { label: "С английского на русский", href: "/perevod/s-anglijskogo" },
      { label: "С русского на английский", href: "/perevod/na-anglijskij" },
      { label: "С немецкого", href: "/perevod/s-nemeckogo" },
      { label: "С китайского", href: "/perevod/s-kitajskogo" },
      { label: "С французского", href: "/perevod/s-francuzskogo" },
      { label: "С испанского", href: "/perevod/s-ispanskogo" },
    ],
  },
  {
    title: "Платформа",
    links: [
      { label: "AI-оркестратор", href: "/product/orchestrator" },
      { label: "Термбаза и TM", href: "/product/terminology" },
      { label: "API", href: "/product/api" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/o-nas" },
      { label: "Блог", href: "/blog" },
      { label: "Конфиденциальность и 152-ФЗ", href: "/bezopasnost" },
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
  relatedServiceSlugs: string[]; // существующие слаги /uslugi/*
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
    relatedServiceSlugs: ["lokalizaciya-po", "perevod-instrukcij", "perevod-patentov"],
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
    relatedServiceSlugs: ["perevod-pasportov-bezopasnosti", "perevod-instrukcij", "perevod-tu-i-specifikacij", "perevod-chertezhej"],
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
    relatedServiceSlugs: ["perevod-chertezhej", "perevod-tu-i-specifikacij", "perevod-instrukcij", "perevod-katalogov-zapchastej"],
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
    relatedServiceSlugs: ["perevod-instrukcij", "perevod-pasportov-bezopasnosti", "perevod-sertifikatov"],
  },

  // ── Энергетика и электротехника ──
  {
    slug: "energetika",
    name: "Энергетика и электротехника",
    iconName: "plug-zap",
    heroTitle: "Технический перевод для энергетики и электротехники",
    heroSubtitle:
      "Паспорта подстанций, схемы РЗА и инструкции по эксплуатации трансформаторов — переведены инженером-электротехником с сохранением обозначений ГОСТ Р МЭК.",
    docTypes: [
      { title: "Технические паспорта подстанций", desc: "Паспорта комплектных трансформаторных подстанций (КТП), распределительных устройств и силового оборудования — с сохранением заводской нумерации и таблиц параметров." },
      { title: "Схемы РЗА", desc: "Схемы релейной защиты и автоматики, принципиальные и монтажные схемы шкафов управления — обозначения ANSI и МЭК переводятся без путаницы кодов." },
      { title: "Инструкции по эксплуатации трансформаторов", desc: "Руководства по эксплуатации силовых и измерительных трансформаторов, регламенты испытаний и диагностики изоляции." },
      { title: "Сертификаты соответствия", desc: "Сертификаты и декларации соответствия ТР ТС на энергооборудование, протоколы испытаний и заводские акты." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите паспорта, схемы РЗА и протоколы испытаний в исходном формате.", bullets: ["PDF, DOCX, XLSX, DWG", "Схемы РЗА и протоколы испытаний"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель, обученную на энергетической и электротехнической терминологии ГОСТ Р МЭК." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор-электротехник проверяет обозначения на схемах и параметры оборудования." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением исходных схем и таблиц параметров." },
    ],
    formats: ["PDF", "DOCX", "XLSX", "DWG"],
    relatedServiceSlugs: ["perevod-pasportov-bezopasnosti", "perevod-instrukcij", "perevod-reglamentov-to", "perevod-sertifikatov"],
  },

  // ── Строительство и проектирование ──
  {
    slug: "stroitelstvo",
    name: "Строительство и проектирование",
    iconName: "building-2",
    heroTitle: "Технический перевод для строительства и проектирования",
    heroSubtitle:
      "Проектная документация, BIM-спецификации и разрешительные пакеты — переведены с сохранением структуры разделов ПД/РД.",
    docTypes: [
      { title: "Проектная документация (ПД/РД)", desc: "Разделы проектной и рабочей документации — пояснительные записки, технологические решения, ведомости объёмов работ." },
      { title: "BIM-модели и спецификации", desc: "Атрибуты элементов BIM-модели, спецификации оборудования и материалов, экспортированные из Revit и Renga." },
      { title: "Разрешительная документация", desc: "Заключения экспертизы, разрешения на строительство и ввод в эксплуатацию, акты приёмки." },
      { title: "Технические условия подключения к сетям", desc: "ТУ на присоединение к электрическим, тепловым, водопроводным и газовым сетям от ресурсоснабжающих организаций." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите разделы проектной документации, спецификации и чертежи в исходном формате.", bullets: ["PDF, DOCX, XLSX, DWG", "Разделы ПД/РД и спецификации BIM"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под строительную терминологию и нормативную базу СНиП/СП." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с опытом в проектировании проверяет термины и ссылки на нормативные документы." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением структуры разделов и вёрстки чертежей." },
    ],
    formats: ["PDF", "DOCX", "XLSX", "DWG", "IFC"],
    relatedServiceSlugs: ["perevod-normativnoj-dokumentacii", "perevod-tu-i-specifikacij", "perevod-tendernoj-dokumentacii"],
  },

  // ── Химическая промышленность ──
  {
    slug: "himprom",
    name: "Химическая промышленность",
    iconName: "flask-conical",
    heroTitle: "Технический перевод для химической промышленности",
    heroSubtitle:
      "Паспорта безопасности, регламенты производства и сертификаты ТР ТС — переведены с точной химической номенклатурой по CAS и IUPAC.",
    docTypes: [
      { title: "Паспорта безопасности химической продукции", desc: "SDS/паспорта безопасности с приведением структуры к ГОСТ 30333 и стандартными формулировками H- и P-фраз." },
      { title: "Регламенты производства", desc: "Технологические регламенты, рецептуры и карты контроля процесса — с сохранением параметров и допусков." },
      { title: "Сертификаты соответствия ТР ТС", desc: "Декларации и сертификаты соответствия на химическую продукцию, протоколы испытаний аккредитованных лабораторий." },
      { title: "Инструкции по обращению с опасными веществами", desc: "Инструкции по хранению, транспортировке и утилизации опасных веществ, планы ликвидации аварийных ситуаций." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите паспорта безопасности, регламенты и сертификаты в исходном формате.", bullets: ["PDF, DOCX, XLSX", "Паспорта безопасности и регламенты"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под химическую номенклатуру и нормативы СГС/REACH." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с химическим образованием проверяет номенклатуру веществ и параметры процесса." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением структуры и таблиц параметров." },
    ],
    formats: ["PDF", "DOCX", "XLSX"],
    relatedServiceSlugs: ["perevod-pasportov-bezopasnosti", "perevod-sertifikatov", "perevod-normativnoj-dokumentacii"],
  },

  // ── Автопром и транспорт ──
  {
    slug: "avtoprom",
    name: "Автопром и транспорт",
    iconName: "car",
    heroTitle: "Технический перевод для автопрома и транспорта",
    heroSubtitle:
      "Руководства по ремонту, каталоги запчастей и сертификаты ОТТС — переведены с сохранением номеров деталей и схем.",
    docTypes: [
      { title: "Руководства по ремонту и ТО", desc: "Руководства по ремонту, регламенты технического обслуживания и диагностические карты по узлам и системам." },
      { title: "Каталоги запчастей", desc: "Номенклатура запасных частей с перекрёстными артикулами и подписями на выносных схемах." },
      { title: "Сертификаты (ОТТС/ЭПТС)", desc: "Одобрения типа транспортного средства, электронные паспорта транспортных средств и протоколы испытаний." },
      { title: "Техническая документация поставщиков комплектующих", desc: "Спецификации и datasheet на узлы и компоненты от поставщиков первого и второго уровня." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите руководства по ремонту, каталоги запчастей и сертификаты в исходном формате.", bullets: ["PDF, DOCX, XLSX", "Каталоги запчастей и схемы"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под автомобильную терминологию и обозначения узлов." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с автомобильным профилем проверяет артикулы и обозначения узлов." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением схем и таблиц артикулов." },
    ],
    formats: ["PDF", "DOCX", "XLSX", "DWG"],
    relatedServiceSlugs: ["perevod-katalogov-zapchastej", "perevod-reglamentov-to", "perevod-sertifikatov", "perevod-chertezhej"],
  },

  // ── Металлургия ──
  {
    slug: "metallurgiya",
    name: "Металлургия",
    iconName: "gauge",
    heroTitle: "Технический перевод для металлургии",
    heroSubtitle:
      "Технологические регламенты плавки и проката, сертификаты качества металлопродукции — переведены с сохранением обозначений ГОСТ и зарубежных стандартов.",
    docTypes: [
      { title: "Технологические регламенты плавки и проката", desc: "Регламенты плавки, разливки и прокатного передела — параметры процесса, допуски и режимы термообработки." },
      { title: "Сертификаты качества металлопродукции", desc: "Сертификаты по ГОСТ и зарубежным стандартам (EN, ASTM), с указанием марок стали и химического состава." },
      { title: "Паспорта оборудования", desc: "Паспорта плавильных агрегатов, прокатных станов и вспомогательного оборудования." },
      { title: "Инструкции по эксплуатации печей и прокатных станов", desc: "Регламенты пуска, останова и обслуживания печей, станов и линий термообработки." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите регламенты, сертификаты и паспорта оборудования в исходном формате.", bullets: ["PDF, DOCX, XLSX", "Регламенты и сертификаты качества"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под металлургическую терминологию и марочник сталей." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор-металлург проверяет марки сплавов, параметры процесса и ссылки на стандарты." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением таблиц химического состава и режимов." },
    ],
    formats: ["PDF", "DOCX", "XLSX"],
    relatedServiceSlugs: ["perevod-chertezhej", "perevod-tu-i-specifikacij", "perevod-normativnoj-dokumentacii", "perevod-sertifikatov"],
  },

  // ── Авиация и космос ──
  {
    slug: "aviatsiya",
    name: "Авиация и космос",
    iconName: "plane",
    heroTitle: "Технический перевод для авиации и космоса",
    heroSubtitle:
      "Руководства по лётной эксплуатации, сертификационная документация и каталоги запчастей — переведены с точностью, которую требует авиационный регулятор.",
    docTypes: [
      { title: "Руководства по лётной эксплуатации (РЛЭ)", desc: "РЛЭ и руководства по технической эксплуатации воздушных судов — с сохранением процедур и ограничений." },
      { title: "Сертификационная документация", desc: "Документы на соответствие требованиям АП, EASA и FAA — акты, протоколы и заключения по сертификации типа." },
      { title: "Технические бюллетени", desc: "Сервисные и технические бюллетени производителей, директивы лётной годности и извещения об изменениях." },
      { title: "Каталоги запчастей воздушных судов", desc: "Иллюстрированные каталоги деталей (IPC) с перекрёстными номерами и позициями на разнесённых схемах." },
    ],
    steps: [
      { iconName: "cloud-upload", title: "Загрузка", description: "Загрузите РЛЭ, сертификационные документы и бюллетени в исходном формате.", bullets: ["PDF, DOCX, XLSX", "РЛЭ и технические бюллетени"] },
      { iconName: "cpu", title: "AI-оркестрация", description: "Роутер выбирает модель под авиационную терминологию и требования АП/EASA/FAA." },
      { iconName: "user-check", title: "Редактор-инженер", description: "Редактор с авиационным профилем проверяет процедуры, ограничения и номера бюллетеней." },
      { iconName: "package-check", title: "Сдача", description: "Готовый документ — с сохранением структуры разделов и нумерации бюллетеней." },
    ],
    formats: ["PDF", "DOCX", "XLSX"],
    relatedServiceSlugs: ["perevod-katalogov-zapchastej", "perevod-reglamentov-to", "perevod-sertifikatov", "perevod-instrukcij"],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
export const otherIndustries = (slug: string) => INDUSTRIES.filter((i) => i.slug !== slug);
