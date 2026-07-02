Browser/app-window chrome for realistic product mockups — use this instead of an abstract node-and-line diagram whenever a section needs to show "the platform" visually.

```jsx
<ProductWindow url="app.techperevod.com/router">
  <div className="tp-routing-row">
    <span className="tp-routing-row__doc">patent-claims.pdf · RU→EN</span>
    <Badge tone="primary" size="sm">GPT</Badge>
    <span className="tp-routing-row__reason">юридическая точность формулировок</span>
  </div>
</ProductWindow>
```

Body content should be built from existing primitives (Badge for model/status tags, Icon for glyphs, `.tp-queue-row` / `.tp-routing-row` layout classes in the landing kit) — never hand-draw new chrome inside; the window supplies the frame (dots + mono URL pill) and body padding.
