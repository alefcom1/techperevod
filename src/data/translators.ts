/** Контент страницы /perevodchikam — набор переводчика в команду бюро. */

export interface TranslatorBenefit {
  iconName: string;
  title: string;
  desc: string;
}

export const TRANSLATOR_BENEFITS: TranslatorBenefit[] = [
  {
    iconName: "cpu",
    title: "AI снимает рутину",
    desc: "Черновик собирает термбаза и AI-оркестратор — вы редактируете и доводите смысл, а не набираете текст с нуля.",
  },
  {
    iconName: "user-check",
    title: "Профильная специализация",
    desc: "Заказы подбираются под вашу отрасль и языковую пару — не разноплановый поток, а документация, в которой вы разбираетесь.",
  },
  {
    iconName: "shield-check",
    title: "Прозрачная оплата",
    desc: "Ставка за страницу известна заранее, без вычетов «за правки». Регулярные выплаты по графику.",
  },
  {
    iconName: "clock",
    title: "Гибкий график",
    desc: "Удалённая работа, сами выбираете загрузку — от подработки до полной занятости.",
  },
  {
    iconName: "sparkles",
    title: "Профессиональный рост",
    desc: "Обратная связь редакторов, доступ к отраслевым термбазам, работа с реальными промышленными клиентами.",
  },
  {
    iconName: "globe",
    title: "Стабильный поток заказов",
    desc: "Клиенты из промышленности, IT и инжиниринга — заказы поступают регулярно, не разово.",
  },
];

export interface TranslatorStep {
  iconName: string;
  title: string;
  description: string;
  bullets: string[];
}

export const TRANSLATOR_STEPS: TranslatorStep[] = [
  {
    iconName: "file-text",
    title: "Анкета и тест",
    description: "Заполняете анкету, указываете языковые пары и проходите короткий AI-тест по каждой из них.",
    bullets: ["10 вопросов на язык", "Результат виден сразу"],
  },
  {
    iconName: "user-check",
    title: "Проверка редактором",
    description: "Наш редактор смотрит анкету и результаты теста, при необходимости уточняет детали.",
    bullets: ["Ответ в течение нескольких рабочих дней"],
  },
  {
    iconName: "database",
    title: "Доступ в ТМС",
    description: "После одобрения вы получаете доступ к системе управления заказами — видите доступные проекты по своей специализации.",
    bullets: ["Заказы по вашим языкам и отраслям"],
  },
  {
    iconName: "cpu",
    title: "Работа над заказом",
    description: "Берёте заказ, дорабатываете AI-черновик или переводите с нуля, сдаёте в срок через ТМС.",
    bullets: ["Термбаза отрасли под рукой", "Поддержка редактора при вопросах"],
  },
  {
    iconName: "shield-check",
    title: "Оплата",
    description: "Сданные и принятые заказы оплачиваются по графику, ставка известна ещё на этапе взятия заказа в работу.",
    bullets: [],
  },
];

export const TRANSLATOR_REQUIREMENTS: string[] = [
  "Профильное лингвистическое или инженерное образование (диплом можно приложить к анкете)",
  "Опыт письменного технического перевода от 2 лет",
  "Уверенное владение хотя бы одной языковой парой на уровне C1 и выше",
  "Внимательность к терминологии, числам и единицам измерения",
  "Знание CAT-инструментов приветствуется (SDL Trados, memoQ и т.п.)",
];

export const LANGUAGE_OPTIONS = ["Английский", "Немецкий", "Китайский", "Испанский", "Французский"];

export const LEVELS = [
  { value: "A1", label: "A1", desc: "Начальный" },
  { value: "A2", label: "A2", desc: "Элементарный" },
  { value: "B1", label: "B1", desc: "Средний" },
  { value: "B2", label: "B2", desc: "Выше среднего" },
  { value: "C1", label: "C1", desc: "Продвинутый" },
  { value: "C2", label: "C2", desc: "Профессиональный" },
  { value: "Native", label: "★", desc: "Родной язык" },
];

export const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Полная занятость" },
  { value: "part_time", label: "Частичная занятость" },
  { value: "freelance", label: "Фриланс / по заказам" },
];

export const WORK_TYPES = [
  { value: "remote", label: "Удалённо" },
  { value: "office", label: "В офисе" },
  { value: "hybrid", label: "Гибридно" },
];

export const URGENT_WORK_OPTIONS = [
  { value: "yes", label: "Да, готов(а)" },
  { value: "no", label: "Нет" },
  { value: "negotiable", label: "По согласованию" },
];

export const PUNCTUALITY_OPTIONS = [
  { value: "5", label: "5 — всегда в срок" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1 — часто задерживаю" },
];
