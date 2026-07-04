import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { TranslatorsBody } from "@/sections/TranslatorsBody";

export const metadata: Metadata = {
  title: "Вакансии для переводчиков | Техперевод.com",
  description:
    "Ищем переводчиков-инженеров с профильной специализацией. AI-черновик снимает рутину, стабильный поток заказов, прозрачная оплата. Заполните анкету и пройдите короткий тест по языку.",
  alternates: { canonical: "/perevodchikam" },
  openGraph: { title: "Вакансии для переводчиков | Техперевод.com", url: "/perevodchikam", type: "website" },
};

export default function TranslatorsPage() {
  return (
    <SiteShell>
      <TranslatorsBody />
    </SiteShell>
  );
}
