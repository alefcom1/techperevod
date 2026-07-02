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
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta["product/terminology"];
  return {
    title,
    description,
    alternates: { canonical: "/product/terminology" },
    openGraph: { title: `${title} | techperevod.com`, url: "/product/terminology", type: "website" },
  };
}

const ROWS = [
  { ru: "привод", en: "actuator", uses: 24 },
  { ru: "клапан обратный", en: "check valve", uses: 17 },
  { ru: "гидравлический удар", en: "hydraulic shock", uses: 9 },
];

const POINTS = [
  { icon: "database", title: "Принадлежит вам", desc: "Глоссарий и TM — собственность клиента. Экспорт в любой момент, без привязки к платформе." },
  { icon: "check", title: "Скидка за повторы", desc: "Повторяющиеся сегменты считаются автоматически — скидка по TM видна до оплаты заказа." },
  { icon: "user-check", title: "Единая терминология", desc: "Термин, утверждённый один раз, подставляется во все будущие переводы — и для AI, и для редактора." },
];

export default function TerminologyPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Платформа / Термбаза и TM
          </span>
        }
        icon={<Icon name="database" size={26} />}
        title="Термбаза и память переводов"
        subtitle="Ваша терминология под контролем: глоссарий на каждого клиента, автоматический учёт повторов и прозрачная скидка."
        ctaHref="/tarify"
        ctaLabel="Смотреть тарифы"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ProductWindow url="app.techperevod.com/glossary">
            <div className="tp-glossary__toolbar">
              <span className="tp-glossary__savings">Повторы: 18% · Скидка по TM: −12 400 ₽</span>
            </div>
            <table className="tp-glossary__table">
              <thead>
                <tr>
                  <th>Термин (RU)</th>
                  <th>Перевод (EN)</th>
                  <th>Повторов</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.ru}>
                    <td className="tp-mono">{r.ru}</td>
                    <td className="tp-mono">{r.en}</td>
                    <td>{r.uses}</td>
                  </tr>
                ))}
                <tr className="tp-glossary__more">
                  <td colSpan={3}>+ 214 терминов в базе клиента</td>
                </tr>
              </tbody>
            </table>
          </ProductWindow>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Зачем это вашей команде" />
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
                  Термбаза без лимита — в тарифе Pro
                </div>
                <p className="tp-value-card__desc">В Start входит 1 глоссарий; Pro снимает ограничения и добавляет API.</p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/tarify">
                Сравнить тарифы
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}
