Drag-and-drop file target for the hero "instant quote" interaction — the single most important widget on the landing page.

```jsx
<FileDropzone hint="DOCX, PDF, XLIFF, JSON" onFiles={(files) => estimate(files[0])} />
<FileDropzone state="done" fileName="Инструкция_ГОСТ.docx" />
```

States: `idle` (default), `hover` (dashed border brightens on drag-over automatically), `done` (shows the accepted file name instead of the prompt), `error` (unsupported format). Pair with a result panel showing объём/цена/срок once a file lands.
