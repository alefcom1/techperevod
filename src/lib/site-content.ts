import { promises as fs } from "fs";
import path from "path";

/**
 * Редактируемый через /admin контент: SEO-метатеги и основные тексты
 * (заголовки/подзаголовки) страниц. Хранится в JSON-файле вне git
 * (data/site-content.json, см. .gitignore) — правки на сервере переживают
 * git reset --hard при деплое. Поверх файла всегда лежит DEFAULT_CONTENT
 * (глубокое слияние), поэтому добавление новых полей в код не требует
 * миграции существующего файла.
 */

export interface MetaEntry {
  title: string;
  description: string;
}

export interface PlanContent {
  name: string;
  price: string;
  per: string;
  desc: string;
}

export interface SiteContent {
  meta: {
    home: MetaEntry;
    "o-nas": MetaEntry;
    blog: MetaEntry;
    kontakty: MetaEntry;
    perevodchik: MetaEntry;
    tarify: MetaEntry;
    "product/orchestrator": MetaEntry;
    "product/terminology": MetaEntry;
    "product/api": MetaEntry;
    otrasli: Record<string, MetaEntry>;
  };
  home: {
    heroSubtitle: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    howItWorksSubtitle: string;
    orchestratorTitle: string;
    orchestratorSubtitle: string;
    whyTitle: string;
    whySubtitle: string;
    beforeAfterTitle: string;
    pricingTitle: string;
    glossaryTitle: string;
    glossarySubtitle: string;
    audienceTitle: string;
    audienceSubtitle: string;
    formatsTitle: string;
    proofTitle: string;
    proofSubtitle: string;
  };
  tarify: {
    heroTitle: string;
    heroSubtitle: string;
    addonTitle: string;
    addonSubtitle: string;
    addonEngineerTitle: string;
    addonEngineerDesc: string;
    addonNativeTitle: string;
    addonNativeDesc: string;
    plans: {
      free: PlanContent;
      start: PlanContent;
      pro: PlanContent;
      business: PlanContent;
    };
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  meta: {
    home: {
      title: "techperevod.com — технический перевод AI + инженер",
      description:
        "Технический перевод для инженерных, IT и промышленных компаний: связка AI-моделей и редактора-инженера. Оценка объёма и срока за 2 минуты после загрузки документа.",
    },
    "o-nas": {
      title: "О нас",
      description:
        "techperevod — платформа технического перевода: AI-оркестрация моделей плюс редактура инженеров-переводчиков. Скорость AI, точность инженера.",
    },
    blog: {
      title: "Блог",
      description:
        "Статьи об AI-оркестрации, работе с термбазой и памятью переводов, и техническом переводе по отраслям — от нефтегаза до медтеха.",
    },
    kontakty: {
      title: "Контакты",
      description:
        "Свяжитесь с techperevod: email, телефон, Telegram. Оставьте заявку и прикрепите документ — пришлём оценку стоимости в течение рабочего дня.",
    },
    perevodchik: {
      title: "Бесплатный онлайн-переводчик технических текстов",
      description:
        "Переведите технический текст онлайн бесплатно — до 2 000 знаков. AI-перевод с сохранением терминологии, чисел и единиц измерения. Русский, английский, немецкий, китайский.",
    },
    tarify: {
      title: "Тарифы — подписка на технический перевод",
      description:
        "Бесплатный AI-перевод фрагментов, подписка с оркестрацией моделей от 2 900 ₽/мес и редактура инженером от 1,5 ₽/слово. Калькулятор подбора тарифа по объёму.",
    },
    "product/orchestrator": {
      title: "AI-оркестратор — роутер моделей перевода",
      description:
        "Роутер выбирает лучшую модель под языковую пару и тип документа: GPT, Claude, DeepL и YandexGPT, DeepSeek — легально в одном процессе, с объяснением выбора.",
    },
    "product/terminology": {
      title: "Термбаза и память переводов",
      description:
        "Глоссарий и память переводов (TM) на каждого клиента: единая терминология во всех заказах, скидка за повторы видна до оплаты. Термбаза принадлежит вам.",
    },
    "product/api": {
      title: "API технического перевода",
      description:
        "REST API платформы techperevod: перевод текста и документов из вашего кода, с оркестрацией моделей и термбазой. Доступен на тарифах Pro и Business.",
    },
    otrasli: {},
  },
  home: {
    heroSubtitle:
      "Документ переводит связка из нескольких AI-моделей и инженера с профильным образованием — а оценку объёма и срока вы получите уже через 2 минуты после загрузки.",
    comparisonTitle: "Онлайн-переводчик, бюро переводов или платформа?",
    comparisonSubtitle:
      "Честное сравнение трёх способов перевести техническую документацию — по пунктам, которые действительно влияют на результат.",
    howItWorksSubtitle:
      "Платформа встраивается в ваш процесс работы с документацией: от загрузки файла до сдачи в исходном формате — с AI-оркестрацией и проверкой инженером.",
    orchestratorTitle: "Единственная платформа с доступом к обоим контурам моделей",
    orchestratorSubtitle:
      "GPT, Claude, DeepL и YandexGPT, DeepSeek — легально в одном рабочем процессе. Роутер выбирает модель под языковую пару и тип документа, и показывает, почему выбрал именно её.",
    whyTitle: "Почему techperevod",
    whySubtitle:
      "Единственная платформа, где в одном конвейере работают AI-оркестратор нескольких моделей, ваша собственная терминология и живые инженеры-редакторы.",
    beforeAfterTitle: "Разница видна",
    pricingTitle: "Три уровня — вы платите за нужную глубину",
    glossaryTitle: "Ваша терминология под контролем",
    glossarySubtitle:
      "Глоссарий и память переводов на каждого клиента. Повторы считаются автоматически — скидка видна до оплаты.",
    audienceTitle: "Кому подходит платформа",
    audienceSubtitle:
      "Командам, которым технический перевод нужен быстро, с единой терминологией и без управления несколькими подрядчиками.",
    formatsTitle: "65+ форматов, включая инженерные",
    proofTitle: "Не только слова — конкретные цифры",
    proofSubtitle: "Иллюстративные показатели пилота; обновим на реальные данные по итогам первого отчётного периода.",
  },
  tarify: {
    heroTitle: "Один конвейер — три уровня качества",
    heroSubtitle:
      "Бесплатный AI-перевод фрагментов, подписка с оркестрацией моделей для рабочих объёмов и редактура инженером или носителем языка — по слову, когда она нужна.",
    addonTitle: "Уровень 3 — проверка человеком",
    addonSubtitle:
      "Доплата за слово поверх любого тарифа. Заказывается в один клик из кабинета — для документов, где цена ошибки высока.",
    addonEngineerTitle: "Редактор-инженер · от 1,5 ₽/слово",
    addonEngineerDesc:
      "Специалист с профильным образованием сверяет терминологию, обозначения и смысл с термбазой вашей отрасли.",
    addonNativeTitle: "Носитель языка · от 3 ₽/слово",
    addonNativeDesc:
      "Финальная стилистическая вычитка носителем целевого языка — для публичных и маркетинговых материалов.",
    plans: {
      free: { name: "Free", price: "0 ₽", per: "", desc: "Мгновенный перевод фрагментов — попробовать качество." },
      start: { name: "Start", price: "2 900 ₽", per: "/мес", desc: "Для специалистов и небольших команд." },
      pro: { name: "Pro", price: "9 900 ₽", per: "/мес", desc: "Для команд с постоянным потоком документации." },
      business: { name: "Business", price: "по договору", per: "", desc: "Объёмы, SLA и интеграции под ваш процесс." },
    },
  },
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site-content.json");

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(override)) return base;
  if (!isPlainObject(base)) return base;
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = override[key];
    result[key] = isPlainObject(baseValue) ? deepMerge(baseValue, overrideValue) : overrideValue;
  }
  return result as T;
}

let cache: SiteContent | null = null;

export async function getContent(): Promise<SiteContent> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const stored = JSON.parse(raw);
    cache = deepMerge(DEFAULT_CONTENT, stored);
  } catch {
    cache = DEFAULT_CONTENT;
  }
  return cache;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
  cache = content;
}
