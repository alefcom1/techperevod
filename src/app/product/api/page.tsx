import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Button } from "@/components/core/Button";

export const metadata: Metadata = {
  title: "API технического перевода",
  description:
    "REST API платформы techperevod: перевод текста и документов из вашего кода, с оркестрацией моделей и термбазой. Доступен на тарифах Pro и Business.",
  alternates: { canonical: "/product/api" },
  openGraph: { title: "API | techperevod.com", url: "/product/api", type: "website" },
};

const EXAMPLE = `POST /v1/translate HTTP/1.1
Host: api.techperevod.com
Authorization: Bearer tp_live_xxx
Content-Type: application/json

{
  "source": "ru",
  "target": "en",
  "glossary_id": "gls_9f2c",
  "text": "Перед запуском насоса переведите клапан
           в положение «закрыто»."
}

HTTP/1.1 200 OK
{
  "translation": "Before starting the pump, set the
                  valve to the \\"closed\\" position.",
  "model": "deepl",
  "words": 11
}`;

const POINTS = [
  { icon: "plug-zap", title: "Простая интеграция", desc: "Один REST-эндпоинт для текста и документов. Ключи и квоты — в кабинете." },
  { icon: "cpu", title: "Та же оркестрация", desc: "API использует тот же роутер моделей и термбазу, что и кабинет — качество не отличается." },
  { icon: "shield-check", title: "Предсказуемые лимиты", desc: "Квота в словах общая с тарифом. Ответы включают счётчик расхода." },
];

export default function ApiPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Платформа / API
          </span>
        }
        icon={<Icon name="plug-zap" size={26} />}
        title="API технического перевода"
        subtitle="Встройте перевод с оркестрацией моделей и термбазой прямо в ваш продукт или пайплайн документации."
        ctaHref="/tarify"
        ctaLabel="Доступен с тарифа Pro"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <ProductWindow url="api.techperevod.com/v1/translate">
              <pre
                className="tp-mono"
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--tp-text)",
                  whiteSpace: "pre-wrap",
                  overflowX: "auto",
                }}
              >
                {EXAMPLE}
              </pre>
            </ProductWindow>
          </ScrollReveal>
          <p style={{ textAlign: "center", color: "var(--tp-text-muted)", fontSize: 13 }}>
            * спецификация иллюстративная — финальная документация публикуется с запуском API
          </p>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что внутри" />
          </ScrollReveal>
          <div className="tp-app__grid">
            {POINTS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 70}>
                <Card padding="lg" className="tp-value-card">
                  <div className="tp-value-card__icon">
                    <Icon name={p.icon} size={22} />
                  </div>
                  <div className="tp-value-card__title">{p.title}</div>
                  <p className="tp-value-card__desc">{p.desc}</p>
                </Card>
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
                  Нужен API под ваш объём?
                </div>
                <p className="tp-value-card__desc">Расскажите о задаче — подберём тариф и лимиты.</p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/kontakty">
                Связаться с нами
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}
