# Techperevod Design System

Design system for **techperevod.com** — a technical-translation SaaS platform
positioned as an AI + human hybrid for the Russian B2B market (engineering,
IT, industrial companies ordering technical documentation: manuals,
specifications, drawings, patents).

## Sources

- **GitHub:** [`alefcom1/techperevod`](https://github.com/alefcom1/techperevod) — the
  repo the user attached for this project. **It was empty at import time**
  (no commits on `main`/`master`), so nothing could be read from it. Everything
  in this design system was instead built from a detailed brand/content brief
  supplied directly in chat (tokens, copy, section structure, references).
  **If real code, assets or copy ever land in that repo, re-run this design
  system against it** — it is the intended ground truth and should supersede
  the brief-derived choices below, especially the color values, exact type
  scale, and any component behavior.
- Other repos visible on the same GitHub account (not yet explored — worth
  checking if `techperevod` stays empty, since they may be related
  properties of the same business): `alefcom1/1russian.com`,
  `alefcom1/pere.rf`, `alefcom1/traduzione.tech`, `alefcom1/att`,
  `alefcom1/Moscowtrans`, `alefcom1/remarka-proxy`, `alefcom1/tms`
  (translation management system), `alefcom1/lang-directory`.
- **Brief references** named in the prompt as visual inspiration (used only
  for high-level tone — nothing was copied pixel-for-pixel): Lokalise (clean
  dashboard aesthetic, AI emphasis), Crowdin (structured feature blocks,
  developer-friendly), Taia (AI+human hybrid as the headline message, instant
  quote).

## Product context

`techperevod.com` sells technical translation as a **platform**, not a
traditional translation bureau: an AI orchestrator routes documents across
Western models (GPT, Claude, DeepL) and Russian/local models (YandexGPT,
DeepSeek), and every AI draft is finished by an engineer-editor with subject
expertise. The pitch is "speed of AI, quality of a human," anchored by a
transparent, per-client terminology base (glossary + translation memory) that
also earns repeat-content discounts.

This originally shipped as a single product surface (the marketing/conversion
homepage). It has since grown a full secondary-page set: 4 industry pages
(IT/SaaS, нефтегаз, машиностроение, медтех) and 3 service pages (о нас,
блог, контакты) — see Index below. The "client cabinet" referenced in the
brief for the glossary section is still mocked as a small panel *inside* the
homepage (section 6), not built out as its own dashboard product surface,
since no source for a full dashboard was provided.

---

## Content fundamentals

**Language:** Russian only (interface and copy). No localized English copy
exists in this system yet.

**Voice & address:** Impersonal/institutional register typical of Russian
B2B software copy — headlines and body copy describe the *product* ("AI-
оркестратор западных и локальных моделей...") rather than address the reader
directly with "вы". The one explicit "you" address is reserved for CTAs and
benefit statements aimed at the buyer ("Ваша терминология под контролем",
"вы платите за нужную глубину") — i.e. second person shows up at moments of
direct value promise, not in general description. Keep this split: descriptive
sentences stay in third person / passive-ish register; benefit headlines get
"ваш/вы".

**Casing:** Sentence case throughout — headlines are not Title Case
("Технический перевод: скорость AI, точность инженера", not "Технический
Перевод: Скорость AI"). Product/model names keep their own casing (GPT,
Claude, DeepL, YandexGPT, DeepSeek, MTPE).

**Structure:** Headlines are short and declarative, often two contrasting
halves separated by a colon or em dash ("скорость AI, точность инженера";
"Full — Перевод + редактура инженером"). Subheads are one sentence that adds
the specific mechanism or number behind the headline's claim ("Оценка за 2
минуты", "Роутер выбирает лучшую модель под языковую пару и тип документа").

**Emoji:** Not used anywhere in the brief or content. Do not introduce emoji.

**Numbers as proof:** The brief explicitly calls for concrete numbers
(2 минуты, 65+ форматов, млн слов, % экономии) rather than vague claims —
specificity is part of the "tech platform, not a translation bureau" voice.
**Caveat:** the actual metric *values* for the social-proof section (words
translated, % TM savings) were not supplied — this system uses illustrative
placeholders (`StatMetric`), clearly flagged in code comments and in the
`ProofSection` UI. Replace with real figures before shipping.

**Terminology is always monospace:** file formats, glossary terms, language
pairs and codes render in JetBrains Mono, never Inter — this is a deliberate
signal that these are literal/technical tokens, not prose (see `FormatChip`,
`Input[mono]`, `ModelNode`).

**Vibe:** confident, precise, engineering-adjacent — closer to a developer
tool's landing page than a language-services agency's. Avoid warm/folksy
phrasing, superlatives without a mechanism ("лучший перевод"), or translation-
industry clichés ("носители языка", "индивидуальный подход").

---

## Visual foundations

**Overall direction:** "tech platform, not a бюро переводов." Clean,
confident, engineering-grade — closer to a dev-tool dashboard than a
language-services brochure.

**Color:** Two-color brand system, always via CSS custom properties
(`--tp-*`), never hardcoded hex in component code:
- **Primary — electric blue** `#1B4DFF` (light) / `#4D7BFF` (dark): brand,
  primary CTAs, and — critically — codes *Western* AI models (GPT/Claude/
  DeepL) in the orchestrator diagrams.
- **Accent — turquoise** `#00C4A7` (light) / `#1FE0C0` (dark): AI-specific
  accents, and codes *local/Russian* models (YandexGPT/DeepSeek). This
  primary/accent split doubles as the diagrams' entire color-coding legend —
  don't introduce a third hue for "AI" concepts, reuse turquoise.
- Neutrals run from `--tp-bg` (page, slightly off-white `#FAFBFC`) through
  `--tp-surface` (cards, pure white) to `--tp-text`/`--tp-text-muted`. Both
  themes are full token sets (see `tokens/colors.css`); dark is not a filter
  over light, it has its own tuned surface/border/shadow values.
- Interactive states (`-hover`, `-active`, `-soft`) are **derived** with
  `color-mix(in oklch, …)` off the base color rather than hand-picked hex —
  this keeps hover/press states theme-correct automatically. Hover = darken
  (light theme) or lighten (dark theme) toward black/white; press goes one
  step further; `-soft` is a ~10–15% tint used for badge/pill backgrounds.
- No semantic red/amber "danger/warning" tokens exist — none of the current
  content calls for them. Add them the same way (`oklch`-derived, harmonious
  with the existing hue family) only when a real use case appears; don't
  default to a generic Bootstrap red.

**Typography:** Two-family system, each with one job:
- **Inter** — one confident grotesk carries both headings (700/800,
  `-0.02em` tracking) and body/UI copy (400–600). Headings used to run on
  Fredoka (rounded-geometric, chosen to echo the logo wordmark's rounded
  terminals) but that read as a friendly consumer-app face rather than an
  engineering-grade B2B tool — see "Revision notes" below. Weight + tighter
  tracking now do the job a second display family used to.
- **JetBrains Mono** — anything literal: terms, formats, codes, model names.
Sizes are fixed pixel values from the brief, not a generic type scale
(H1 56/36, H2 40/28, H3 24/20, body 17/16, caption 14 — desktop/mobile). Both
values are real breakpoint overrides in `tokens/typography.css`, not
`clamp()` interpolation — keep it that way so the type never sits at an
in-between size the brief didn't specify.

**Spacing & layout:** 4px base unit, named scale `--tp-space-1` (4px) through
`--tp-space-13` (128px); `--tp-space` (24px) is the default control
padding/gap. Section vertical rhythm is generous — 96px top/bottom
(`--tp-space-section-y`), 56px on mobile. Content sits in a 1200px max-width
container. Sections alternate between `--tp-bg` and `--tp-surface-sunken`
tints (max two background colors across the whole page) to create rhythm
without introducing new hues.

**Backgrounds:** No photography, no full-bleed hero imagery, no repeating
textures or grain. The visual interest comes entirely from the bespoke
SVG line-diagrams (`OrchestratorDiagram`, `HeroModelDiagram`) and from
glassmorphism panels — not from imagery. This is a deliberate "technologist,"
data/system-diagram aesthetic rather than a lifestyle/photo one.

**Glassmorphism (signature treatment):** `Card variant="glass"` —
translucent `--tp-glass` background (60%/50% white/dark), `20px` backdrop
blur, a soft 1px translucent border, and the standard card shadow. Per the
brief this should stay **light-touch**: reserve it for 1–2 hero-adjacent
panels (the sticky nav, the hero's instant-quote result panel) — never stack
glass cards edge-to-edge in a grid, that reads as "too much."

**Motion:** Purposeful, not decorative. `--tp-ease` (standard) /
`--tp-ease-out` (entrances) cubic-béziers at 150/250/700ms
(fast/default/slow). Concretely: buttons scale to 0.98 on press; cards on
`interactive` hover lift 4px with a stronger shadow; the orchestrator/hero
diagrams animate a dashed-line "pulse" continuously along their connector
lines (the brief's "бирюзовые импульсы") — the one intentionally looping
animation in the system. Two scroll-driven patterns cover everything else:
`ScrollSteps` (`components/marketing/ScrollSteps.jsx`) — a Crowdin-style
sticky right panel that stays fixed while a left-hand step list
shrinks/fades by distance from the active step (used for "Как это работает"
on the homepage and "Как проходит перевод" on every industry page); and
`ScrollReveal` (`components/core/ScrollReveal.jsx`) — a generic fade+slide-up
on first scroll-into-view, with a `delay` prop for staggering card grids
(pricing, industries, B2B, and every secondary page). Both are built on
`IntersectionObserver` (no scroll-jacking) and disabled entirely under
`prefers-reduced-motion`.

**Hover / press states:** Hover = tint shift via `color-mix` (see Color,
above) plus, for cards, a lift + shadow increase. Press = `scale(0.98)` on
buttons; no color-only press state. No opacity-based hover states are used
for solid elements (opacity is reserved for the light glass-panel
transparency itself, not as a generic hover effect).

**Borders & shadows:** Hairline 1px borders (`--tp-border`) on flat surfaces;
elevated surfaces drop the border and use `--tp-shadow` instead (never both
border-and-shadow on the same element unless it's a glass panel, which keeps
its border for edge definition since the backdrop blur alone doesn't read as
a boundary). Shadow palette is `-sm` (2px/8px, subtle separation) → default
(8px/32px, resting cards) → `-lift` (20px/48px, hover/featured state) — one
consistent shadow color per theme (`rgba(14,24,38,…)` light,
`rgba(0,0,0,…)` dark), not per-component custom shadows.

**Corner radius:** Three sizes, used consistently: `10px` for controls
(buttons, inputs, chips), `16px` for cards/panels, `999px` (pill) for
badges/tags/the theme toggle. No other radius values should appear.

**Transparency & blur:** Used in exactly two places — the sticky nav bar
(so content scrolling underneath stays legible) and `Card variant="glass"`.
Not used as a general "frosted" effect elsewhere.

**Imagery color vibe:** N/A — no photography is used anywhere in this
system by design (see Backgrounds above). If product screenshots or team
photos are added later, keep them cool-neutral and high-contrast to match
the blue/turquoise palette; avoid warm/orange tones which would fight the
brand hue.

**Fixed elements:** The top nav is `position: sticky` (glass background);
nothing else is pinned. No floating chat widgets, cookie banners, or
fixed CTAs were specified — don't add them speculatively.

---

## Iconography

**No icon set exists in the source** (the repo was empty), so this system
uses **Lucide** (MIT-licensed) as a documented substitution — outline style,
`2px` stroke weight, which matches the diagrams' line weight. It's
implemented once, correctly, via the `Icon` component
(`components/core/Icon.jsx`): real Lucide path/shape data is copied inline
into a small `ICONS` registry and rendered as a genuine `<svg stroke="currentColor">`
at request time — **no CDN fetch, no CSS mask**. (An earlier CDN-mask-based
version of this component was replaced after testing showed `mask-image`
against a cross-origin SVG doesn't composite reliably in every rendering
environment — it silently fell back to a solid filled square instead of the
icon outline. Bundling the path data inline sidesteps that entirely.) Every
icon inherits `color`/theme automatically since it inherits `currentColor`.
**Always use `<Icon name="…" />` for icons — never hand-draw a new SVG
icon**, and never use emoji or Unicode glyphs as icons (the one exception is
the `ThemeToggle`'s ☾/☀ glyphs, which are a tiny state indicator, not a brand
icon). To add an icon not yet in the registry, copy its shape children from
`github.com/lucide-icons/lucide` (`icons/<name>.svg`) into `Icon.jsx`.

No custom icon font, no PNG icon sprites, no emoji usage anywhere in the
content.

**Logo:** a real lockup was supplied (gear + document/translation speech-
bubble mark, "techperevod.com" wordmark, "технические переводы" tagline),
in matched light- and dark-background versions. Cropped and chroma-keyed to
transparent PNGs at `assets/logo-light.png` (navy/blue text, for light
backgrounds) and `assets/logo-dark.png` (white/silver text, for dark
backgrounds) — use the `BrandMark` component
(`components/navigation/BrandMark.jsx`) rather than referencing these files
directly; it picks the right asset for the current theme. Wired into both
`NavBar`'s and `Footer`'s `logo` prop in `ui_kits/techperevod-landing/LandingPage.jsx`.

---

## Index

```
styles.css                     — entry point (@import list only)
tokens/
  colors.css                   — --tp-bg/surface/text/primary/accent + dark theme + derived states
  typography.css                — font families, weights, type scale (desktop + mobile)
  spacing.css                   — 4px spacing scale, radius, container width
  effects.css                   — shadows, glass blur, easing/duration, focus ring
  fonts.css                     — Google Fonts CDN import (Inter, Fredoka, JetBrains Mono)
components/
  core/        — Button, Badge, Card, Icon, ScrollReveal
  forms/       — FileDropzone, Input
  navigation/  — NavBar, Footer, ThemeToggle, BrandMark
  marketing/   — SectionHeader, FormatChip, StatMetric, PricingCard, IndustryCard,
                 StepFlow, ModelNode, OrchestratorDiagram, HeroModelDiagram, ScrollSteps,
                 ProductWindow, LogoStrip, Testimonial
  (each component: Name.jsx + Name.d.ts + Name.prompt.md; one *.card.html per directory)
guidelines/                    — foundation specimen cards (Colors, Type, Spacing, Brand)
ui_kits/
  techperevod-landing/          — full interactive click-through of the techperevod.com homepage
                                   (index.html + LandingPage.jsx + one file per section)
    pages/                       — 4 industry pages (industry-it-saas / -oil-gas / -machinery /
                                   -medtech) + 3 service pages (about, blog, contacts)
    shared/                      — PageShell (nav+footer), PageHero, IndustryPageBody — reused
                                   by every page in pages/
SKILL.md                        — Claude-Code-compatible skill wrapper for this system
readme.md                       — this file
```

## Revision notes (humanizing pass, July 2026)

The homepage originally read as generic/AI-templated: a rounded consumer-app
display face (Fredoka), abstract circle-and-dashed-line "AI orchestrator"
diagrams, symmetric center-aligned sections top to bottom, and zero social
proof beyond placeholder stat numbers. Changed, sitewide:
- **Headline font**: Fredoka → Inter (700/800, tighter tracking) — one
  grotesk family, no more "toy app" signal. See Typography above.
- **Diagrams → product mockups**: `ProductWindow` (browser/app chrome:
  neutral dots + mono URL pill) replaces `OrchestratorDiagram`/
  `HeroModelDiagram` on the homepage — a routing queue and a routing-reason
  table instead of orbiting model bubbles. The old diagram components are
  untouched and still demoed on their own card, in case a future surface
  wants the more abstract treatment.
- **Real social proof**: `LogoStrip` (placeholder client wordmarks) and
  `Testimonial` (quote + initials avatar, no photography per this system's
  no-imagery rule) added to `ProofSection`, both explicitly flagged as
  illustrative in-UI until real customers replace them — same disclosure
  convention as `StatMetric`.
- **Asymmetry**: the orchestrator section now puts its visual on the left
  (Hero's is on the right) instead of repeating the same copy-left/visual-
  right template twice in a row; the glossary and proof sections switched
  from centered headers to left-aligned intros with an unbalanced two-column
  layout (proof: stats+quote grid at 1.3fr/1fr).
- **Copy**: light touch — hero subtitle now leads with what happens to your
  document rather than naming the tech stack first, keeping the same
  specificity (2 minutes, named models) the brief called for.
Glass panels, pill badges, and shadow/radius scale were deliberately left
alone — see Visual foundations above, still current.

## Caveats — please help me iterate

- **The source repo was empty.** Everything here is built from the chat brief,
  not from real code/design files. If you can push actual site code, Figma,
  or brand assets to `alefcom1/techperevod` (or point me at one of the other
  repos on that account), I should redo the token/visual pass against that
  ground truth instead.
- **Heading font is a substitution.** The real logo wordmark's typeface
  isn't a Google Font (near-circular bowls, soft rounded terminals — likely
  custom lettering or a paid face). **Fredoka** was picked as the closest
  free match for all page headings. If you have the actual font's files (or
  even just its name), send them and I'll swap it in exactly.
- **Icons are a substitution** (Lucide, bundled inline — see Iconography)
  since no icon set was provided — flag if the real product uses a
  different icon language.
- **Social-proof metrics are illustrative placeholders** (`40 млн+ слов`,
  `35% экономии`, `2 мин`) — no real numbers were supplied; swap before
  shipping.
- **Fonts load from Google Fonts CDN**, not self-hosted binaries, since no
  webfont files were available to copy in. If self-hosting is required
  (e.g. for the WordPress migration mentioned in the brief), say so and I'll
  restructure `tokens/fonts.css` to local `@font-face`.
- Only one product surface exists (the marketing landing page). The
  "client cabinet" glossary screen is mocked as a small in-page panel, not
  built out as a full second UI kit — tell me if that dashboard should become
  its own surface.
