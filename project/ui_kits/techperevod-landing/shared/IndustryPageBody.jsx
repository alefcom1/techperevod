/* IndustryPageBody — shared content for every /pages/industry-*.html page.
   Takes a plain `data` object (see the per-industry mount scripts) so the
   4 industry pages stay thin and only differ in content. */
const {
  SectionHeader,
  Card,
  PricingCard,
  Badge,
  IndustryCard,
  FormatChip,
  ScrollSteps,
  ScrollReveal,
  Icon,
} = window.TechperevodDesignSystem_4028dd;

function IndustryPageBody({ data, root }) {
  return (
    <React.Fragment>
      <PageHero
        breadcrumb={
          <span>
            <a href={root + "index.html"}>Главная</a> / <a href={root + "index.html#industries"}>Отрасли</a> / {data.name}
          </span>
        }
        icon={<Icon name={data.iconName} size={26} />}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref={root + "index.html#hero"}
      />

      <section className="tp-section" data-screen-label={data.slug}>
        <div className="tp-section__inner">
          <ScrollReveal><SectionHeader title="Что мы переводим" /></ScrollReveal>
          <div className="tp-doctype-grid">
            {data.docTypes.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__title">{d.title}</div>
                  <p className="tp-doctype-card__desc">{d.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal><SectionHeader title="Как проходит перевод" /></ScrollReveal>
          <ScrollSteps steps={data.steps} />
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal><SectionHeader title="Форматы, с которыми мы работаем в этой отрасли" /></ScrollReveal>
          <div className="tp-format-strip">
            {data.formats.map((f) => (
              <FormatChip key={f}>{f}</FormatChip>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal><SectionHeader title="Тарифы" subtitle="Те же три уровня, адаптированные под объём и срочность отраслевой документации" /></ScrollReveal>
          <div className="tp-pricing-grid">
            <ScrollReveal delay={0}>
              <PricingCard name="Full" description="Перевод + редактура инженером профильной специализации." features={["Инженер-переводчик по отрасли", "Полная редактура", "Персональная термбаза"]} />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <PricingCard name="MTPE" featured badge={<Badge tone="accent">Популярный</Badge>} description="AI-черновик + доводка человеком." features={["AI-оркестрация черновика", "Правка инженером", "Экономия 30–40%"]} />
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <PricingCard name="Express" description="Срочная сдача, приоритетная очередь." features={["Приоритетная очередь", "Сдача от 24 часов"]} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal><SectionHeader title="Другие отрасли" /></ScrollReveal>
          <div className="tp-industry-grid">
            {data.otherIndustries.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 70}>
                <a href={root + "pages/" + ind.slug + ".html"} style={{ textDecoration: "none", display: "block" }}>
                  <IndustryCard icon={<Icon name={ind.iconName} color="var(--tp-primary)" />} name={ind.name} />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.IndustryPageBody = IndustryPageBody;
