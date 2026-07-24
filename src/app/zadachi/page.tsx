import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { UseCasesHubBody } from "@/sections/UseCasesHubBody";

const title = "Задачи: сертификация, экспорт, тендеры — перевод";
const description =
  "Перевод как часть бизнес-процесса: сертификация в ЕАЭС, выход на экспорт, патентование за рубежом, международные тендеры, запуск импортного оборудования.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/zadachi" },
    openGraph: { title, description, url: "/zadachi", type: "website" },
  };
}

export default function UseCasesHubPage() {
  return (
    <SiteShell>
      <UseCasesHubBody />
    </SiteShell>
  );
}
