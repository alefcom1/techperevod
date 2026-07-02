import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

const ITEMS = [
  { icon: "shield-check", text: "NDA за 2 часа" },
  { icon: "plug-zap", text: "API-интеграция в ваш процесс" },
  { icon: "database", text: "Корпоративная термбаза" },
  { icon: "user-round", text: "Выделенный менеджер" },
];

export function B2BSection() {
  return (
    <section className="tp-section" id="b2b">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title="Для корпоративных заказчиков" />
        </ScrollReveal>
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
