"use client";

import React from "react";
import Link from "next/link";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { BrandMark } from "@/components/navigation/BrandMark";
import { Button } from "@/components/core/Button";
import { OrderModalHost } from "@/components/order/OrderModal";
import { useTheme } from "@/lib/theme";
import {
  NAV_LINKS,
  FOOTER_COLUMNS,
  SITE_EMAIL,
  SITE_INN,
  SITE_LEGAL_NAME,
  SITE_OGRNIP,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/data/site";

/**
 * Shared chrome for every page: sticky NavBar (logo + links + theme toggle +
 * CTA) and the multi-column Footer. Reads the current theme from context so
 * the BrandMark picks the right light/dark artwork.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="tp-landing">
      <NavBar
        logo={
          <Link href="/" style={{ display: "flex" }} aria-label="Техперевод.com — на главную">
            <BrandMark theme={theme} height={48} tagline={false} />
          </Link>
        }
        links={NAV_LINKS}
        right={
          <>
            <ThemeToggle theme={theme} onChange={setTheme} />
            <Button size="sm" variant="ghost" as="a" href="/app">
              Войти
            </Button>
          </>
        }
        cta={
          <Button size="sm" variant="primary" as="a" href="/perevodchik">
            Попробовать бесплатно
          </Button>
        }
      />

      {children}

      <OrderModalHost />

      <Footer
        logo={
          <>
            <Link href="/" style={{ display: "flex" }} aria-label="Техперевод.com — на главную">
              <BrandMark theme={theme} height={68} />
            </Link>
            <div className="tp-footer__contacts">
              <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </div>
          </>
        }
        columns={FOOTER_COLUMNS}
        bottom={
          <>
            <div className="tp-footer__bottom-row">
              <span>
                © 2026 <a href="https://techperevod.com">Техперевод.com</a>
              </span>
              <Link href="/bezopasnost">Безопасность и 152-ФЗ</Link>
              <Link href="/politika-pd">Политика персональных данных</Link>
              <Link href="/oferta">Публичная оферта</Link>
            </div>
            <div className="tp-footer__legal">
              {SITE_LEGAL_NAME} · ИНН {SITE_INN} · ОГРНИП {SITE_OGRNIP}
            </div>
          </>
        }
      />
    </div>
  );
}
