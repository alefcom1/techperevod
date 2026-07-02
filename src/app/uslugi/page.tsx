import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicesHubBody } from "@/sections/ServicesHubBody";

const title = "Услуги перевода технической документации";
const description =
  "Семь направлений технического перевода: чертежи DWG/DXF, инструкции, патенты, паспорта безопасности SDS, ТУ и спецификации, локализация ПО, документация к китайскому оборудованию.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/uslugi" },
    openGraph: { title, description, url: "/uslugi", type: "website" },
  };
}

export default function ServicesHubPage() {
  return (
    <SiteShell>
      <ServicesHubBody />
    </SiteShell>
  );
}
