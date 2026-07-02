import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * «AI-набор для технического перевода» — по мотивам Crowdin «AI translation
 * suite»: сетка AI-возможностей платформы, дополняющая узкий блок оркестратора.
 */
const FEATURES = [
  {
    icon: "cpu",
    title: "Оркестрация моделей",
    desc: "GPT, Claude, DeepL, YandexGPT и DeepSeek в одном процессе — роутер выбирает лучшую под задачу.",
    tag: "с тарифа Start",
  },
  {
    icon: "sparkles",
    title: "Объяснимый выбор",
    desc: "К каждому документу — причина выбора модели: точность формулировок, качество пары, цена.",
  },
  {
    icon: "database",
    title: "Термбаза в момент перевода",
    desc: "Глоссарий подставляется до генерации, а не правится после — терминология едина с первого черновика.",
  },
  {
    icon: "gauge",
    title: "Мгновенная оценка",
    desc: "AI считает объём, повторы и срок за 2 минуты после загрузки файла — до оплаты.",
  },
  {
    icon: "check",
    title: "AI-контроль качества",
    desc: "Автопроверка чисел, единиц измерения, тегов разметки и пропусков — до передачи редактору.",
  },
  {
    icon: "plug-zap",
    title: "API для ваших процессов",
    desc: "Тот же конвейер — из вашего кода: перевод строк и документов по запросу.",
    tag: "с тарифа Pro",
  },
];

export function AiSuiteSection() {
  return (
    <section className="tp-section" id="ai-suite">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader
            title="AI-набор для технического перевода"
            subtitle="Оркестратор — это ядро. Вокруг него — всё, что превращает черновик машинного перевода в рабочую документацию."
          />
        </ScrollReveal>
        <div className="tp-suite">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 70}>
              <div className="tp-suite__card">
                <div className="tp-suite__icon">
                  <Icon name={f.icon} size={22} />
                </div>
                <div className="tp-suite__title">{f.title}</div>
                <p className="tp-suite__desc">{f.desc}</p>
                {f.tag ? (
                  <span className="tp-suite__tag">
                    <Badge tone="neutral" size="sm">
                      {f.tag}
                    </Badge>
                  </span>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
