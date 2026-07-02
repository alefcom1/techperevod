import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PricingPlansBody } from "@/sections/PricingPlansBody";

export const metadata: Metadata = {
  title: "Тарифы — подписка на технический перевод",
  description:
    "Бесплатный AI-перевод фрагментов, подписка с оркестрацией моделей от 2 900 ₽/мес и редактура инженером от 1,5 ₽/слово. Калькулятор подбора тарифа по объёму.",
  alternates: { canonical: "/tarify" },
  openGraph: { title: "Тарифы | techperevod.com", url: "/tarify", type: "website" },
};

export default function PricingPage() {
  return (
    <SiteShell>
      <PricingPlansBody />
    </SiteShell>
  );
}
