import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/core/Button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="tp-pagehero" style={{ paddingBottom: "var(--tp-space-12)" }}>
        <div className="tp-pagehero__inner">
          <div className="tp-pagehero__breadcrumb">
            <Link href="/">Главная</Link> / 404
          </div>
          <h1 className="tp-pagehero__title">Страница не найдена</h1>
          <p className="tp-pagehero__subtitle">
            Кажется, такой страницы нет. Вернитесь на главную или загрузите документ для оценки.
          </p>
          <div className="tp-pagehero__cta">
            <Button size="lg" variant="primary" as="a" href="/">
              На главную
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
