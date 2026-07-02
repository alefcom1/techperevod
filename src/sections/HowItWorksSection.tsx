import React from "react";
import { StackedSteps } from "@/components/marketing/StackedSteps";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";

/**
 * «Четыре шага до готового перевода» — блок в концепции Crowdin
 * "fits seamlessly into your development workflow": слева sticky-заголовок,
 * справа карточки шагов, растворяющиеся при скролле (StackedSteps).
 */
export interface HowItWorksSectionProps {
  subtitle?: string;
}

export function HowItWorksSection({
  subtitle = "Платформа встраивается в ваш процесс работы с документацией: от загрузки файла до сдачи в исходном формате — с AI-оркестрацией и проверкой инженером.",
}: HowItWorksSectionProps) {
  return (
    <section className="tp-section" id="how">
      <div className="tp-section__inner">
        <StackedSteps
          aside={
            <>
              <h2 className="tp-section-header__title" style={{ fontSize: "var(--tp-text-h1)", lineHeight: "var(--tp-leading-display)" }}>
                Четыре шага <span className="tp-hero__title-accent">до готового перевода</span>
              </h2>
              <p className="tp-section-header__subtitle">{subtitle}</p>
              <div>
                <Button variant="ghost" as="a" href="/perevodchik">
                  Попробовать бесплатно →
                </Button>
              </div>
            </>
          }
          steps={[
            {
              title: "Загрузка",
              description:
                "Загрузите документ любого формата — от DOCX до чертежа DWG. AI сразу оценивает объём и срок.",
              rows: [
                { icon: <Icon name="cloud-upload" size={20} color="var(--tp-primary)" />, text: "Файл принят — 65+ форматов" },
                { icon: <Icon name="file-text" size={20} color="var(--tp-accent)" />, text: "Сегменты извлечены" },
                { icon: <Icon name="check" size={20} color="var(--tp-primary)" />, text: "Оценка объёма и срока за 2 минуты" },
              ],
            },
            {
              title: "AI-оркестрация",
              description:
                "Роутер выбирает лучшую модель под языковую пару и тип документа — среди западных и локальных моделей.",
              rows: [
                { icon: <Icon name="cpu" size={20} color="var(--tp-primary)" />, text: "GPT, Claude, DeepL" },
                { icon: <Icon name="globe" size={20} color="var(--tp-accent)" />, text: "YandexGPT, DeepSeek" },
                { icon: <Icon name="gauge" size={20} color="var(--tp-primary)" />, text: "Выбор модели — с объяснением" },
              ],
            },
            {
              title: "Редактор-инженер",
              description:
                "AI-черновик проверяет редактор с профильным образованием — терминология и смысл под контролем.",
              rows: [
                { icon: <Icon name="database" size={20} color="var(--tp-primary)" />, text: "Термбаза клиента подставлена" },
                { icon: <Icon name="user-check" size={20} color="var(--tp-accent)" />, text: "Проверка терминологии" },
                { icon: <Icon name="shield-check" size={20} color="var(--tp-primary)" />, text: "Смысл сверен с оригиналом" },
              ],
            },
            {
              title: "Сдача",
              description:
                "Готовый файл — с сохранением исходной вёрстки, таблиц и чертежей. В срок, в вашем формате.",
              rows: [
                { icon: <Icon name="package-check" size={20} color="var(--tp-primary)" />, text: "Исходный формат сохранён" },
                { icon: <Icon name="file-text" size={20} color="var(--tp-accent)" />, text: "Вёрстка и разметка без потерь" },
                { icon: <Icon name="check" size={20} color="var(--tp-primary)" />, text: "Память переводов пополнена" },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
