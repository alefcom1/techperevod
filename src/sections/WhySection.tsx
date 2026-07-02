import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * «Почему techperevod» — по формату Taia «Why Taia?»: три насыщенные
 * карточки-ссылки (иконка + заголовок + тезис + чек-лист полными
 * предложениями). Вобрал в себя прежний «AI-набор»: все шесть его
 * возможностей распределены по буллетам трёх карточек.
 */
const CARDS = [
  {
    href: "/product/orchestrator",
    icon: "cpu",
    title: "AI-перевод, который понимает контекст",
    claim: "Точнее, чем одна универсальная модель",
    bullets: [
      "Документ переводится целиком, а не по предложениям — формулировки согласованы от первой страницы до последней",
      "Роутер выбирает модель под языковую пару и тип документа: GPT, Claude, DeepL, YandexGPT или DeepSeek — и объясняет выбор",
      "Числа, единицы измерения и теги разметки проверяются автоматически до передачи редактору",
      "Объём, стоимость и срок вы видите через 2 минуты после загрузки файла",
    ],
  },
  {
    href: "/product/terminology",
    icon: "database",
    title: "Термбаза, память переводов и глоссарии",
    claim: "Терминология под контролем — и принадлежит вам",
    bullets: [
      "Глоссарий подставляется до генерации текста, поэтому «обратный клапан» не превращается в «возвратный вентиль»",
      "Повторяющиеся сегменты автоматически дешевле — скидка по памяти переводов видна ещё до оплаты",
      "Термбаза и память переводов — собственность клиента: экспорт в любой момент, без привязки к платформе",
      "Одна и та же терминология используется и AI-моделями, и редактором-человеком",
    ],
  },
  {
    href: "/tarify",
    icon: "user-check",
    title: "Инженеры и носители языка по запросу",
    claim: "Человек — там, где цена ошибки высока",
    bullets: [
      "Редактор с профильным образованием сверяет термины, обозначения и смысл с оригиналом",
      "Носитель языка вычитывает публичные и маркетинговые материалы до естественного звучания",
      "Заказ в один клик из кабинета — от 1,5 ₽ за слово, срок от 24 часов",
      "Подходит для регуляторных документов, патентов, чертежей и инструкций по безопасности",
    ],
  },
];

export function WhySection() {
  return (
    <section className="tp-section" id="why">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader
            title="Почему techperevod"
            subtitle="Единственная платформа, где в одном конвейере работают AI-оркестратор нескольких моделей, ваша собственная терминология и живые инженеры-редакторы."
          />
        </ScrollReveal>
        <div className="tp-why">
          {CARDS.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 90}>
              <Link href={card.href} className="tp-why__card">
                <span className="tp-why__icon">
                  <Icon name={card.icon} size={26} />
                </span>
                <h3 className="tp-why__title">{card.title}</h3>
                <p className="tp-why__claim">{card.claim}</p>
                <ul className="tp-why__list">
                  {card.bullets.map((b) => (
                    <li key={b}>
                      <Icon name="check" size={18} color="var(--tp-accent)" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <span className="tp-why__more">Подробнее →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
