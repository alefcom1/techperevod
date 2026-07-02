Solid/secondary/ghost button for CTAs, forms and toolbar actions.

```jsx
<Button variant="primary" size="lg">Загрузить документ</Button>
<Button variant="secondary" size="md">Как это работает</Button>
<Button variant="ghost" size="sm" icon={<UploadIcon size={16} />}>Прикрепить файл</Button>
```

Variants: `primary` (solid `--tp-primary`, main conversion action — use once per section), `secondary` (outlined, `--tp-border` + text), `ghost` (no border, text-only, lowest emphasis). Sizes: `sm` / `md` / `lg`. Set `disabled` for unavailable actions; set `as="a" href="…"` for link-styled CTAs.
