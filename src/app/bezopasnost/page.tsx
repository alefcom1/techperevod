import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { SecurityPageBody } from "@/sections/SecurityPageBody";

const title = "Конфиденциальность и защита данных — 152-ФЗ, NDA за 2 часа";
const description =
  "Российские серверы, доступ только у закреплённого инженера, удаление данных через 90 дней и NDA за 2 часа — как техперевод защищает документацию по 152-ФЗ.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/bezopasnost" },
    openGraph: { title, description, url: "/bezopasnost", type: "website" },
  };
}

export default function SecurityPage() {
  return (
    <SiteShell>
      <SecurityPageBody />
    </SiteShell>
  );
}
