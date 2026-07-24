import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PrimeryPerevodovBody } from "@/sections/PrimeryPerevodovBody";

export const metadata: Metadata = {
  title: "Примеры технического перевода: до и после",
  description:
    "12 фрагментов «исходный текст / перевод» по техническому, юридическому, медицинскому и IT-переводу — с разбором, что именно отличает профессиональный перевод от машинного.",
  alternates: { canonical: "/primery-perevodov" },
  openGraph: {
    title: "Примеры переводов | Техперевод.com",
    description:
      "Исходный текст и перевод рядом — по 4 специализациям бюро. Реальный уровень, а не рекламные обещания.",
    url: "/primery-perevodov",
    type: "website",
  },
};

export default function PrimeryPerevodovPage() {
  return (
    <SiteShell>
      <PrimeryPerevodovBody />
    </SiteShell>
  );
}
