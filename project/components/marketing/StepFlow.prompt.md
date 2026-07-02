Horizontal 4-step flow with a connecting line behind the numbered nodes — the "Как работает" section.

```jsx
<StepFlow
  steps={[
    { title: "Загрузка" },
    { title: "AI-оркестрация" },
    { title: "Редактор-инженер" },
    { title: "Сдача с сохранением верстки" },
  ]}
/>
```

Pass `icon` (a Lucide element) to replace the default step number. Wraps to 2 columns under 640px automatically.
