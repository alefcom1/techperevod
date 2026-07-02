Icon glyph — renders real Lucide path geometry inline (bundled at author time, MIT-licensed), stroked with `currentColor` so it follows theme/text color automatically with zero network dependency. This is the only sanctioned way to place icons in the system; never hand-draw a new icon SVG.

```jsx
<Icon name="cpu" size={22} color="var(--tp-primary)" />
<Icon name="shield-check" size={20} />
```

Only names present in `Icon.jsx`'s `ICONS` registry work (currently: `cpu`, `cloud-upload`, `shield-check`, `database`, `flame`, `cog`, `pill`, `plug-zap`, `user-round`, `user-check`, `package-check`, `mail`, `phone`, `map-pin`, `send`, `calendar`, `gauge`, `globe`). To add another, copy its path/shape children straight from `lucide-icons/lucide` on GitHub into the registry — see the comment at the top of `Icon.jsx`. See README → Iconography for the full rationale.
