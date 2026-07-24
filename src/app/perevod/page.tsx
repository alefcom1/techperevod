import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { LanguagesHubBody } from "@/sections/LanguagesHubBody";

const title = "Языки технического перевода — 50+ пар";
const description =
  "Технический перевод с английского, немецкого, китайского, французского, испанского и на английский — AI-оркестрация моделей плюс инженер-редактор под каждую языковую пару.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/perevod" },
    openGraph: { title, description, url: "/perevod", type: "website" },
  };
}

export default function LanguagesHubPage() {
  return (
    <SiteShell>
      <LanguagesHubBody />
    </SiteShell>
  );
}
