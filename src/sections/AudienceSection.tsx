"use client";

import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * «Кому подходит платформа» — по формату Taia «Who Is Taia For?»: табы
 * аудиторий и панель с живым описанием, чек-листом и ссылками. Объединяет
 * прежние «Специализацию по отраслям» (ссылки на отраслевые страницы живут
 * в первом табе) и «Для корпоративных заказчиков» (стал третьим табом).
 * id="industries" сохранён — на него ведёт пункт меню «Отрасли».
 */
const AUDIENCES = [
  {
    id: "industry",
    tab: "Производство и инжиниринг",
    icon: "cog",
    eyebrow: "Подходит идеально",
    heading: "Заводам, проектным институтам и инжиниринговым компаниям",
    text: "Руководства по эксплуатации, чертежи, технические условия и паспорта безопасности — документы, где ошибка в термине стоит дорого. Платформа сохраняет вёрстку DWG и PDF, держит ГОСТ-терминологию в термбазе, а редактор с отраслевым образованием следит, чтобы «обратный клапан» не превратился в «возвратный вентиль». Повторяющиеся разделы регламентов автоматически дешевле за счёт памяти переводов.",
    bullets: [
      "Чертежи и схемы P&ID с сохранением разметки",
      "ГОСТ- и отраслевая терминология в термбазе",
      "Редактор с инженерным образованием",
      "Скидка за повторы в типовых регламентах",
    ],
    links: [
      { label: "Нефтегаз и энергетика", href: "/otrasli/neftegaz" },
      { label: "Машиностроение", href: "/otrasli/mashinostroenie" },
      { label: "Медтех и фарма", href: "/otrasli/medteh" },
      { label: "IT и SaaS", href: "/otrasli/it-saas" },
    ],
  },
  {
    id: "it",
    tab: "IT-команды и разработчики",
    icon: "cpu",
    eyebrow: "Локализация без боли",
    heading: "Продуктовым командам, которые выходят на новые рынки",
    text: "Строки интерфейса, документация API и справочные центры переводятся без ломки плейсхолдеров, переменных и Markdown-разметки. Подключите API платформы к своему пайплайну — и переводите строки прямо из CI, а термбаза сохранит единые названия функций и экранов во всех релизах. Для быстрых проверок у команды всегда есть бесплатный онлайн-переводчик.",
    bullets: [
      "JSON, YAML, XLIFF, PO и Markdown",
      "Плейсхолдеры и переменные не ломаются",
      "API — перевод из вашего кода и CI",
      "Единая терминология во всех релизах",
    ],
    links: [
      { label: "Перевод для IT и SaaS", href: "/otrasli/it-saas" },
      { label: "API платформы", href: "/product/api" },
    ],
  },
  {
    id: "b2b",
    tab: "Корпоративные заказчики",
    icon: "shield-check",
    eyebrow: "Процесс и ответственность",
    heading: "Отделам ВЭД, закупок и технической документации",
    text: "Крупным компаниям важно не только качество перевода, но и процесс вокруг него: NDA, закрывающие документы, предсказуемые сроки и один ответственный подрядчик вместо десятка фрилансеров. Для регулярных объёмов действует подписка с фиксированной ценой, для пиковых нагрузок — приоритетная очередь Express. Корпоративная термбаза общая для всех отделов, поэтому маркетинг и производство говорят на одном языке.",
    bullets: [
      "NDA за 2 часа, закрывающие документы",
      "Выделенный менеджер и предсказуемый SLA",
      "Корпоративная термбаза для всех отделов",
      "Подписка или оплата по фактическому объёму",
    ],
    links: [
      { label: "Тарифы для команд", href: "/tarify" },
      { label: "Обсудить объём", href: "/kontakty" },
    ],
  },
];

export interface AudienceSectionProps {
  title?: string;
  subtitle?: string;
}

export function AudienceSection({
  title = "Кому подходит платформа",
  subtitle = "Командам, которым технический перевод нужен быстро, с единой терминологией и без управления несколькими подрядчиками.",
}: AudienceSectionProps) {
  const [active, setActive] = React.useState(0);
  const current = AUDIENCES[active];

  return (
    <section className="tp-section tp-section--tint" id="industries">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </ScrollReveal>
        <ScrollReveal>
          <div className="tp-audience">
            <div className="tp-audience__tabs" role="tablist">
              {AUDIENCES.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`tp-audience__tab ${i === active ? "tp-audience__tab--active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <Icon name={a.icon} size={20} />
                  {a.tab}
                </button>
              ))}
            </div>
            <div className="tp-audience__panel">
              <div>
                <p className="tp-audience__eyebrow">{current.eyebrow}</p>
                <h3 className="tp-audience__heading">{current.heading}</h3>
                <p className="tp-audience__text">{current.text}</p>
              </div>
              <div className="tp-audience__side">
                <ul className="tp-audience__list">
                  {current.bullets.map((b) => (
                    <li key={b}>
                      <Icon name="check" size={18} color="var(--tp-accent)" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="tp-audience__links">
                  {current.links.map((l) => (
                    <Link key={l.href} href={l.href} className="tp-audience__link">
                      {l.label}
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
