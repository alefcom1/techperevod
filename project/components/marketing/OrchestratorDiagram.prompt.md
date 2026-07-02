The platform's signature visual for the "AI-оркестратор" section: a document flows into a router, fans out to 5 model nodes (western models in brand blue, local models in turquoise), and merges into a result. Lines carry an animated dash pulse.

```jsx
<div style={{maxWidth: 640}}>
  <OrchestratorDiagram />
</div>
```

Pass a custom `models` array to swap which engines are shown; `kind` controls the color coding (`western` = blue, `local` = turquoise) — this is the diagram's whole point, so keep exactly two kinds. Fully responsive (scales with container width via viewBox). Animation respects `prefers-reduced-motion`.
