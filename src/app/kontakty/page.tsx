import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactsBody } from "@/sections/ContactsBody";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с techperevod: email, телефон, Telegram. Оставьте заявку и прикрепите документ — пришлём оценку стоимости в течение рабочего дня.",
  alternates: { canonical: "/kontakty" },
  openGraph: { title: "Контакты | techperevod.com", url: "/kontakty", type: "website" },
};

export default function ContactsPage() {
  return (
    <SiteShell>
      <ContactsBody />
    </SiteShell>
  );
}
