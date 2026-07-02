/* HowItWorksSection — section 2. Uses ScrollSteps (Crowdin-style: sticky
   right panel stays fixed, left step list shrinks/fades as you scroll). */
const { SectionHeader, ScrollSteps, ScrollReveal, Icon } = window.TechperevodDesignSystem_4028dd;

function HowItWorksSection() {
  return (
    <section className="tp-section" id="how">
      <div className="tp-section__inner">
        <ScrollReveal><SectionHeader title="Четыре шага до готового перевода" /></ScrollReveal>
        <ScrollSteps
          steps={[
            {
              icon: <Icon name="cloud-upload" />,
              title: "Загрузка",
              description: "Загрузите документ любого формата — от DOCX до чертежа DWG. AI сразу оценивает объём и срок.",
              bullets: ["65+ форматов", "Drag-and-drop", "Оценка за 2 минуты"],
            },
            {
              icon: <Icon name="cpu" />,
              title: "AI-оркестрация",
              description: "Роутер выбирает лучшую модель под языковую пару и тип документа — среди западных и локальных моделей.",
              bullets: ["GPT, Claude, DeepL", "YandexGPT, DeepSeek"],
            },
            {
              icon: <Icon name="user-check" />,
              title: "Редактор-инженер",
              description: "AI-черновик проверяет редактор с профильным образованием — терминология и смысл под контролем.",
              bullets: ["Термбаза клиента", "Проверка терминологии"],
            },
            {
              icon: <Icon name="package-check" />,
              title: "Сдача",
              description: "Готовый файл — с сохранением исходной верстки, вёрстки таблиц и чертежей.",
              bullets: ["Исходный формат", "Без потери разметки"],
            },
          ]}
        />
      </div>
    </section>
  );
}

window.HowItWorksSection = HowItWorksSection;
