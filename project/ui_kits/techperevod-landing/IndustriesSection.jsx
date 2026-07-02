/* IndustriesSection — section 7. Cards link through to the dedicated
   industry pages under pages/. */
const { SectionHeader, IndustryCard, Icon, ScrollReveal } = window.TechperevodDesignSystem_4028dd;

const INDUSTRIES = [
  { icon: "cpu", name: "IT и SaaS", href: "pages/industry-it-saas.html" },
  { icon: "flame", name: "Нефтегаз и энергетика", href: "pages/industry-oil-gas.html" },
  { icon: "cog", name: "Машиностроение", href: "pages/industry-machinery.html" },
  { icon: "pill", name: "Медтех и фарма", href: "pages/industry-medtech.html" },
];

function IndustriesSection() {
  return (
    <section className="tp-section tp-section--tint" id="industries">
      <div className="tp-section__inner">
        <ScrollReveal><SectionHeader title="Специализация по отраслям" /></ScrollReveal>
        <div className="tp-industry-grid">
          {INDUSTRIES.map((ind, i) => (
            <ScrollReveal key={ind.name} delay={i * 70}>
              <a href={ind.href} style={{ textDecoration: "none", display: "block" }}>
                <IndustryCard icon={<Icon name={ind.icon} color="var(--tp-primary)" />} name={ind.name} />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.IndustriesSection = IndustriesSection;
