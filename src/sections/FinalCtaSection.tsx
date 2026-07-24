import React from "react";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { ScrollReveal } from "@/components/core/ScrollReveal";

/**
 * Финальный CTA главной: стеклянная карточка в стиле .tp-about-cta —
 * последний шаг воронки после тарифов, ведёт на /kontakty.
 */
export function FinalCtaSection() {
  return (
    <section className="tp-section" id="final-cta">
      <div className="tp-section__inner">
        <ScrollReveal>
          <Card variant="glass" className="tp-about-cta">
            <div>
              <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                Остались вопросы?
              </div>
              <p className="tp-value-card__desc">
                Пришлите документ — оценим за 2 минуты и покажем разницу уровней на вашем тексте.
              </p>
            </div>
            <Button size="lg" variant="primary" as="a" href="#zakaz">
              Получить оценку
            </Button>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
