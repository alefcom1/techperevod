Multi-column marketing footer with brand mark and a bottom bar.

```jsx
<Footer
  logo={<strong>techperevod</strong>}
  columns={[
    { title: "Услуги", links: [{ label: "Full" }, { label: "MTPE" }, { label: "Express" }] },
    { title: "Отрасли", links: [{ label: "IT и SaaS" }, { label: "Нефтегаз" }] },
  ]}
  bottom={<span>© 2026 techperevod</span>}
/>
```

Brief's column set is Услуги / Отрасли / Платформа / Компания. `bottom` renders full-width beneath the columns (copyright, legal links).
