import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";

const POSTS = [
  { category: "AI", date: "24 июня 2026", read: "6 мин", title: "Как AI-оркестрация ускоряет технический перевод", excerpt: "Разбираем, как роутер выбирает модель под языковую пару и тип документа — и почему это быстрее одной универсальной модели." },
  { category: "Продукт", date: "18 июня 2026", read: "4 мин", title: "Термбаза и TM: как считать скидку за повторы", excerpt: "Что такое память переводов, как повторы снижают стоимость заказа и почему термбаза принадлежит клиенту." },
  { category: "Машиностроение", date: "10 июня 2026", read: "5 мин", title: "Чек-лист: подготовка чертежей DWG к переводу", excerpt: "Слои, аннотации, блоки текста — что проверить перед отправкой чертежа на перевод." },
  { category: "Гайд", date: "2 июня 2026", read: "5 мин", title: "MTPE vs Full: как выбрать уровень перевода", excerpt: "Когда достаточно AI-черновика с редактурой, а когда нужен перевод инженером с нуля." },
  { category: "Форматы", date: "26 мая 2026", read: "3 мин", title: "5 форматов, которые чаще всего теряют верстку при переводе", excerpt: "И как оркестратор сохраняет исходную структуру документа при сдаче." },
  { category: "Команда", date: "19 мая 2026", read: "4 мин", title: "Как мы обучаем редакторов-инженеров", excerpt: "Профильное образование, тестовые задания и работа с термбазой клиента — что входит в подготовку редактора." },
];

export function BlogBody() {
  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Блог
          </span>
        }
        title="Блог"
        subtitle="Об AI-оркестрации, работе с термбазой и техническом переводе по отраслям."
        ctaHref="/#hero"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <div className="tp-blog-grid">
            {POSTS.map((p, i) => (
              <ScrollReveal key={p.title} delay={(i % 3) * 70}>
                <Link href="/blog" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <Card variant="elevated" padding="lg" interactive className="tp-blog-card">
                    <Badge tone={i % 3 === 0 ? "accent" : "neutral"} size="sm">
                      {p.category}
                    </Badge>
                    <h3 className="tp-blog-card__title">{p.title}</h3>
                    <p className="tp-blog-card__excerpt">{p.excerpt}</p>
                    <div className="tp-blog-card__meta">
                      <Icon name="calendar" size={14} />
                      <span>{p.date}</span>
                      <span>·</span>
                      <span>{p.read}</span>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
