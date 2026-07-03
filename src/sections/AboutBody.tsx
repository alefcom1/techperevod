import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { StatMetric } from "@/components/marketing/StatMetric";
import { Button } from "@/components/core/Button";
import { ScrollReveal } from "@/components/core/ScrollReveal";

const VALUES = [
  { icon: "gauge", title: "Скорость AI", desc: "AI-оркестратор возвращает черновик за минуты, а не дни." },
  { icon: "user-check", title: "Точность инженера", desc: "Каждый заказ проверяет редактор с профильным образованием." },
  { icon: "database", title: "Прозрачная термбаза", desc: "Глоссарий и память переводов принадлежат клиенту, а не нам." },
  { icon: "globe", title: "Оба контура моделей", desc: "Западные и локальные модели — легально, в одном процессе." },
];

export function AboutBody() {
  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / О нас
          </span>
        }
        title="Скорость AI, точность инженера"
        subtitle="Техперевод — платформа технического перевода для инженерных, IT- и промышленных компаний. Мы соединяем AI-оркестрацию моделей с редактурой инженеров-переводчиков."
        ctaHref="/#hero"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Чем мы отличаемся" />
          </ScrollReveal>
          <div className="tp-values-grid">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <Card padding="lg" className="tp-value-card">
                  <div className="tp-value-card__icon">
                    <Icon name={v.icon} size={22} />
                  </div>
                  <div className="tp-value-card__title">{v.title}</div>
                  <p className="tp-value-card__desc">{v.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-about-stats">
              <StatMetric value="40 млн+" label="слов переведено" />
              <StatMetric value="65+" label="поддерживаемых форматов" />
              <StatMetric value="4" label="отрасли специализации" />
            </div>
          </ScrollReveal>
          <p style={{ textAlign: "center", color: "var(--tp-text-muted)", fontSize: 13, marginTop: 16 }}>
            * иллюстративные показатели — заменить реальными данными
          </p>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Готовы обсудить проект?
                </div>
                <p className="tp-value-card__desc">
                  Расскажите, что нужно перевести — пришлём оценку в течение рабочего дня.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/kontakty">
                Связаться с нами
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
