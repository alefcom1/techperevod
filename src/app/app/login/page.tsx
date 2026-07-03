"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/core/Card";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/core/Button";
import { BrandMark } from "@/components/navigation/BrandMark";
import { useTheme } from "@/lib/theme";
import { login, getUser } from "@/lib/demo-account";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (getUser()) router.replace("/app");
  }, [router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Введите корректный email");
      return;
    }
    login(email.trim().toLowerCase());
    router.push("/app");
  }

  return (
    <div className="tp-login">
      <Card variant="elevated" padding="lg" className="tp-login__card">
        <Link href="/" style={{ alignSelf: "center" }} aria-label="Техперевод.com — на главную">
          <BrandMark theme={theme} height={40} tagline={false} />
        </Link>
        <div>
          <div className="tp-value-card__title" style={{ fontSize: 22, textAlign: "center" }}>
            Вход в кабинет
          </div>
          <p className="tp-value-card__desc" style={{ textAlign: "center", marginTop: 8 }}>
            Демо-режим: достаточно email, пароль не нужен. 10 000 слов AI-перевода в месяц — бесплатно.
          </p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
          <Input
            label="Email"
            type="email"
            placeholder="you@company.ru"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            required
          />
          {error ? <span style={{ color: "#E5484D", fontSize: 14 }}>{error}</span> : null}
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Войти
          </Button>
        </form>
        <span className="tp-translator__note" style={{ textAlign: "center" }}>
          Продолжая, вы соглашаетесь с условиями сервиса. <Link href="/tarify">Тарифы</Link>
        </span>
      </Card>
    </div>
  );
}
