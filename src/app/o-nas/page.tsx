import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { AboutBody } from "@/sections/AboutBody";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "techperevod — платформа технического перевода: AI-оркестрация моделей плюс редактура инженеров-переводчиков. Скорость AI, точность инженера.",
  alternates: { canonical: "/o-nas" },
  openGraph: { title: "О нас | techperevod.com", url: "/o-nas", type: "website" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutBody />
    </SiteShell>
  );
}
