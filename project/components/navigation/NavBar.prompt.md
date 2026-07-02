Sticky marketing-site header: logo, link list, theme toggle and primary CTA.

```jsx
<NavBar
  logo={<strong>techperevod</strong>}
  links={[{ label: "Тарифы", href: "#pricing" }, { label: "Отрасли", href: "#industries" }]}
  right={<ThemeToggle theme={theme} onChange={setTheme} />}
  cta={<Button size="sm">Загрузить документ</Button>}
/>
```

Fixed/sticky at the top of the page (`position: sticky` is applied by the class). Keep links to 4–6 items; everything else belongs in the Footer.
