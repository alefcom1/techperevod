import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { KeysyBody } from "@/sections/KeysyBody";

export const metadata: Metadata = {
  title: "Кейсы и клиенты",
  description:
    "Реальные клиенты платформы: Doorhan, Mitsubishi Heavy Industries, Van der Hoeven и другие — от 10 до 25 лет сотрудничества по техническому переводу.",
  alternates: { canonical: "/keysy" },
  openGraph: { title: "Кейсы и клиенты | Техперевод.com", url: "/keysy", type: "website" },
};

export default function KeysyPage() {
  return (
    <SiteShell>
      <KeysyBody />
    </SiteShell>
  );
}
