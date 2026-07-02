SVG circle node for one model, sized/colored by "western" vs "local". Must be rendered inside an `<svg>` — used internally by `OrchestratorDiagram` and `HeroModelDiagram`, exposed separately if you need a custom layout.

```jsx
<svg viewBox="0 0 200 200">
  <ModelNode x={60} y={60} label="GPT" kind="western" />
  <ModelNode x={140} y={140} label="YandexGPT" kind="local" />
</svg>
```
