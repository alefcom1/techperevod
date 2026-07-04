import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * Сравнение платформы с онлайн-переводчиками и классическими бюро.
 * Объединяет наш прежний блок «по старинке vs платформа» (его боли стали
 * вводным текстом) с таблицей в духе Taia «vs Traditional Solutions».
 */

type Cell = { kind: "yes" | "no"; note?: string } | { kind: "text"; note: string };

const yes = (note?: string): Cell => ({ kind: "yes", note });
const no = (note?: string): Cell => ({ kind: "no", note });
const text = (note: string): Cell => ({ kind: "text", note });

const ROWS: { feature: string; us: Cell; online: Cell; agency: Cell }[] = [
  {
    feature: "Понимание контекста документа",
    us: yes("документ целиком + термбаза"),
    online: no("перевод по абзацам"),
    agency: yes(),
  },
  {
    feature: "Ваша терминология и глоссарий",
    us: yes("подставляется до генерации"),
    online: no(),
    agency: text("за доплату, ведётся вручную"),
  },
  {
    feature: "Память переводов и скидка за повторы",
    us: yes("скидка видна до оплаты"),
    online: no(),
    agency: text("редко и непрозрачно"),
  },
  {
    feature: "Вёрстка DOCX, PDF, DWG сохраняется",
    us: yes("65+ форматов"),
    online: no("только текст"),
    agency: yes("часто за доплату"),
  },
  {
    feature: "Проверка инженером-редактором",
    us: yes("по запросу, от 1,5 ₽/слово"),
    online: no(),
    agency: yes(),
  },
  {
    feature: "Оценка стоимости и срока",
    us: text("2 минуты, автоматически"),
    online: text("не считается"),
    agency: text("1–2 рабочих дня"),
  },
  {
    feature: "Срок готовности перевода",
    us: text("минуты — часы"),
    online: text("мгновенно, но черновик"),
    agency: text("дни — недели"),
  },
  {
    feature: "API для интеграции в ваш процесс",
    us: yes("с тарифа «Про»"),
    online: text("у части сервисов"),
    agency: no(),
  },
  {
    feature: "Конфиденциальность и NDA",
    us: yes("NDA за 2 часа"),
    online: no("текст уходит в публичный сервис"),
    agency: yes(),
  },
];

function CellView({ cell }: { cell: Cell }) {
  if (cell.kind === "text") return <span>{cell.note}</span>;
  return (
    <span className="tp-vs__cell">
      <span className={`tp-vs__mark tp-vs__mark--${cell.kind}`}>
        <Icon name={cell.kind === "yes" ? "check" : "x"} size={14} />
      </span>
      {cell.note ? <span>{cell.note}</span> : null}
    </span>
  );
}

export interface ComparisonSectionProps {
  title?: string;
  subtitle?: string;
}

export function ComparisonSection({
  title = "Онлайн-переводчик, бюро переводов или платформа?",
  subtitle = "Честное сравнение трёх способов перевести техническую документацию — по пунктам, которые действительно влияют на результат.",
}: ComparisonSectionProps) {
  return (
    <section className="tp-section" id="compare">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </ScrollReveal>

        <ScrollReveal>
          <div className="tp-compare-intro">
            <p>
              Технический перевод обычно делают одним из двух способов. Быстрый — вставить текст в онлайн-переводчик:
              бесплатно и мгновенно, но Google Translate и DeepL не знают вашу терминологию, теряют вёрстку чертежей и
              таблиц, а конфиденциальный документ отправляется в публичный сервис. Надёжный — заказать перевод в бюро:
              качество выше, но оценка занимает день-два, сам перевод — недели, а повторяющиеся абзацы регламентов вы
              оплачиваете заново в каждом заказе.
            </p>
            <p>
              <strong>Техперевод объединяет сильные стороны обоих подходов.</strong> AI-оркестратор переводит документ
              за минуты и подставляет вашу термбазу ещё до генерации текста, память переводов автоматически снижает
              стоимость повторов, а редактор с инженерным образованием проверяет смысл там, где цена ошибки высока.
              Файл возвращается в исходном формате — от DOCX до чертежа DWG.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="tp-vs">
            <table>
              <thead>
                <tr>
                  <th>Возможность</th>
                  <th className="tp-vs__us">
                    Техперевод
                    <small>AI-оркестратор + инженер</small>
                  </th>
                  <th>
                    Онлайн-переводчики
                    <small>Google Translate, DeepL</small>
                  </th>
                  <th>
                    Классическое бюро
                    <small>перевод «под ключ» вручную</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className="tp-vs__us">
                      <CellView cell={row.us} />
                    </td>
                    <td>
                      <CellView cell={row.online} />
                    </td>
                    <td>
                      <CellView cell={row.agency} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
