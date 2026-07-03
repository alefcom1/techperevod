import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Button } from "@/components/core/Button";
import { Translator } from "@/components/translator/Translator";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta.perevodchik;
  return {
    title,
    description,
    alternates: { canonical: "/perevodchik" },
    openGraph: { title: `${title} | Техперевод.com`, url: "/perevodchik", type: "website" },
  };
}

const PERKS = [
  { icon: "cpu", title: "Технический AI", desc: "Модель настроена на терминологию: сохраняет числа, единицы измерения и формат." },
  { icon: "gauge", title: "Мгновенно", desc: "Перевод за секунды, без регистрации — до 2 000 знаков за раз." },
  { icon: "shield-check", title: "Без рекламы", desc: "Никаких баннеров и продажи данных. Free-уровень платформы Техперевод." },
];

export default function TranslatorPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Переводчик
          </span>
        }
        title="Онлайн-переводчик технических текстов"
        subtitle="Бесплатно до 2 000 знаков. Для документов, больших объёмов и AI-оркестрации нескольких моделей — подписка."
        ctaHref="/tarify"
        ctaLabel="Смотреть тарифы"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <Translator />
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Чем он отличается от обычного переводчика" />
          </ScrollReveal>
          <div className="tp-app__grid">
            {PERKS.map((p, i) => (
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
                  Нужно перевести документ целиком?
                </div>
                <p className="tp-value-card__desc">
                  DOCX, PDF, DWG и ещё 60+ форматов — с сохранением вёрстки, термбазой и проверкой инженером.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/tarify">
                Выбрать тариф
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}
