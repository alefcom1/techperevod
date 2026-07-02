Labeled text input for forms, calculators and the glossary editor.

```jsx
<Input label="Email для сметы" placeholder="you@company.ru" />
<Input label="Термин" mono suffix="RU→EN" />
```

Set `mono` when the value itself is a term, code or identifier (glossary rows, API keys) to render it in JetBrains Mono. `suffix` renders a trailing adornment inside the field (unit, language pair, icon).
