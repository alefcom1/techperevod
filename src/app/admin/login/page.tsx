"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/core/Card";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/core/Button";
import { BrandMark } from "@/components/navigation/BrandMark";
import { useTheme } from "@/lib/theme";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось войти");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tp-login">
      <Card variant="elevated" padding="lg" className="tp-login__card">
        <Link href="/" style={{ alignSelf: "center" }} aria-label="Техперевод.com — на главную">
          <BrandMark theme={theme} height={40} tagline={false} />
        </Link>
        <div>
          <div className="tp-value-card__title" style={{ fontSize: 22, textAlign: "center" }}>
            Админ-панель
          </div>
          <p className="tp-value-card__desc" style={{ textAlign: "center", marginTop: 8 }}>
            Введите пароль, чтобы редактировать метатеги и тексты страниц.
          </p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            autoFocus
            required
          />
          {error ? <span style={{ color: "#E5484D", fontSize: 14 }}>{error}</span> : null}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? "Проверка…" : "Войти"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
