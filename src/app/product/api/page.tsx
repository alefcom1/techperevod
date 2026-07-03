import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { ApiTryIt } from "@/components/marketing/ApiTryIt";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Button } from "@/components/core/Button";
import { getContent } from "@/lib/site-content";
import { DEMO_API_KEY } from "@/lib/api-keys";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta["product/api"];
  return {
    title,
    description,
    alternates: { canonical: "/product/api" },
    openGraph: { title: `${title} | Техперевод.com`, url: "/product/api", type: "website" },
  };
}

const EXAMPLE = `curl -X POST https://techperevod.com/api/v1/translate \\
  -H "Authorization: Bearer ${DEMO_API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "ru",
    "target": "en",
    "text": "Перед запуском насоса переведите клапан в положение «закрыто»."
  }'

HTTP/1.1 200 OK
{
  "translation": "Before starting the pump, set the valve to the \\"closed\\" position.",
  "model": "claude-opus-4-8",
  "words": 11
}`;

const POINTS = [
  { icon: "plug-zap", title: "Работает прямо сейчас", desc: "Демо-ключ не нужно запрашивать — вставьте его в заголовок и вызывайте API немедленно, без регистрации." },
  { icon: "cpu", title: "Та же оркестрация", desc: "API использует ту же модель и системный промпт, что и переводчик на сайте — качество не отличается." },
  { icon: "shield-check", title: "Предсказуемые лимиты", desc: "Демо-ключ — до 20 запросов в день с одного адреса. Для продакшн-ключа с более высоким лимитом напишите нам." },
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
        badge={<Badge tone="accent">Работает прямо сейчас — попробуйте ниже</Badge>}
        icon={<Icon name="plug-zap" size={26} />}
        title="API технического перевода"
        subtitle="Встройте перевод с оркестрацией моделей прямо в ваш продукт или пайплайн документации."
        ctaHref="/tarify"
        ctaLabel="Тарифы для продакшн-ключа"
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
            Демо-ключ <code className="tp-mono">{DEMO_API_KEY}</code> открыт для всех — до 20 запросов в день с
            одного адреса, без регистрации.
          </p>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader
              title="Попробуйте прямо здесь"
              subtitle="Реальный вызов POST /api/v1/translate из браузера — тот же эндпоинт, что и в примере curl выше."
            />
          </ScrollReveal>
          <ApiTryIt />
        </div>
      </section>

      <section className="tp-section">
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

      <section className="tp-section tp-section--tint">
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
