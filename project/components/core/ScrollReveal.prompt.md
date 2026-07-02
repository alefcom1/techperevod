Wraps any block and fades/slides it up the first time it scrolls into view — the standard modern-SaaS entrance animation (Linear, Stripe, Crowdin all use a version of this). Fires once, then stays visible.

```jsx
<ScrollReveal><SectionHeader title="…" /></ScrollReveal>

{items.map((it, i) => (
  <ScrollReveal key={it.id} delay={i * 80} as="li">
    <IndustryCard {...it} />
  </ScrollReveal>
))}
```

Use `delay={i * 60-100}` across siblings in a grid/list for a staggered cascade. `as` lets it wrap the right tag (`li`, `article`, …) so it doesn't break grid/flex layouts. Honors `prefers-reduced-motion` by rendering fully visible with no transform.
