Scroll-driven step explainer in the Crowdin/Linear house style: the right panel is sticky and swaps content as you scroll (icon + title + description + optional bullets); the left column lists every step, with the active one full-size/dark and the rest shrinking + fading by distance from active.

```jsx
<ScrollSteps
  steps={[
    { icon: <Icon name="cloud-upload" />, title: "Загрузка", description: "Загрузите документ любого формата — от DOCX до чертежа DWG.", bullets: ["65+ форматов", "Drag-and-drop"] },
    { icon: <Icon name="cpu" />, title: "AI-оркестрация", description: "Роутер выбирает модель под языковую пару и тип документа." },
    { icon: <Icon name="user-check" />, title: "Редактор-инженер", description: "Профильный редактор проверяет терминологию и смысл." },
    { icon: <Icon name="package-check" />, title: "Сдача", description: "Готовый файл — с сохранением исходной верстки." },
  ]}
/>
```

Needs a tall-enough page (each step reserves scroll space via CSS `min-height`) — don't use for fewer than 3 steps, the sticky panel needs room to feel like it's "stepping." No scroll-jacking: it's built on `position: sticky` + `IntersectionObserver`, so native scroll/scrollbar/back-button behavior is untouched.
