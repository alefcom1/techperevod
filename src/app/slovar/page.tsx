import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { DictionaryHubBody } from "@/sections/DictionaryHubBody";

const title = "Технический словарь — термины по отраслям";
const description =
  "Коллекции технических терминов «русский ↔ английский»: машиностроение, нефтегазовая отрасль, IT и локализация, медтехника и фарма — с пояснениями там, где перевод неочевиден.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/slovar" },
    openGraph: { title, description, url: "/slovar", type: "website" },
  };
}

export default function DictionaryHubPage() {
  return (
    <SiteShell>
      <DictionaryHubBody />
    </SiteShell>
  );
}
