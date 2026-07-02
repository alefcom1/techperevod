Light/dark theme switch. Drives `data-tp-theme` on the page root.

```jsx
const [theme, setTheme] = useState("light");
useEffect(() => { document.documentElement.setAttribute("data-tp-theme", theme); }, [theme]);
<ThemeToggle theme={theme} onChange={setTheme} />
```

Lives in the `NavBar`'s `right` slot. Purely a switch — the actual attribute-setting/persistence is the host app's job (see `ui_kits/techperevod-landing`).
