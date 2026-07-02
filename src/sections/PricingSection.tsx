import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { PricingCard } from "@/components/marketing/PricingCard";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";

export function PricingSection() {
  return (
    <section className="tp-section tp-section--tint" id="pricing">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title="Три уровня — вы платите за нужную глубину" />
        </ScrollReveal>
        <div className="tp-pricing-grid">
          <ScrollReveal delay={0}>
            <PricingCard
              name="Full"
              description="Перевод + редактура инженером. Максимальное качество."
              features={["Перевод инженером-переводчиком", "Полная редактура", "Персональная термбаза"]}
            />
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <PricingCard
              name="MTPE"
              featured
              badge={<Badge tone="accent">Популярный</Badge>}
              description="AI-черновик + доводка человеком. Быстрее и дешевле."
              features={["AI-оркестрация черновика", "Правка инженером-редактором", "Экономия 30–40%"]}
            />
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <PricingCard
              name="Express"
              description="Срочная сдача, приоритетная очередь."
              features={["Приоритетная очередь", "Сдача от 24 часов", "Доплата за срочность"]}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
