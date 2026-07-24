import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Button } from "@/components/core/Button";

export const metadata: Metadata = {
  title: "Виджет перевода сайта на лету",
  description:
    "JS-виджет переводит ваш сайт на лету, без переделки кода: вставьте один тег script, выберите языки — посетители увидят перевод сразу. PoC, открытая демонстрация.",
  alternates: { canonical: "/product/localization" },
  openGraph: { title: "Виджет перевода сайта на лету | Техперевод.com", url: "/product/localization", type: "website" },
};

const POINTS = [
  {
    icon: "globe",
    title: "Один тег script",
    desc: "Вставьте сниппет в <head> — без доступа к серверу клиента, без изменения кода страниц, без прокси и настройки DNS.",
  },
  {
    icon: "database",
    title: "Кэш по фрагментам",
    desc: "Каждый текстовый фрагмент переводится и кэшируется один раз — повторные заходы посетителей не тратят новые запросы к модели.",
  },
  {
    icon: "file-text",
    title: "Ручная правка перевода",
    desc: "Готовый AI-перевод фрагмента можно поправить в кабинете — виджет сразу начнёт отдавать вашу версию вместо автоматической.",
  },
];

export default function LocalizationProductPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Платформа / Локализация сайта
          </span>
        }
        badge={<Badge tone="accent">PoC — попробуйте живую демонстрацию</Badge>}
        icon={<Icon name="globe" size={26} />}
        title="Локализация сайта «на лету»"
        subtitle="JS-виджет обходит видимый текст страницы и переводит его в браузере посетителя — без переделки кода вашего сайта."
        ctaHref="/widget-demo.html"
        ctaLabel="Открыть демо-страницу"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <p className="tp-service-intro">
              Это ранняя версия функции (proof of concept), а не завершённый продукт — честно предупреждаем сразу.
              Подход: клиент вставляет один тег <code className="tp-mono">&lt;script&gt;</code> на свой сайт, виджет
              на лету обходит текстовые узлы страницы, переводит их через наш движок и подставляет перевод — без
              доступа к серверу клиента, без DNS и прокси-инфраструктуры. Переключатель языка — плавающая кнопка в
              углу страницы. Живой пример на реальной статической странице —{" "}
              <Link href="/widget-demo.html">/widget-demo.html</Link>, она имитирует сайт клиента с уже вставленным
              сниппетом.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Как это работает" />
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
              title="Честные ограничения PoC"
              subtitle="Что уже работает, а что осознанно не сделано на этом этапе"
            />
          </ScrollReveal>
          <ul className="tp-service-intro" style={{ textAlign: "left", maxWidth: 640, margin: "0 auto" }}>
            <li>Перевод происходит в браузере посетителя — это влияет на SEO иначе, чем серверный рендеринг перевода.</li>
            <li>Изменения контента после первого перевода страницы не отслеживаются автоматически — нужен повторный обход.</li>
            <li>Нет визуального in-context редактора — правка перевода делается в таблице в кабинете.</li>
            <li>Нет собственного поддомена/прокси (модель Weglot) — вставка через JS-сниппет.</li>
          </ul>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Попробовать на своём сайте
                </div>
                <p className="tp-value-card__desc">Зарегистрируйтесь в кабинете и получите сниппет за минуту.</p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/app/localization">
                Открыть кабинет
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}
