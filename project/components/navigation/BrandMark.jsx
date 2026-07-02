import React from "react";

/**
 * The brand lockup (gear/speech-bubble mark + "techperevod.com" wordmark +
 * tagline), theme-matched: picks the light-background or dark-background
 * artwork automatically. Renders as a single raster image (the mark is not
 * reproducible in CSS/SVG) — supply `basePath` as the relative path from
 * your HTML file to the project root so the asset resolves correctly.
 */
export function BrandMark({ theme = "light", basePath = "", height = 34, tagline = true, className = "", style = {} }) {
  const src = `${basePath}assets/logo-${theme === "dark" ? "dark" : "light"}.png`;
  // Source art is a 1164x321 lockup incl. tagline; a no-tagline crop keeps
  // just the mark+wordmark row (top ~74% of the asset height) via an
  // overflow clip — vertical crop only, so the container must be sized to
  // the FULL scaled image width (not height*aspect, which is the width for
  // an uncropped render and undershoots once the image is scaled up to make
  // the cropped region equal `height`, clipping the wordmark's right edge).
  const aspect = 1164 / 321;
  const cropRatio = 0.74;
  if (tagline) {
    const width = height * aspect;
    return (
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
      <img
        src={src}
        alt="techperevod.com"
        style={{ position: "absolute", top: 0, left: 0, height: fullHeight, width: fullWidth }}
      />
    </span>
  );
}
