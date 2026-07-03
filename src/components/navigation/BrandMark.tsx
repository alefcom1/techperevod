import React from "react";

export interface BrandMarkProps {
  theme?: "light" | "dark";
  basePath?: string;
  height?: number;
  /** Оставлен для совместимости вызовов: новый лекап всегда цельный. */
  tagline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Фирменный лекап (шестерёнка-облачко + «Техперевод.com» + подпись
 * «технические переводы»), подобранный под тему. Использует webp-логотипы,
 * загруженные владельцем: logo-bright.webp (светлая тема) 1486×404,
 * logo-dark.webp (тёмная) 1512×414.
 */
const ASPECT: Record<"light" | "dark", number> = {
  light: 1486 / 404,
  dark: 1512 / 414,
};

export function BrandMark({
  theme = "light",
  basePath = "/",
  height = 34,
  className = "",
  style = {},
}: BrandMarkProps) {
  const variant = theme === "dark" ? "dark" : "light";
  const src = `${basePath}assets/logo-${variant === "dark" ? "dark" : "bright"}.webp`;
  const width = Math.round(height * ASPECT[variant]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Техперевод.com — технические переводы"
      height={height}
      width={width}
      className={["tp-brandmark", className].filter(Boolean).join(" ")}
      style={{ display: "block", ...style }}
    />
  );
}
