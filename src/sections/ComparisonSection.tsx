import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * «По старинке vs techperevod» — блок по мотивам Crowdin «Why old localization
 * fails»: слева нейтральная панель с болями, справа тёмная акцентная панель
 * с решением.
 */
const OLD_WAY = [
  {
    title: "Файлы по почте",
    desc: "Версии теряются в переписке, статус заказа неизвестен, «финальный_v7_правки2.docx» живёт своей жизнью.",
  },
  {
    title: "Excel с терминами",
    desc: "Терминология расходится от заказа к заказу: один переводчик пишет «привод», другой — «актуатор».",
  },
  {
    title: "Недели ожидания",
    desc: "Оценка стоимости — днями, перевод — неделями. Релиз документации стоит и ждёт.",
  },
  {
    title: "Оплата за всё подряд",
    desc: "Повторяющиеся абзацы и типовые фразы оплачиваются заново в каждом заказе.",
  },
];

const NEW_WAY = [
  {
    title: "Оценка за 2 минуты",
    desc: "Загрузили файл — сразу видите объём, стоимость и срок. Без звонков и ожидания менеджера.",
  },
  {
    title: "AI-оркестрация моделей",
    desc: "Роутер сам выбирает лучшую модель под языковую пару и тип документа — и объясняет выбор.",
  },
  {
    title: "Термбаза и память переводов",
    desc: "Терминология едина во всех заказах, повторы автоматически дешевле — скидка видна до оплаты.",
  },
  {
    title: "Инженер отвечает за смысл",
    desc: "Финальную проверку делает редактор с профильным образованием — там, где цена ошибки высока.",
  },
];

export function ComparisonSection() {
  return (
    <section className="tp-section" id="compare">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader
            title="Перевод по старинке против платформы"
            subtitle="Почему «отправить файл в бюро и ждать» больше не работает для технической документации."
          />
        </ScrollReveal>
        <div className="tp-compare">
          <ScrollReveal>
            <div className="tp-compare__panel tp-compare__panel--old">
              <h3 className="tp-compare__title">Перевод без системы — это боль</h3>
              <div className="tp-compare__items">
                {OLD_WAY.map((item) => (
                  <div className="tp-compare__item" key={item.title}>
                    <Icon name="arrow-right" size={22} color="var(--tp-text-muted)" />
                    <div>
                      <h4 className="tp-compare__item-title">{item.title}</h4>
                      <p className="tp-compare__item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="tp-compare__panel tp-compare__panel--new">
              <h3 className="tp-compare__title">Как это устроено в techperevod</h3>
              <div className="tp-compare__items">
                {NEW_WAY.map((item) => (
                  <div className="tp-compare__item" key={item.title}>
                    <Icon name="arrow-right" size={22} color="var(--tp-accent)" />
                    <div>
                      <h4 className="tp-compare__item-title">{item.title}</h4>
                      <p className="tp-compare__item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
