/* B2BSection — section 8 */
const { SectionHeader, Card, Icon, ScrollReveal } = window.TechperevodDesignSystem_4028dd;

const ITEMS = [
  { icon: "shield-check", text: "NDA за 2 часа" },
  { icon: "plug-zap", text: "API-интеграция в ваш процесс" },
  { icon: "database", text: "Корпоративная термбаза" },
  { icon: "user-round", text: "Выделенный менеджер" },
];

function B2BSection() {
  return (
    <section className="tp-section" id="b2b">
      <div className="tp-section__inner">
        <ScrollReveal><SectionHeader title="Для корпоративных заказчиков" /></ScrollReveal>
        <div className="tp-b2b-grid">
          {ITEMS.map((it, i) => (
            <ScrollReveal key={it.text} delay={i * 70}>
              <Card padding="md" className="tp-b2b-item">
                <Icon name={it.icon} color="var(--tp-accent)" size={24} />
                <span>{it.text}</span>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.B2BSection = B2BSection;
