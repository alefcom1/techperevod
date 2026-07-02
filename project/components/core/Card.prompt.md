Generic surface container — the base for pricing cards, industry tiles, and the glossary panel.

```jsx
<Card variant="glass" padding="lg">…</Card>
<Card variant="elevated" interactive>…</Card>
```

`flat` = surface color + hairline border, no shadow (default, dense grids). `elevated` = surface + `--tp-shadow` (pricing, feature callouts). `glass` = translucent `--tp-glass` background + blur + soft border — the brand's signature light glassmorphism; reserve for 1–2 hero-adjacent panels per screen, not every card. `interactive` adds a hover lift transition.
