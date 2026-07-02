import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactsBody } from "@/sections/ContactsBody";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta.kontakty;
  return {
    title,
    description,
    alternates: { canonical: "/kontakty" },
    openGraph: { title: `${title} | techperevod.com`, url: "/kontakty", type: "website" },
  };
}

export default function ContactsPage() {
  return (
    <SiteShell>
      <ContactsBody />
    </SiteShell>
  );
}
