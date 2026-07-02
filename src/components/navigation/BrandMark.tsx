import React from "react";

export interface BrandMarkProps {
  theme?: "light" | "dark";
  basePath?: string;
  height?: number;
  tagline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The brand lockup (gear/speech-bubble mark + "techperevod.com" wordmark +
 * tagline), theme-matched. Renders as a single raster image (the mark is not
 * reproducible in CSS/SVG). `basePath` is the site-root-relative asset prefix
 * (default "/" → /assets/logo-*.png in Next's public dir).
 */
export function BrandMark({
  theme = "light",
  basePath = "/",
  height = 34,
  tagline = true,
  className = "",
  style = {},
}: BrandMarkProps) {
  const src = `${basePath}assets/logo-${theme === "dark" ? "dark" : "light"}.png`;
  // Source art is a 1164x321 lockup incl. tagline; the no-tagline crop keeps
  // just the mark+wordmark row (top ~74% of the asset) via an overflow clip —
  // vertical crop only, so the container is sized to the FULL scaled width.
  const aspect = 1164 / 321;
  const cropRatio = 0.74;

  if (tagline) {
    const width = height * aspect;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="techperevod.com — технические переводы"
        height={height}
        width={width}
        className={["tp-brandmark", className].filter(Boolean).join(" ")}
        style={{ display: "block", ...style }}
      />
    );
  }

  const fullHeight = height / cropRatio;
  const fullWidth = fullHeight * aspect;
  return (
    <span
      className={["tp-brandmark", "tp-brandmark--cropped", className].filter(Boolean).join(" ")}
      style={{ display: "inline-block", height, width: fullWidth, overflow: "hidden", position: "relative", ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="techperevod.com"
        style={{ position: "absolute", top: 0, left: 0, height: fullHeight, width: fullWidth }}
      />
    </span>
  );
}
