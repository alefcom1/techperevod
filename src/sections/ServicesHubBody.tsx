import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { SERVICES } from "@/data/services";

const SITE_URL = "https://techperevod.com";

const FAQ = [
  {
    q: "У нас документ смешанного типа — например, чертёж внутри инструкции. Как оформить заказ?",
    a: "Загрузите весь пакет как есть — не нужно самостоятельно делить документы по типам. Мы разберём комплект, назначим на чертежи и таблицы инженера с опытом в CAD-форматах, а на текстовые разделы — редактора нужного профиля, и вернём готовый комплект в исходной структуре.",
  },
  {
    q: "Не нашли свой тип документа в списке — переводите ли вы его?",
    a: "Скорее всего да: семь направлений выше — это самые частые и самые «рискованные» с точки зрения машинного перевода типы документов, а не исчерпывающий список. Мы переводим и договоры, презентации, техническую переписку, стандарты предприятия — пришлите документ на /kontakty, посмотрим объём и формат и дадим оценку в течение рабочего дня.",
  },
  {
    q: "Можно ли заказать перевод на несколько языков сразу?",
    a: "Да. Большинство заказов у нас — это пары с русским (китайский, английский, немецкий и другие языки на русский или обратно), но при необходимости переводим один документ сразу на несколько целевых языков параллельно, с общей термбазой между версиями, чтобы термины не расходились.",
  },
  {
    q: "Чем ваш перевод отличается от Google Translate или DeepL для такого объёма документов?",
    a: "Черновик действительно может подготовить AI — это ускоряет работу. Разница в том, что дальше: черновик проверяет инженер-редактор профильной специальности, термины фиксируются в термбазе конкретно под вашу компанию, а формат документа (вёрстка Word, слои DWG, структура XLIFF) сохраняется автоматически. Плюс — конфиденциальность: документы обрабатываются на серверах в России, доступ ограничен закреплённым редактором, при необходимости подписываем NDA за 2 часа — подробности на странице /bezopasnost.",
  },
];

/** JSON-LD FAQPage для хаба услуг. */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** JSON-LD BreadcrumbList: Главная → Услуги. */
function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
    ],
  };
}

/**
 * Хаб-страница /uslugi — индекс всех услуг из data/services.ts. Каждая
 * карточка ведёт на свою SEO-страницу /uslugi/[slug] (ServicePageBody);
 * сама страница статична, без admin-content-store — как и дочерние.
 */
export function ServicesHubBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Услуги
          </span>
        }
        badge={<Badge tone="primary">{SERVICES.length} направлений</Badge>}
        icon={<Icon name="package-check" size={26} />}
        title="Услуги перевода технической документации"
        subtitle="Документы, чертежи, ПО и регуляторные досье — на 15+ языковых парах, с проверкой инженером-носителем профильной специальности."
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      <section className="tp-section" style={{ paddingTop: 0 }}>
        <div className="tp-section__inner">
          <ScrollReveal>
            <ProductWindow url="app.techperevod.com/uslugi">
              <div className="tp-routing-row">
                <span className="tp-routing-row__doc">patent-claims.pdf</span>
                <Badge tone="accent" size="sm">
                  Патентный специалист
                </Badge>
                <span className="tp-routing-row__reason">формула изобретения проверена</span>
              </div>
              <div className="tp-routing-row">
                <span className="tp-routing-row__doc">pump-manual.docx</span>
                <Badge tone="primary" size="sm">
                  Инженер-механик
                </Badge>
                <span className="tp-routing-row__reason">термбаза применена</span>
              </div>
              <div className="tp-routing-row">
                <span className="tp-routing-row__doc">sds-safety-sheet.pdf</span>
                <Badge tone="accent" size="sm">
                  Редактор-химик
                </Badge>
                <span className="tp-routing-row__reason">H- и P-фразы сверены с ГОСТ</span>
              </div>
            </ProductWindow>
          </ScrollReveal>
        </div>
      </section>

      {/* Вводный SEO-текст */}
      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              <p>
                «Технический перевод» — слишком широкое понятие, чтобы быть одной услугой: перевод
                чертежа в DWG и перевод патентной заявки требуют разных специалистов, разных
                инструментов и разных проверок, хотя формально это один и тот же «технический
                текст». Чертёж нельзя пропустить через тот же процесс, что инструкцию по
                эксплуатации, — там нет цельных предложений, зато есть привязка текста к слоям и
                блокам, которую нельзя разрушить. Патентная заявка требует единообразия терминов в
                формуле изобретения до последнего зависимого пункта, а паспорт безопасности —
                стандартных H- и P-фраз по утверждённым формулировкам СГС, которые нельзя
                переводить «своими словами».
              </p>
              <p>
                Поэтому вместо одной универсальной формы заявки мы выделили семь направлений — по
                типу документа и по языковой паре, где риск машинного перевода особенно высок.
                Каждое закрывает свой набор форматов, свои проверки и своего специалиста-редактора:
                инженера-механика для документации к оборудованию, патентного специалиста для
                заявок, редактора-химика для SDS. Выберите направление, ближе всего к вашей задаче,
                — или пришлите документ на{" "}
                <Link href="/kontakty">страницу контактов</Link>, если он не укладывается ни в одно
                из них: оценим отдельно.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Сетка всех услуг из SERVICES */}
      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Все направления" />
          </ScrollReveal>
          <div className="tp-service-features">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 60} as="div">
                <Link
                  href={`/uslugi/${svc.slug}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <Card padding="lg" interactive className="tp-value-card" style={{ height: "100%" }}>
                    <div className="tp-value-card__icon">
                      <Icon name={svc.iconName} size={22} />
                    </div>
                    <div className="tp-value-card__title">{svc.name}</div>
                    <p className="tp-value-card__desc">{svc.heroSubtitle}</p>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Частые вопросы" />
          </ScrollReveal>
          <div className="tp-faq">
            {FAQ.map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 50} as="div">
                <details className="tp-faq__item">
                  <summary className="tp-faq__q">
                    <span>{item.q}</span>
                    <Icon name="arrow-right" size={18} className="tp-faq__chevron" />
                  </summary>
                  <p className="tp-faq__a">{item.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Не знаете, к какой услуге отнести документ?
                </div>
                <p className="tp-value-card__desc">
                  Загрузите файл — увидите тип обработки, стоимость и срок, даже если это смешанный
                  или нестандартный документ.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="#zakaz">
                Получить оценку
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
