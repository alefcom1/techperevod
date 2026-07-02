Real logo lockup — gear/speech-bubble mark + "techperevod.com" wordmark + "технические переводы" tagline — sourced from `assets/logo-light.png` / `assets/logo-dark.png` (both transparent-background PNGs, chroma-keyed from the brand's approved concept art). Always theme-matched: the light asset uses navy/blue text for light backgrounds, the dark asset uses white/silver text for dark backgrounds.

```jsx
<BrandMark theme={theme} basePath="../../" />
<BrandMark theme={theme} basePath="../../" height={28} tagline={false} />
```

Used as the `logo` prop for both `NavBar` and `Footer` (see `ui_kits/techperevod-landing/LandingPage.jsx`). `basePath` must be the relative path from the HTML file's own directory to the project root — get this wrong and the image 404s. `tagline={false}` crops out the "технические переводы" line for tight spaces (mobile nav, favicon-adjacent contexts).
