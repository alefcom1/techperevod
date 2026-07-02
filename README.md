# techperevod.com

Marketing website for **techperevod** — technical translation combining an
AI-model orchestrator with human engineer-editors. Built with **Next.js
(App Router) + TypeScript** from the Techperevod design system.

## Stack

- **Next.js 14** (App Router, React 18, static generation)
- **TypeScript**
- Plain CSS design tokens (`--tp-*` custom properties, light + dark themes)
- Fonts: Inter + JetBrains Mono (Google Fonts)
- No UI framework — the design system's components are ported to first-party
  React components under `src/components/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run start    # serve the production build
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page (11 sections: hero instant-quote, how-it-works, AI-orchestrator, before/after, pricing, glossary/TM, industries, B2B, formats, proof) |
| `/otrasli/it-saas` | Industry — IT и SaaS |
| `/otrasli/neftegaz` | Industry — Нефтегаз и энергетика |
| `/otrasli/mashinostroenie` | Industry — Машиностроение |
| `/otrasli/medteh` | Industry — Медтех и фарма |
| `/o-nas` | About |
| `/blog` | Blog |
| `/kontakty` | Contacts (with lead form) |
| `/sitemap.xml`, `/robots.txt` | SEO |

The four industry pages are generated from a single dynamic route
(`src/app/otrasli/[slug]/page.tsx`) driven by `src/data/site.ts`.

## Project layout

```
src/
  app/                 App Router routes + metadata, sitemap, robots, globals.css
  components/
    core/              Button, Badge, Card, Icon (inline Lucide), ScrollReveal
    forms/             Input, FileDropzone
    navigation/        NavBar, Footer, ThemeToggle, BrandMark
    marketing/         SectionHeader, PricingCard, ProductWindow, ScrollSteps, …
    layout/            SiteShell (nav + footer), PageHero
  sections/            Landing + interior-page section bodies
  data/site.ts         Nav/footer links + industry content (single source of truth)
  lib/theme.tsx        Light/dark ThemeProvider (data-tp-theme + localStorage)
  styles/              Design tokens + component CSS (copied verbatim from the DS)
public/assets/         Logos + favicons
```

## Theming

Light/dark is controlled by `data-tp-theme` on `<html>`. An inline script in the
root layout applies the stored preference before first paint (no flash);
`ThemeProvider` keeps it in sync and persists to `localStorage`
(`tp-landing-theme`). Toggle via the switch in the nav bar.

## SEO

Per-page `<title>` / description / canonical / Open Graph via the App Router
`metadata` API, a generated `sitemap.xml` / `robots.txt`, `lang="ru"`, and
fully server-rendered (static) HTML so content is crawlable without JS.

## Notes / placeholders (from the design brief)

- **Logo**: raster lockup (`public/assets/logo-*.png`), light + dark variants.
- **Social-proof numbers** (40 млн+ слов, 35 %, 2 мин), **client logos**, and the
  **testimonial** are illustrative placeholders — flagged in-UI — pending real data.
- **Icons**: Lucide geometry rendered inline (`src/components/core/Icon.tsx`), no
  runtime/CDN dependency.
- The **instant-quote** and **contact form** are presentational (fake estimate /
  local success state) — wire them to a backend to go live.

## Design source

The original design handoff from Claude Design lives under `project/` (HTML/CSS/JS
prototypes + the design-system definition) and `chats/` (the iteration
transcripts). This app is the production recreation of those prototypes; the
tokens and component CSS in `src/styles/` are carried over unchanged.

Design-system inputs referenced during the design phase:
- GitHub: `alefcom1/techperevod`
