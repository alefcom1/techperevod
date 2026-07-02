import { getContent } from "@/lib/site-content";
import { AdminEditor } from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
