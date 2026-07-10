import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { StandartyBody } from "@/sections/StandartyBody";

export const metadata: Metadata = {
  title: "Стандарты и нормативы перевода | Техперевод.com",
  description:
    "ISO 17100 и ГОСТ Р, ЕСКД, ISO 13485 и ICH-GCP, 152-ФЗ, GDPR и требования Роспатента к переводу заявок PCT — на что мы опираемся и что это значит для готового перевода.",
  alternates: { canonical: "/standarty" },
  openGraph: {
    title: "Стандарты и нормативы перевода | Техперевод.com",
    description: "8 стандартов и нормативов по техническому, медицинскому, юридическому и IT-переводу.",
    url: "/standarty",
    type: "website",
  },
};

export default function StandartyPage() {
  return (
    <SiteShell>
      <StandartyBody />
    </SiteShell>
  );
}
