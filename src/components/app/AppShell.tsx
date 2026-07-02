"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandMark } from "@/components/navigation/BrandMark";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { useTheme } from "@/lib/theme";
import { getUser, logout, type DemoUser } from "@/lib/demo-account";

const NAV = [
  { href: "/app", icon: "gauge", label: "Обзор" },
  { href: "/app/editor", icon: "file-text", label: "Перевод" },
  { href: "/app/glossary", icon: "database", label: "Термбаза" },
  { href: "/app/billing", icon: "package-check", label: "Тариф" },
];

/**
 * Каркас кабинета: сайдбар + топбар. Гард: без демо-аккаунта редиректит
 * на /app/login. children получает user через render-prop.
 */
export function AppShell({
  title,
  children,
}: {
  title: string;
  children: (user: DemoUser) => React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<DemoUser | null>(null);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/app/login");
      return;
    }
    setUser(u);
    setChecked(true);
  }, [router]);

  if (!checked || !user) return null;

  return (
    <div className="tp-app">
      <aside className="tp-app__sidebar">
        <div className="tp-app__logo">
          <Link href="/" aria-label="techperevod.com — на главную">
            <BrandMark theme={theme} height={36} tagline={false} />
          </Link>
        </div>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`tp-app__nav-link ${pathname === item.href ? "tp-app__nav-link--active" : ""}`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="tp-app__spacer" />
        <button
          type="button"
          className="tp-app__nav-link"
          style={{ border: "none", background: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <Icon name="user-round" size={18} />
          <span>Выйти</span>
        </button>
      </aside>

      <div className="tp-app__main">
        <header className="tp-app__topbar">
          <h1 className="tp-app__title">{title}</h1>
          <div className="tp-app__user">
            <span>{user.email}</span>
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </header>
        <main className="tp-app__content">
          <div className="tp-app__demo-note">
            Демо-кабинет: данные хранятся в вашем браузере. Регистрация, оплата и командная работа появятся с
            запуском биллинга.
          </div>
          {children(user)}
        </main>
      </div>
    </div>
  );
}

export function AppPrimaryButton(props: React.ComponentProps<typeof Button>) {
  return <Button variant="primary" {...props} />;
}
