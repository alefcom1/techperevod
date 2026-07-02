Monospace chip naming a supported file format — used in a horizontal "лента форматов" row.

```jsx
{["DOCX","PDF","XLIFF","JSON","YAML","DWG","XLSX","PO"].map(f => <FormatChip key={f}>{f}</FormatChip>)}
```

Always JetBrains Mono per the type system's rule that terms/codes/formats render in mono, never Inter.
