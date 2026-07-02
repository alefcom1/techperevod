# techperevod.com — Landing page UI kit

Full, interactive click-through recreation of the `techperevod.com` marketing homepage
described in the product brief (no existing codebase was available — the attached
`alefcom1/techperevod` GitHub repo was empty, so this is built directly from the
brand/content brief, see root `readme.md`).

Composed entirely from the design system's `components/` primitives — no one-off
markup for buttons, cards, badges, or icons. Section-by-section:

1. `HeroSection.jsx` — H1/subtitle, CTAs, drag-drop instant-quote demo (`FileDropzone`
   → fake объём/цена/срок), `HeroModelDiagram` visual.
2. `HowItWorksSection.jsx` — 4-step `StepFlow`.
3. `OrchestratorSection.jsx` — the platform's key differentiator: `OrchestratorDiagram`
   with a western/local model legend.
4. `BeforeAfterSection.jsx` — raw MT vs. engineer-edited text split.
5. `PricingSection.jsx` — Full / MTPE / Express `PricingCard` grid.
6. `GlossarySection.jsx` — glossary/TM "личный кабинет" mock (table + savings strip).
7. `IndustriesSection.jsx` — 4 `IndustryCard` tiles.
8. `B2BSection.jsx` — NDA / API / термбаза / менеджер callouts.
9. `FormatsSection.jsx` — supported file-format chip row.
10. `ProofSection.jsx` — social-proof `StatMetric` row (**illustrative placeholder
    numbers** — no real metrics were supplied; swap in real figures before shipping).
11. `LandingPage.jsx` — assembles `NavBar` + all sections + `Footer`, owns the
    light/dark `ThemeToggle` state (persisted to `localStorage`).

Open `index.html` to view/click through it. Toggle the theme switch in the header to
see the dark theme. `landing.css` holds only page-level layout (hero grid, section
rhythm) — every component's own visual style lives in the design system.

## Secondary pages (`pages/`)

- **Industry pages** — `industry-it-saas.html`, `industry-oil-gas.html`,
  `industry-machinery.html`, `industry-medtech.html`. Each renders
  `shared/IndustryPageBody.jsx` with industry-specific data (doc types,
  `ScrollSteps` process, formats, pricing recap, cross-links to the other 3
  industries). Linked from the homepage's industry cards and footer.
- **Service pages** — `about.html`, `blog.html`, `contacts.html`. Standard
  SaaS blocks built from the same component library: About has a values
  grid + stats + CTA banner; Blog is a 6-post card grid (illustrative
  placeholder posts — swap for real content); Contacts has a method grid
  plus a working (client-side-only) quote-request form using `Input` +
  `FileDropzone`.
- **`shared/PageShell.jsx`** — every secondary page's Nav+Footer wrapper,
  wired with real cross-page links (industries, services, homepage anchors)
  and the theme-matched `BrandMark` logo. **`shared/PageHero.jsx`** is the
  compact interior-page hero (breadcrumb + title + subtitle + CTA).

## Motion

`HowItWorksSection` (homepage) and every industry page's "Как проходит
перевод" use `ScrollSteps` — the Crowdin-style sticky-panel scroll block.
Card grids across pricing/industries/B2B and all secondary pages use
`ScrollReveal` for a staggered fade-up entrance. Both live in the design
system's `components/`, not here — see root `readme.md` → Visual
foundations → Motion.
