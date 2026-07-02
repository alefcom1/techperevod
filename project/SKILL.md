---
name: techperevod-design
description: Use this skill to generate well-branded interfaces and assets for techperevod (a technical-translation SaaS platform, AI+human hybrid, Russian B2B market), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view. If working on production code,
you can copy assets and read the rules here to become an expert in designing with
this brand.

If the user invokes this skill without any other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs HTML
artifacts _or_ production code, depending on the need.

Quick orientation:
- `readme.md` — full brand/content/visual guide, sources, and caveats. Read this first.
- `styles.css` + `tokens/` — CSS custom properties (`--tp-*`) for color (incl. dark
  theme via `[data-tp-theme="dark"]`), type, spacing, radius, shadow, motion.
- `components/` — React primitives (Button, Card, Badge, Icon, FileDropzone, Input,
  NavBar, Footer, ThemeToggle, and the marketing/diagram set incl.
  `OrchestratorDiagram` and `HeroModelDiagram`, the brand's signature AI visuals).
- `ui_kits/techperevod-landing/` — full interactive recreation of the techperevod.com
  homepage composed from those components; the best reference for how pieces combine.
- The source GitHub repo (`alefcom1/techperevod`) was empty when this system was
  built — everything here comes from a chat brief. If real code/assets ever land in
  that repo, re-derive this system from it instead.
