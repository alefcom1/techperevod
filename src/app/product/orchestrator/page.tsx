import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { OrchestratorDiagram } from "@/components/marketing/OrchestratorDiagram";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { Badge } from "@/components/core/Badge";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Button } from "@/components/core/Button";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta["product/orchestrator"];
  return {
    title,
    description,
    alternates: { canonical: "/product/orchestrator" },
    openGraph: { title: `${title} | Техперевод.com`, url: "/product/orchestrator", type: "website" },
  };
}

const POINTS = [
  { icon: "cpu", title: "Оба контура моделей", desc: "Западные (GPT, Claude, DeepL) и локальные (YandexGPT, DeepSeek) — легально в одном рабочем процессе." },
  { icon: "gauge", title: "Выбор по данным", desc: "Роутер учитывает языковую пару, тип документа и стоимость — и показывает, почему выбрал модель." },
  { icon: "database", title: "Термбаза в момент перевода", desc: "Глоссарий подставляется до генерации — терминология едина во всех заказах." },
];

export default function OrchestratorPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Платформа / AI-оркестратор
          </span>
        }
        icon={<Icon name="cpu" size={26} />}
        title="AI-оркестратор"
        subtitle="Один документ — несколько моделей. Роутер направляет каждый файл в ту модель, которая переведёт его лучше и дешевле."
        ctaHref="/perevodchik"
        ctaLabel="Попробовать бесплатно"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <OrchestratorDiagram />
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Как роутер принимает решение" />
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
            <SectionHeader
              align="left"
              title="Решения роутера видны в кабинете"
              subtitle="Каждая строка — документ, выбранная модель и причина выбора. Никакого чёрного ящика."
            />
          </ScrollReveal>
          <ProductWindow url="app.techperevod.com/router">
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">patent-claims.pdf · RU→EN</span>
              <Badge tone="primary" size="sm">GPT</Badge>
              <span className="tp-routing-row__reason">юридическая точность формулировок</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">pump-manual.docx · RU→DE</span>
              <Badge tone="primary" size="sm">DeepL</Badge>
              <span className="tp-routing-row__reason">лучшее качество перевода для DE</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">tech-drawing.dwg · RU→ZH</span>
              <Badge tone="accent" size="sm">YandexGPT</Badge>
              <span className="tp-routing-row__reason">локальная модель — дешевле для ZH</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">spec-sheet.xlsx · RU→EN</span>
              <Badge tone="accent" size="sm">DeepSeek</Badge>
              <span className="tp-routing-row__reason">длинные таблицы, низкая цена</span>
            </div>
          </ProductWindow>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Оркестрация доступна с тарифа Start
                </div>
                <p className="tp-value-card__desc">От 2 900 ₽/мес — 100 000 слов с выбором лучшей модели.</p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/tarify">
                Смотреть тарифы
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}
