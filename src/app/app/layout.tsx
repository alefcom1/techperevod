import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кабинет",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
