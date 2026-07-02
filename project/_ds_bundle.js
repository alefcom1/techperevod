/* @ds-bundle: {"format":3,"namespace":"TechperevodDesignSystem_4028dd","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ScrollReveal","sourcePath":"components/core/ScrollReveal.jsx"},{"name":"FileDropzone","sourcePath":"components/forms/FileDropzone.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"FormatChip","sourcePath":"components/marketing/FormatChip.jsx"},{"name":"HeroModelDiagram","sourcePath":"components/marketing/HeroModelDiagram.jsx"},{"name":"IndustryCard","sourcePath":"components/marketing/IndustryCard.jsx"},{"name":"LogoStrip","sourcePath":"components/marketing/LogoStrip.jsx"},{"name":"ModelNode","sourcePath":"components/marketing/ModelNode.jsx"},{"name":"OrchestratorDiagram","sourcePath":"components/marketing/OrchestratorDiagram.jsx"},{"name":"PricingCard","sourcePath":"components/marketing/PricingCard.jsx"},{"name":"ProductWindow","sourcePath":"components/marketing/ProductWindow.jsx"},{"name":"ScrollSteps","sourcePath":"components/marketing/ScrollSteps.jsx"},{"name":"SectionHeader","sourcePath":"components/marketing/SectionHeader.jsx"},{"name":"StatMetric","sourcePath":"components/marketing/StatMetric.jsx"},{"name":"StepFlow","sourcePath":"components/marketing/StepFlow.jsx"},{"name":"Testimonial","sourcePath":"components/marketing/Testimonial.jsx"},{"name":"BrandMark","sourcePath":"components/navigation/BrandMark.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"456b6173b7be","components/core/Button.jsx":"54b6a55e187b","components/core/Card.jsx":"00358fbe8262","components/core/Icon.jsx":"92b574035e6d","components/core/ScrollReveal.jsx":"d6b6d329db14","components/forms/FileDropzone.jsx":"bdc81b856ced","components/forms/Input.jsx":"f0aac4ed5eb2","components/marketing/FormatChip.jsx":"f6c44ebc5f82","components/marketing/HeroModelDiagram.jsx":"8b105e950c79","components/marketing/IndustryCard.jsx":"dd08c6021531","components/marketing/LogoStrip.jsx":"dabd3d80bad9","components/marketing/ModelNode.jsx":"80eab580ff27","components/marketing/OrchestratorDiagram.jsx":"e55889c2f72e","components/marketing/PricingCard.jsx":"f10110ad0155","components/marketing/ProductWindow.jsx":"52fa5e8c301b","components/marketing/ScrollSteps.jsx":"304192ce7221","components/marketing/SectionHeader.jsx":"0b871451574f","components/marketing/StatMetric.jsx":"501546d0d208","components/marketing/StepFlow.jsx":"0b791abdf362","components/marketing/Testimonial.jsx":"173750ea6329","components/navigation/BrandMark.jsx":"097482e172df","components/navigation/Footer.jsx":"2cdf73f01765","components/navigation/NavBar.jsx":"d503593fbcc7","components/navigation/ThemeToggle.jsx":"c502d7864c98","ui_kits/techperevod-landing/B2BSection.jsx":"2e3b270794df","ui_kits/techperevod-landing/BeforeAfterSection.jsx":"6958f08cf10d","ui_kits/techperevod-landing/FormatsSection.jsx":"ba82a158d23f","ui_kits/techperevod-landing/GlossarySection.jsx":"b6a21cc156f1","ui_kits/techperevod-landing/HeroSection.jsx":"9345c4b17460","ui_kits/techperevod-landing/HowItWorksSection.jsx":"e6a1f1b32be6","ui_kits/techperevod-landing/IndustriesSection.jsx":"9a20820f7bd8","ui_kits/techperevod-landing/LandingPage.jsx":"7db92d2abe55","ui_kits/techperevod-landing/OrchestratorSection.jsx":"ae6c0fb80ccf","ui_kits/techperevod-landing/PricingSection.jsx":"7152c06e7e98","ui_kits/techperevod-landing/ProofSection.jsx":"4af0b71ac89b","ui_kits/techperevod-landing/shared/IndustryPageBody.jsx":"11cae1565596","ui_kits/techperevod-landing/shared/PageHero.jsx":"8bd152d73c06","ui_kits/techperevod-landing/shared/PageShell.jsx":"adf945dafac2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TechperevodDesignSystem_4028dd = window.TechperevodDesignSystem_4028dd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Small pill label — plan highlights ("Популярный"), status tags, counts.
 */
function Badge({
  tone = "neutral",
  size = "md",
  children,
  className = ""
}) {
  const classes = ["tp-badge", `tp-badge--${tone}`, `tp-badge--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: classes
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Primary interactive control. Solid primary for the main conversion action
 * (e.g. "Загрузить документ"), ghost/secondary for lower-emphasis actions.
 */
function Button({
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = ["tp-btn", `tp-btn--${variant}`, `tp-btn--${size}`, fullWidth ? "tp-btn--full" : "", className].filter(Boolean).join(" ");
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon && iconPosition === "left" ? /*#__PURE__*/React.createElement("span", {
    className: "tp-btn__icon"
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children), icon && iconPosition === "right" ? /*#__PURE__*/React.createElement("span", {
    className: "tp-btn__icon"
  }, icon) : null);
  if (as === "a") {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: classes,
      "aria-disabled": disabled
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: classes,
    disabled: disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Generic surface container. `variant="glass"` is the brand's signature light
 * glassmorphism treatment — use sparingly (hero panels, floating quote card,
 * pricing cards), not on every box.
 */
function Card({
  variant = "flat",
  padding = "md",
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  const classes = ["tp-card", `tp-card--${variant}`, `tp-card--pad-${padding}`, interactive ? "tp-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/**
 * Icon glyph — renders real Lucide path geometry inline (bundled at author
 * time from lucide-icons/lucide, MIT license), NOT a live CDN fetch/mask.
 * Always uses stroke="currentColor", so it follows text color/theme with
 * zero network dependency. This is the sanctioned way to place icons
 * everywhere in the system — never hand-draw a new icon.
 *
 * To add an icon: copy its <path>/<circle>/... children from
 * https://github.com/lucide-icons/lucide/blob/main/icons/<name>.svg into
 * ICONS below (kebab-case key matching the Lucide filename).
 */
const ICONS = {
  cpu: [["path", {
    d: "M12 20v2"
  }], ["path", {
    d: "M12 2v2"
  }], ["path", {
    d: "M17 20v2"
  }], ["path", {
    d: "M17 2v2"
  }], ["path", {
    d: "M2 12h2"
  }], ["path", {
    d: "M2 17h2"
  }], ["path", {
    d: "M2 7h2"
  }], ["path", {
    d: "M20 12h2"
  }], ["path", {
    d: "M20 17h2"
  }], ["path", {
    d: "M20 7h2"
  }], ["path", {
    d: "M7 20v2"
  }], ["path", {
    d: "M7 2v2"
  }], ["rect", {
    x: 4,
    y: 4,
    width: 16,
    height: 16,
    rx: 2
  }], ["rect", {
    x: 8,
    y: 8,
    width: 8,
    height: 8,
    rx: 1
  }]],
  "cloud-upload": [["path", {
    d: "M12 13v8"
  }], ["path", {
    d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
  }], ["path", {
    d: "m8 17 4-4 4 4"
  }]],
  "shield-check": [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }], ["path", {
    d: "m9 12 2 2 4-4"
  }]],
  database: [["ellipse", {
    cx: 12,
    cy: 5,
    rx: 9,
    ry: 3
  }], ["path", {
    d: "M3 5V19A9 3 0 0 0 21 19V5"
  }], ["path", {
    d: "M3 12A9 3 0 0 0 21 12"
  }]],
  flame: [["path", {
    d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
  }]],
  cog: [["path", {
    d: "M11 10.27 7 3.34"
  }], ["path", {
    d: "m11 13.73-4 6.93"
  }], ["path", {
    d: "M12 22v-2"
  }], ["path", {
    d: "M12 2v2"
  }], ["path", {
    d: "M14 12h8"
  }], ["path", {
    d: "m17 20.66-1-1.73"
  }], ["path", {
    d: "m17 3.34-1 1.73"
  }], ["path", {
    d: "M2 12h2"
  }], ["path", {
    d: "m20.66 17-1.73-1"
  }], ["path", {
    d: "m20.66 7-1.73 1"
  }], ["path", {
    d: "m3.34 17 1.73-1"
  }], ["path", {
    d: "m3.34 7 1.73 1"
  }], ["circle", {
    cx: 12,
    cy: 12,
    r: 2
  }], ["circle", {
    cx: 12,
    cy: 12,
    r: 8
  }]],
  pill: [["path", {
    d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
  }], ["path", {
    d: "m8.5 8.5 7 7"
  }]],
  "plug-zap": [["path", {
    d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
  }], ["path", {
    d: "m2 22 3-3"
  }], ["path", {
    d: "M7.5 13.5 10 11"
  }], ["path", {
    d: "M10.5 16.5 13 14"
  }], ["path", {
    d: "m18 3-4 4h6l-4 4"
  }]],
  "user-round": [["circle", {
    cx: 12,
    cy: 8,
    r: 5
  }], ["path", {
    d: "M20 21a8 8 0 0 0-16 0"
  }]],
  "user-check": [["path", {
    d: "m16 11 2 2 4-4"
  }], ["path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }], ["circle", {
    cx: 9,
    cy: 7,
    r: 4
  }]],
  "package-check": [["path", {
    d: "M12 22V12"
  }], ["path", {
    d: "m16 17 2 2 4-4"
  }], ["path", {
    d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"
  }], ["path", {
    d: "M3.29 7 12 12l8.71-5"
  }], ["path", {
    d: "m7.5 4.27 8.997 5.148"
  }]],
  mail: [["path", {
    d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
  }], ["rect", {
    x: 2,
    y: 4,
    width: 20,
    height: 16,
    rx: 2
  }]],
  phone: [["path", {
    d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
  }]],
  "map-pin": [["path", {
    d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
  }], ["circle", {
    cx: 12,
    cy: 10,
    r: 3
  }]],
  send: [["path", {
    d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
  }], ["path", {
    d: "m21.854 2.147-10.94 10.939"
  }]],
  calendar: [["path", {
    d: "M8 2v4"
  }], ["path", {
    d: "M16 2v4"
  }], ["rect", {
    width: 18,
    height: 18,
    x: 3,
    y: 4,
    rx: 2
  }], ["path", {
    d: "M3 10h18"
  }]],
  gauge: [["path", {
    d: "m12 14 4-4"
  }], ["path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0"
  }]],
  globe: [["circle", {
    cx: 12,
    cy: 12,
    r: 10
  }], ["path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
  }], ["path", {
    d: "M2 12h20"
  }]],
  "file-text": [["path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }], ["path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4"
  }], ["path", {
    d: "M10 9H8"
  }], ["path", {
    d: "M16 13H8"
  }], ["path", {
    d: "M16 17H8"
  }]],
  check: [["path", {
    d: "M20 6 9 17l-5-5"
  }]],
  clock: [["circle", {
    cx: 12,
    cy: 12,
    r: 10
  }], ["polyline", {
    points: "12 6 12 12 16 14"
  }]]
};
function Icon({
  name,
  size = 22,
  color,
  className = "",
  style = {}
}) {
  const children = ICONS[name];
  if (!children) {
    // eslint-disable-next-line no-console
    console.warn(`Icon: unknown name "${name}" — add it to components/core/Icon.jsx ICONS.`);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: ["tp-icon", className].filter(Boolean).join(" "),
    style: {
      flex: "none",
      ...style
    },
    role: "img",
    "aria-label": name
  }, children.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/ScrollReveal.jsx
try { (() => {
/**
 * Generic scroll-reveal wrapper: fades + slides its children up into place
 * the first time they cross into the viewport (IntersectionObserver, fires
 * once). Use `delay` (ms) to stagger siblings — e.g. cards in a grid.
 * Respects prefers-reduced-motion (shows content immediately, no transform).
 */
function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  style = {}
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    // Safety net: if the element is already in view the instant we mount
    // (e.g. always-above-the-fold content, or an observer callback that's
    // delayed/suspended — Chromium pauses IntersectionObserver entirely
    // while a document is hidden, as during prerender/back-forward-cache),
    // reveal immediately via a synchronous rect check rather than waiting
    // on the observer. A short timeout below is a second fallback in case
    // neither the observer nor the sync check ever resolves.
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
    if (alreadyVisible) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.15
    });
    observer.observe(el);
    const fallback = setTimeout(() => setVisible(true), 2000);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: ["tp-reveal", visible ? "tp-reveal--visible" : "", className].filter(Boolean).join(" "),
    style: {
      "--reveal-y": `${y}px`,
      "--reveal-delay": `${delay}ms`,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ScrollReveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ScrollReveal.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileDropzone.jsx
try { (() => {
/**
 * Drag-and-drop file target that drives the "instant quote" flow — the
 * hero's central interaction. Purely presentational; wire onFiles to your
 * own upload/estimate logic.
 */
function FileDropzone({
  accept = ".docx,.pdf,.xliff,.json,.yaml",
  hint = "DOCX, PDF, XLIFF, JSON",
  state = "idle",
  fileName,
  onFiles,
  className = ""
}) {
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);
  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (onFiles && e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-dropzone", dragOver ? "tp-dropzone--over" : "", `tp-dropzone--${state}`, className].filter(Boolean).join(" "),
    onDragOver: e => {
      e.preventDefault();
      setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: handleDrop,
    onClick: () => inputRef.current && inputRef.current.click(),
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: accept,
    hidden: true,
    onChange: e => onFiles && e.target.files.length && onFiles(e.target.files)
  }), /*#__PURE__*/React.createElement("div", {
    className: "tp-dropzone__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4M12 4l-4 4M12 4l4 4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tp-dropzone__text"
  }, state === "done" && fileName ? /*#__PURE__*/React.createElement("span", {
    className: "tp-dropzone__filename"
  }, fileName) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B"), /*#__PURE__*/React.createElement("span", {
    className: "tp-dropzone__hint"
  }, hint))));
}
Object.assign(__ds_scope, { FileDropzone });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileDropzone.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Single-line text input with optional label and leading unit/icon slot. */
function Input({
  label,
  placeholder,
  type = "text",
  suffix,
  mono = false,
  disabled = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["tp-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "tp-field__label"
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    className: "tp-field__control"
  }, /*#__PURE__*/React.createElement("input", _extends({
    className: ["tp-input", mono ? "tp-input--mono" : ""].filter(Boolean).join(" "),
    type: type,
    placeholder: placeholder,
    disabled: disabled
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    className: "tp-field__suffix"
  }, suffix) : null));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FormatChip.jsx
try { (() => {
/** Small chip for file-format names, rendered in monospace — the "лента форматов". */
function FormatChip({
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["tp-format-chip", className].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { FormatChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FormatChip.jsx", error: String((e && e.message) || e) }); }

// components/marketing/IndustryCard.jsx
try { (() => {
/** Icon-card for an industry vertical (IT/SaaS, нефтегаз, машиностроение, медтех). */
function IndustryCard({
  icon,
  name,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-industry-card", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-industry-card__icon"
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: "tp-industry-card__name"
  }, name));
}
Object.assign(__ds_scope, { IndustryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/IndustryCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/LogoStrip.jsx
try { (() => {
/**
 * Grayscale "among our clients" logo wall — real social proof instead of
 * an abstract stat row. No real client logos were supplied yet, so this
 * renders wordmark-style text chips rather than inventing real company
 * marks; pass a visible `caption` disclosing that until real logos land
 * (see readme.md § caveats — same convention as StatMetric's placeholder note).
 */
function LogoStrip({
  logos = [],
  caption,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-logostrip", className].filter(Boolean).join(" ")
  }, caption ? /*#__PURE__*/React.createElement("div", {
    className: "tp-logostrip__caption"
  }, caption) : null, /*#__PURE__*/React.createElement("div", {
    className: "tp-logostrip__row"
  }, logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "tp-logostrip__item"
  }, l))));
}
Object.assign(__ds_scope, { LogoStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/LogoStrip.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ModelNode.jsx
try { (() => {
/**
 * Single LLM/model node used inside OrchestratorDiagram / HeroModelDiagram.
 * Renders as an SVG <g> — must be placed inside an <svg>.
 */
function ModelNode({
  x = 0,
  y = 0,
  label,
  kind = "western",
  r = 28
}) {
  const cls = kind === "local" ? "tp-model-node tp-model-node--local" : "tp-model-node tp-model-node--western";
  return /*#__PURE__*/React.createElement("g", {
    transform: `translate(${x},${y})`,
    className: cls
  }, /*#__PURE__*/React.createElement("circle", {
    r: r,
    className: "tp-model-node__circle"
  }), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    dominantBaseline: "central",
    className: "tp-model-node__label"
  }, label));
}
Object.assign(__ds_scope, { ModelNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ModelNode.jsx", error: String((e && e.message) || e) }); }

// components/marketing/HeroModelDiagram.jsx
try { (() => {
/**
 * Hero visual: model nodes arranged in a ring around a central document,
 * connected by radiating lines with a turquoise pulse traveling outward.
 */
function HeroModelDiagram({
  models = [{
    name: "GPT",
    kind: "western"
  }, {
    name: "Claude",
    kind: "western"
  }, {
    name: "DeepL",
    kind: "western"
  }, {
    name: "YandexGPT",
    kind: "local"
  }, {
    name: "DeepSeek",
    kind: "local"
  }],
  className = ""
}) {
  const size = 420;
  const c = size / 2;
  const ringR = 150;
  const n = models.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    className: ["tp-hero-diagram", className].filter(Boolean).join(" "),
    role: "img",
    "aria-label": "\u0423\u0437\u043B\u044B AI-\u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0432\u043E\u043A\u0440\u0443\u0433 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: ringR,
    className: "tp-hero-diagram__ring"
  }), /*#__PURE__*/React.createElement("g", {
    className: "tp-hero-diagram__lines"
  }, models.map((m, i) => {
    const angle = i / n * Math.PI * 2 - Math.PI / 2;
    const x = c + ringR * Math.cos(angle);
    const y = c + ringR * Math.sin(angle);
    return /*#__PURE__*/React.createElement("line", {
      key: m.name,
      x1: c,
      y1: c,
      x2: x,
      y2: y,
      className: "tp-orchestrator__line " + (m.kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western"),
      style: {
        animationDelay: `${i * 0.2}s`
      }
    });
  })), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${c},${c})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-38",
    y: "-46",
    width: "76",
    height: "92",
    rx: "12",
    className: "tp-orchestrator__doc"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-16,-20 H16 M-16,-4 H16 M-16,12 H4",
    className: "tp-orchestrator__doc-lines"
  })), models.map((m, i) => {
    const angle = i / n * Math.PI * 2 - Math.PI / 2;
    const x = c + ringR * Math.cos(angle);
    const y = c + ringR * Math.sin(angle);
    return /*#__PURE__*/React.createElement(__ds_scope.ModelNode, {
      key: m.name,
      x: x,
      y: y,
      label: m.name,
      kind: m.kind,
      r: 34
    });
  }));
}
Object.assign(__ds_scope, { HeroModelDiagram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/HeroModelDiagram.jsx", error: String((e && e.message) || e) }); }

// components/marketing/OrchestratorDiagram.jsx
try { (() => {
/**
 * The platform's key differentiator visual: document → router → 5 model
 * nodes (western vs local, color-coded) → merged result. Lines carry an
 * animated turquoise "pulse" (disabled under prefers-reduced-motion).
 */
function OrchestratorDiagram({
  models = [{
    name: "GPT",
    kind: "western"
  }, {
    name: "Claude",
    kind: "western"
  }, {
    name: "DeepL",
    kind: "western"
  }, {
    name: "YandexGPT",
    kind: "local"
  }, {
    name: "DeepSeek",
    kind: "local"
  }],
  className = ""
}) {
  const w = 640;
  const h = 320;
  const docX = 46,
    docY = h / 2;
  const routerX = 210,
    routerY = h / 2;
  const nodeX = 430;
  const resultX = 592,
    resultY = h / 2;
  const n = models.length;
  const gap = (h - 60) / (n - 1);
  const nodeYs = models.map((_, i) => 30 + i * gap);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    className: ["tp-orchestrator", className].filter(Boolean).join(" "),
    role: "img",
    "aria-label": "\u0421\u0445\u0435\u043C\u0430 AI-\u043E\u0440\u043A\u0435\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
  }, /*#__PURE__*/React.createElement("g", {
    className: "tp-orchestrator__lines"
  }, /*#__PURE__*/React.createElement("path", {
    d: `M${docX + 34},${docY} H${routerX - 18}`,
    className: "tp-orchestrator__line"
  }), nodeYs.map((ny, i) => /*#__PURE__*/React.createElement("path", {
    key: "in" + i,
    d: `M${routerX + 18},${routerY} C${routerX + 90},${routerY} ${nodeX - 90},${ny} ${nodeX - 30},${ny}`,
    className: "tp-orchestrator__line " + (models[i].kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western"),
    style: {
      animationDelay: `${i * 0.15}s`
    }
  })), nodeYs.map((ny, i) => /*#__PURE__*/React.createElement("path", {
    key: "out" + i,
    d: `M${nodeX + 30},${ny} C${nodeX + 90},${ny} ${resultX - 90},${resultY} ${resultX - 26},${resultY}`,
    className: "tp-orchestrator__line " + (models[i].kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western"),
    style: {
      animationDelay: `${0.3 + i * 0.15}s`
    }
  }))), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${docX},${docY})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-34",
    y: "-24",
    width: "68",
    height: "48",
    rx: "10",
    className: "tp-orchestrator__doc"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-10,-9 V9 M-10,-9 L-2,-9 M-10,3 L4,3",
    className: "tp-orchestrator__doc-lines"
  })), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${routerX},${routerY}) rotate(45)`
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-18",
    y: "-18",
    width: "36",
    height: "36",
    rx: "6",
    className: "tp-orchestrator__router"
  })), models.map((m, i) => /*#__PURE__*/React.createElement(__ds_scope.ModelNode, {
    key: m.name,
    x: nodeX,
    y: nodeYs[i],
    label: m.name,
    kind: m.kind,
    r: 30
  })), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${resultX},${resultY})`
  }, /*#__PURE__*/React.createElement("circle", {
    r: "22",
    className: "tp-orchestrator__result"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-8,0 L-2,7 L9,-8",
    className: "tp-orchestrator__check"
  })));
}
Object.assign(__ds_scope, { OrchestratorDiagram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/OrchestratorDiagram.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PricingCard.jsx
try { (() => {
/**
 * Pricing tier card — composes Card + Badge + Button. Use for the
 * Full / MTPE / Express plan grid.
 */
function PricingCard({
  name,
  description,
  featured = false,
  badge,
  features = [],
  cta = "Загрузить документ",
  onSelect,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-pricing-card", featured ? "tp-pricing-card--featured" : "", className].filter(Boolean).join(" ")
  }, badge ? /*#__PURE__*/React.createElement("span", {
    className: "tp-pricing-card__badge"
  }, badge) : null, /*#__PURE__*/React.createElement("div", {
    className: "tp-pricing-card__name"
  }, name), /*#__PURE__*/React.createElement("p", {
    className: "tp-pricing-card__desc"
  }, description), features.length ? /*#__PURE__*/React.createElement("ul", {
    className: "tp-pricing-card__features"
  }, features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, f))) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tp-pricing-card__cta",
    onClick: onSelect
  }, cta));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProductWindow.jsx
try { (() => {
/**
 * Realistic app/browser-window chrome for product mockups — the system's
 * replacement for abstract node-and-line AI diagrams (see readme.md §
 * revision notes). Minimal top bar (three neutral dots + a mono URL pill)
 * plus a body slot for real-looking mockup content built from existing
 * primitives (Badge for status/model tags, Icon for glyphs, plain rows).
 */
function ProductWindow({
  url = "app.techperevod.com",
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tp-window-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: ["tp-window", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-window__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-window__dots",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "tp-window__url"
  }, url)), /*#__PURE__*/React.createElement("div", {
    className: "tp-window__body"
  }, children)));
}
Object.assign(__ds_scope, { ProductWindow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProductWindow.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ScrollSteps.jsx
try { (() => {
/**
 * Crowdin-style scroll-driven steps: a sticky right-hand panel (icon +
 * title + description, stays static) paired with a left-hand list of step
 * labels that the user scrolls past — the active step is full-size and dark,
 * steps above shrink/fade as they scroll out, steps below sit dim and small
 * until they become active. Purely CSS `position: sticky` + IntersectionObserver
 * driving an `--active` index; no scroll-jacking, no external libs.
 */
function ScrollSteps({
  steps = [],
  className = ""
}) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute("data-idx"));
          setActive(idx);
        }
      });
    }, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0
    });
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-scrollsteps", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-scrollsteps__list"
  }, steps.map((s, i) => {
    const dist = Math.abs(i - active);
    const state = i === active ? "active" : i < active ? "past" : "future";
    return /*#__PURE__*/React.createElement("div", {
      key: s.title,
      ref: el => refs.current[i] = el,
      "data-idx": i,
      className: `tp-scrollsteps__item tp-scrollsteps__item--${state}`,
      style: {
        "--dist": Math.min(dist, 3)
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tp-scrollsteps__num"
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      className: "tp-scrollsteps__label"
    }, s.title));
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-scrollsteps__sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-scrollsteps__panel"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    className: "tp-scrollsteps__panel-content" + (i === active ? " tp-scrollsteps__panel-content--active" : "")
  }, s.icon ? /*#__PURE__*/React.createElement("div", {
    className: "tp-scrollsteps__icon"
  }, s.icon) : null, /*#__PURE__*/React.createElement("div", {
    className: "tp-scrollsteps__panel-title"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "tp-scrollsteps__panel-desc"
  }, s.description), s.bullets ? /*#__PURE__*/React.createElement("ul", {
    className: "tp-scrollsteps__bullets"
  }, s.bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b
  }, b))) : null)), /*#__PURE__*/React.createElement("span", {
    className: "tp-scrollsteps__index"
  }, String(active + 1).padStart(2, "0")))));
}
Object.assign(__ds_scope, { ScrollSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ScrollSteps.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeader.jsx
try { (() => {
/** Centered section intro: eyebrow-free H2 + supporting paragraph. */
function SectionHeader({
  title,
  subtitle,
  align = "center",
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-section-header", `tp-section-header--${align}`, className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("h2", {
    className: "tp-section-header__title"
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "tp-section-header__subtitle"
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatMetric.jsx
try { (() => {
/** Big number + label — social-proof metrics row. */
function StatMetric({
  value,
  label,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-stat", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-stat__value"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "tp-stat__label"
  }, label));
}
Object.assign(__ds_scope, { StatMetric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatMetric.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StepFlow.jsx
try { (() => {
/** Numbered step in a horizontal connected flow (used by "Как работает"). */
function StepFlow({
  steps = [],
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-stepflow", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-stepflow__line",
    "aria-hidden": "true"
  }), steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "tp-stepflow__step",
    key: s.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-stepflow__node"
  }, s.icon || i + 1), /*#__PURE__*/React.createElement("div", {
    className: "tp-stepflow__title"
  }, s.title), s.description ? /*#__PURE__*/React.createElement("div", {
    className: "tp-stepflow__desc"
  }, s.description) : null)));
}
Object.assign(__ds_scope, { StepFlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StepFlow.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Testimonial.jsx
try { (() => {
/**
 * Single customer quote — initials avatar (no photography anywhere in this
 * system by design, see readme.md § Visual foundations), name/role/company.
 * `sample` renders a small "пример" tag so a placeholder quote reads
 * honestly rather than as a real, sourced testimonial.
 */
function Testimonial({
  quote,
  name,
  role,
  company,
  sample = false,
  className = ""
}) {
  const initials = name ? name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() : "";
  return /*#__PURE__*/React.createElement("div", {
    className: ["tp-testimonial", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("p", {
    className: "tp-testimonial__quote"
  }, "\xAB", quote, "\xBB"), /*#__PURE__*/React.createElement("div", {
    className: "tp-testimonial__byline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-testimonial__avatar"
  }, initials), /*#__PURE__*/React.createElement("span", {
    className: "tp-testimonial__who"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-testimonial__name"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "tp-testimonial__role"
  }, role, company ? `, ${company}` : "")), sample ? /*#__PURE__*/React.createElement("span", {
    className: "tp-testimonial__sample"
  }, "\u043F\u0440\u0438\u043C\u0435\u0440") : null));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BrandMark.jsx
try { (() => {
/**
 * The brand lockup (gear/speech-bubble mark + "techperevod.com" wordmark +
 * tagline), theme-matched: picks the light-background or dark-background
 * artwork automatically. Renders as a single raster image (the mark is not
 * reproducible in CSS/SVG) — supply `basePath` as the relative path from
 * your HTML file to the project root so the asset resolves correctly.
 */
function BrandMark({
  theme = "light",
  basePath = "",
  height = 34,
  tagline = true,
  className = "",
  style = {}
}) {
  const src = `${basePath}assets/logo-${theme === "dark" ? "dark" : "light"}.png`;
  // Source art is a 1164x321 lockup incl. tagline; a no-tagline crop keeps
  // just the mark+wordmark row (top ~74% of the asset height) via an
  // overflow clip — vertical crop only, so the container must be sized to
  // the FULL scaled image width (not height*aspect, which is the width for
  // an uncropped render and undershoots once the image is scaled up to make
  // the cropped region equal `height`, clipping the wordmark's right edge).
  const aspect = 1164 / 321;
  const cropRatio = 0.74;
  if (tagline) {
    const width = height * aspect;
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "techperevod.com \u2014 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u044B",
      height: height,
      width: width,
      className: ["tp-brandmark", className].filter(Boolean).join(" "),
      style: {
        display: "block",
        ...style
      }
    });
  }
  const fullHeight = height / cropRatio;
  const fullWidth = fullHeight * aspect;
  return /*#__PURE__*/React.createElement("span", {
    className: ["tp-brandmark", "tp-brandmark--cropped", className].filter(Boolean).join(" "),
    style: {
      display: "inline-block",
      height,
      width: fullWidth,
      overflow: "hidden",
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "techperevod.com",
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: fullHeight,
      width: fullWidth
    }
  }));
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/** Multi-column marketing footer. */
function Footer({
  logo,
  columns = [],
  bottom,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: ["tp-footer", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__brand"
  }, logo), /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__columns"
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__col",
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__col-title"
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#",
    className: "tp-footer__link"
  }, l.label)))))), bottom ? /*#__PURE__*/React.createElement("div", {
    className: "tp-footer__bottom"
  }, bottom) : null);
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/**
 * Sticky top navigation for the marketing site. Logo/name slot on the left,
 * link list centered/right, CTA + theme toggle on the far right.
 */
function NavBar({
  logo,
  links = [],
  cta,
  right,
  className = ""
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: ["tp-nav", scrolled ? "tp-nav--scrolled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-nav__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-nav__logo"
  }, logo), /*#__PURE__*/React.createElement("nav", {
    className: "tp-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#",
    className: "tp-nav__link"
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "tp-nav__right"
  }, right, cta)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
/** Light/dark segmented toggle switch, mirrors data-tp-theme. */
function ThemeToggle({
  theme = "light",
  onChange,
  className = ""
}) {
  const isDark = theme === "dark";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: ["tp-theme-toggle", isDark ? "tp-theme-toggle--dark" : "", className].filter(Boolean).join(" "),
    role: "switch",
    "aria-checked": isDark,
    onClick: () => onChange && onChange(isDark ? "light" : "dark")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-theme-toggle__icon"
  }, "\u263E"), /*#__PURE__*/React.createElement("span", {
    className: "tp-theme-toggle__icon"
  }, "\u2600"), /*#__PURE__*/React.createElement("span", {
    className: "tp-theme-toggle__thumb"
  }));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/B2BSection.jsx
try { (() => {
/* B2BSection — section 8 */
const {
  SectionHeader,
  Card,
  Icon,
  ScrollReveal
} = window.TechperevodDesignSystem_4028dd;
const ITEMS = [{
  icon: "shield-check",
  text: "NDA за 2 часа"
}, {
  icon: "plug-zap",
  text: "API-интеграция в ваш процесс"
}, {
  icon: "database",
  text: "Корпоративная термбаза"
}, {
  icon: "user-round",
  text: "Выделенный менеджер"
}];
function B2BSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    id: "b2b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0414\u043B\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u043E\u0432"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-b2b-grid"
  }, ITEMS.map((it, i) => /*#__PURE__*/React.createElement(ScrollReveal, {
    key: it.text,
    delay: i * 70
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    className: "tp-b2b-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    color: "var(--tp-accent)",
    size: 24
  }), /*#__PURE__*/React.createElement("span", null, it.text)))))));
}
window.B2BSection = B2BSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/B2BSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/BeforeAfterSection.jsx
try { (() => {
/* BeforeAfterSection — section 4 */
const {
  Card
} = window.TechperevodDesignSystem_4028dd;
function BeforeAfterSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    id: "before-after"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section-header-wrap"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "tp-section-header__title",
    style: {
      textAlign: "center"
    }
  }, "\u0420\u0430\u0437\u043D\u0438\u0446\u0430 \u0432\u0438\u0434\u043D\u0430")), /*#__PURE__*/React.createElement("div", {
    className: "tp-before-after"
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    className: "tp-before-after__panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-before-after__label tp-before-after__label--before"
  }, "\u0421\u044B\u0440\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u043D\u044B\u0439 \u043F\u0435\u0440\u0435\u0432\u043E\u0434"), /*#__PURE__*/React.createElement("p", {
    className: "tp-before-after__text"
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u043A\u043B\u0430\u043F\u0430\u043D \u0432 \u0437\u0430\u043A\u0440\u044B\u0442\u043E\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043D\u0430\u0441\u043E\u0441\u0430, \u0434\u043B\u044F \u0438\u0437\u0431\u0435\u0436\u0430\u043D\u0438\u044F \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0437-\u0437\u0430 \u0433\u0438\u0434\u0440\u0430\u0432\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0443\u0434\u0430\u0440 \u0432 \u0442\u0440\u0443\u0431\u043E\u043F\u0440\u043E\u0432\u043E\u0434.")), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    variant: "elevated",
    className: "tp-before-after__panel tp-before-after__panel--after"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-before-after__label tp-before-after__label--after"
  }, "\u0424\u0438\u043D\u0430\u043B \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430-\u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "tp-before-after__text"
  }, "\u041F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u043D\u0430\u0441\u043E\u0441\u0430 \u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043B\u0430\u043F\u0430\u043D \u0432 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \xAB\u0437\u0430\u043A\u0440\u044B\u0442\u043E\xBB \u2014 \u044D\u0442\u043E \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u0442 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u0437-\u0437\u0430 \u0433\u0438\u0434\u0440\u0430\u0432\u043B\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0443\u0434\u0430\u0440\u0430 \u0432 \u0442\u0440\u0443\u0431\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0435.")))));
}
window.BeforeAfterSection = BeforeAfterSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/BeforeAfterSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/FormatsSection.jsx
try { (() => {
/* FormatsSection — section 9 */
const {
  SectionHeader,
  FormatChip
} = window.TechperevodDesignSystem_4028dd;
const FORMATS = ["DOCX", "PDF", "XLIFF", "JSON", "YAML", "DWG", "XLSX", "PO"];
function FormatsSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint",
    id: "formats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "65+ \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0435"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tp-format-strip"
  }, FORMATS.map(f => /*#__PURE__*/React.createElement(FormatChip, {
    key: f
  }, f)))));
}
window.FormatsSection = FormatsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/FormatsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/GlossarySection.jsx
try { (() => {
/* GlossarySection — section 6, "скрин кабинета с глоссарием" */
const {
  SectionHeader,
  ProductWindow,
  Input
} = window.TechperevodDesignSystem_4028dd;
const ROWS = [{
  ru: "привод",
  en: "actuator",
  uses: 24
}, {
  ru: "клапан обратный",
  en: "check valve",
  uses: 17
}, {
  ru: "гидравлический удар",
  en: "hydraulic shock",
  uses: 9
}];
function GlossarySection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    id: "glossary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    align: "left",
    title: "\u0412\u0430\u0448\u0430 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u043B\u043E\u0433\u0438\u044F \u043F\u043E\u0434 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C",
    subtitle: "\u0413\u043B\u043E\u0441\u0441\u0430\u0440\u0438\u0439 \u0438 \u043F\u0430\u043C\u044F\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432 \u043D\u0430 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u044B \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u2014 \u0441\u043A\u0438\u0434\u043A\u0430 \u0432\u0438\u0434\u043D\u0430 \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B."
  }), /*#__PURE__*/React.createElement(ProductWindow, {
    url: "app.techperevod.com/glossary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-glossary__toolbar"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u2026",
    mono: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "tp-glossary__savings"
  }, "\u041F\u043E\u0432\u0442\u043E\u0440\u044B: 18% \xB7 \u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u043E TM: \u221212 400 \u20BD")), /*#__PURE__*/React.createElement("table", {
    className: "tp-glossary__table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u0422\u0435\u0440\u043C\u0438\u043D (RU)"), /*#__PURE__*/React.createElement("th", null, "\u041F\u0435\u0440\u0435\u0432\u043E\u0434 (EN)"), /*#__PURE__*/React.createElement("th", null, "\u041F\u043E\u0432\u0442\u043E\u0440\u043E\u0432"))), /*#__PURE__*/React.createElement("tbody", null, ROWS.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.ru
  }, /*#__PURE__*/React.createElement("td", {
    className: "tp-mono"
  }, r.ru), /*#__PURE__*/React.createElement("td", {
    className: "tp-mono"
  }, r.en), /*#__PURE__*/React.createElement("td", null, r.uses))), /*#__PURE__*/React.createElement("tr", {
    className: "tp-glossary__more"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "3"
  }, "+ 214 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u0432 \u0432 \u0431\u0430\u0437\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0430")))))));
}
window.GlossarySection = GlossarySection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/GlossarySection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/HeroSection.jsx
try { (() => {
/* HeroSection — landing page section 1 */
const {
  Button,
  Card,
  FileDropzone,
  Badge,
  Icon,
  ProductWindow
} = window.TechperevodDesignSystem_4028dd;
function HeroSection() {
  const [quote, setQuote] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  function handleFiles(files) {
    const f = files[0];
    setFileName(f.name);
    // Presentational only — fake instant estimate for the click-through demo.
    setQuote({
      words: "12 400",
      price: "34 800 ₽",
      eta: "2 дня"
    });
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-hero",
    id: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "tp-hero__title"
  }, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0435\u0440\u0435\u0432\u043E\u0434: ", /*#__PURE__*/React.createElement("span", {
    className: "tp-hero__title-accent"
  }, "\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C AI"), ", \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "tp-hero__subtitle"
  }, "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442 \u0441\u0432\u044F\u0437\u043A\u0430 \u0438\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 AI-\u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0438 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430 \u0441 \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u2014 \u0430 \u043E\u0446\u0435\u043D\u043A\u0443 \u043E\u0431\u044A\u0451\u043C\u0430 \u0438 \u0441\u0440\u043E\u043A\u0430 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0443\u0436\u0435 \u0447\u0435\u0440\u0435\u0437 2 \u043C\u0438\u043D\u0443\u0442\u044B \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438."), /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__ctas"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    onClick: () => document.getElementById("quote").scrollIntoView({
      block: "center"
    })
  }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    as: "a",
    href: "#how"
  }, "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442")), /*#__PURE__*/React.createElement("div", {
    id: "quote",
    className: "tp-hero__quote"
  }, /*#__PURE__*/React.createElement(FileDropzone, {
    hint: "DOCX, PDF, XLIFF, JSON",
    state: fileName ? "done" : "idle",
    fileName: fileName,
    onFiles: handleFiles
  }), quote ? /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    padding: "sm",
    className: "tp-hero__estimate"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-value"
  }, quote.words), /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-label"
  }, "\u0441\u043B\u043E\u0432")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-value"
  }, quote.price), /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-label"
  }, "\u043E\u0446\u0435\u043D\u043A\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-value"
  }, quote.eta), /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__estimate-label"
  }, "\u0441\u0440\u043E\u043A")))) : null)), /*#__PURE__*/React.createElement("div", {
    className: "tp-hero__visual"
  }, /*#__PURE__*/React.createElement(ProductWindow, {
    url: "app.techperevod.com/orchestrator"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-queue-row"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 17,
    color: "var(--tp-text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__name"
  }, "tech-drawing-042.dwg"), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    size: "sm"
  }, "YandexGPT"), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__status tp-queue-row__status--done"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13
  }), " \u0413\u043E\u0442\u043E\u0432\u043E")), /*#__PURE__*/React.createElement("div", {
    className: "tp-queue-row"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 17,
    color: "var(--tp-text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__name"
  }, "service-manual-en.docx"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    size: "sm"
  }, "Claude"), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__bar-fill",
    style: {
      width: "68%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tp-queue-row"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 17,
    color: "var(--tp-text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__name"
  }, "patent-claims.pdf"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    size: "sm"
  }, "GPT"), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__bar-fill",
    style: {
      width: "34%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tp-queue-row"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 17,
    color: "var(--tp-text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__name"
  }, "spec-sheet.xlsx"), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    size: "sm"
  }, "DeepSeek"), /*#__PURE__*/React.createElement("span", {
    className: "tp-queue-row__status"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 13
  }), " \u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u0438"))))));
}
window.HeroSection = HeroSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/HeroSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/HowItWorksSection.jsx
try { (() => {
/* HowItWorksSection — section 2. Uses ScrollSteps (Crowdin-style: sticky
   right panel stays fixed, left step list shrinks/fades as you scroll). */
const {
  SectionHeader,
  ScrollSteps,
  ScrollReveal,
  Icon
} = window.TechperevodDesignSystem_4028dd;
function HowItWorksSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0427\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430 \u0434\u043E \u0433\u043E\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430"
  })), /*#__PURE__*/React.createElement(ScrollSteps, {
    steps: [{
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "cloud-upload"
      }),
      title: "Загрузка",
      description: "Загрузите документ любого формата — от DOCX до чертежа DWG. AI сразу оценивает объём и срок.",
      bullets: ["65+ форматов", "Drag-and-drop", "Оценка за 2 минуты"]
    }, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "cpu"
      }),
      title: "AI-оркестрация",
      description: "Роутер выбирает лучшую модель под языковую пару и тип документа — среди западных и локальных моделей.",
      bullets: ["GPT, Claude, DeepL", "YandexGPT, DeepSeek"]
    }, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "user-check"
      }),
      title: "Редактор-инженер",
      description: "AI-черновик проверяет редактор с профильным образованием — терминология и смысл под контролем.",
      bullets: ["Термбаза клиента", "Проверка терминологии"]
    }, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package-check"
      }),
      title: "Сдача",
      description: "Готовый файл — с сохранением исходной верстки, вёрстки таблиц и чертежей.",
      bullets: ["Исходный формат", "Без потери разметки"]
    }]
  })));
}
window.HowItWorksSection = HowItWorksSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/HowItWorksSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/IndustriesSection.jsx
try { (() => {
/* IndustriesSection — section 7. Cards link through to the dedicated
   industry pages under pages/. */
const {
  SectionHeader,
  IndustryCard,
  Icon,
  ScrollReveal
} = window.TechperevodDesignSystem_4028dd;
const INDUSTRIES = [{
  icon: "cpu",
  name: "IT и SaaS",
  href: "pages/industry-it-saas.html"
}, {
  icon: "flame",
  name: "Нефтегаз и энергетика",
  href: "pages/industry-oil-gas.html"
}, {
  icon: "cog",
  name: "Машиностроение",
  href: "pages/industry-machinery.html"
}, {
  icon: "pill",
  name: "Медтех и фарма",
  href: "pages/industry-medtech.html"
}];
function IndustriesSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint",
    id: "industries"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E \u043E\u0442\u0440\u0430\u0441\u043B\u044F\u043C"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-industry-grid"
  }, INDUSTRIES.map((ind, i) => /*#__PURE__*/React.createElement(ScrollReveal, {
    key: ind.name,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("a", {
    href: ind.href,
    style: {
      textDecoration: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(IndustryCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: ind.icon,
      color: "var(--tp-primary)"
    }),
    name: ind.name
  })))))));
}
window.IndustriesSection = IndustriesSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/IndustriesSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/LandingPage.jsx
try { (() => {
/* LandingPage — assembles NavBar + all sections + Footer */
const {
  NavBar,
  Footer,
  ThemeToggle,
  Button,
  BrandMark
} = window.TechperevodDesignSystem_4028dd;
function LandingPage() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem("tp-landing-theme") || "light");
  React.useEffect(() => {
    document.documentElement.setAttribute("data-tp-theme", theme);
    localStorage.setItem("tp-landing-theme", theme);
  }, [theme]);
  return /*#__PURE__*/React.createElement("div", {
    className: "tp-landing"
  }, /*#__PURE__*/React.createElement(NavBar, {
    logo: /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(BrandMark, {
      theme: theme,
      basePath: "../../",
      height: 48,
      tagline: false
    })),
    links: [{
      label: "Как это работает",
      href: "#how"
    }, {
      label: "AI-оркестратор",
      href: "#orchestrator"
    }, {
      label: "Тарифы",
      href: "#pricing"
    }, {
      label: "Отрасли",
      href: "#industries"
    }, {
      label: "Блог",
      href: "pages/blog.html"
    }],
    right: /*#__PURE__*/React.createElement(ThemeToggle, {
      theme: theme,
      onChange: setTheme
    }),
    cta: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      as: "a",
      href: "#hero"
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442")
  }), /*#__PURE__*/React.createElement(HeroSection, null), /*#__PURE__*/React.createElement(HowItWorksSection, null), /*#__PURE__*/React.createElement(OrchestratorSection, null), /*#__PURE__*/React.createElement(BeforeAfterSection, null), /*#__PURE__*/React.createElement(PricingSection, null), /*#__PURE__*/React.createElement(GlossarySection, null), /*#__PURE__*/React.createElement(IndustriesSection, null), /*#__PURE__*/React.createElement(B2BSection, null), /*#__PURE__*/React.createElement(FormatsSection, null), /*#__PURE__*/React.createElement(ProofSection, null), /*#__PURE__*/React.createElement(Footer, {
    logo: /*#__PURE__*/React.createElement(BrandMark, {
      theme: theme,
      basePath: "../../",
      height: 68
    }),
    columns: [{
      title: "Услуги",
      links: [{
        label: "Full",
        href: "#pricing"
      }, {
        label: "MTPE",
        href: "#pricing"
      }, {
        label: "Express",
        href: "#pricing"
      }]
    }, {
      title: "Отрасли",
      links: [{
        label: "IT и SaaS",
        href: "pages/industry-it-saas.html"
      }, {
        label: "Нефтегаз и энергетика",
        href: "pages/industry-oil-gas.html"
      }, {
        label: "Машиностроение",
        href: "pages/industry-machinery.html"
      }, {
        label: "Медтех и фарма",
        href: "pages/industry-medtech.html"
      }]
    }, {
      title: "Платформа",
      links: [{
        label: "AI-оркестратор",
        href: "#orchestrator"
      }, {
        label: "Термбаза и TM",
        href: "#glossary"
      }, {
        label: "Форматы",
        href: "#formats"
      }]
    }, {
      title: "Компания",
      links: [{
        label: "О нас",
        href: "pages/about.html"
      }, {
        label: "Блог",
        href: "pages/blog.html"
      }, {
        label: "Контакты",
        href: "pages/contacts.html"
      }]
    }],
    bottom: /*#__PURE__*/React.createElement("span", null, "\xA9 2026 techperevod.com")
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(LandingPage, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/LandingPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/OrchestratorSection.jsx
try { (() => {
/* OrchestratorSection — section 3, the key differentiator. Visual sits on
   the left here (Hero puts its visual on the right) so the two sections
   don't read as the same template repeated. */
const {
  SectionHeader,
  ProductWindow,
  Badge
} = window.TechperevodDesignSystem_4028dd;
function OrchestratorSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint",
    id: "orchestrator"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner tp-orchestrator-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-orchestrator-layout__diagram",
    style: {
      order: 1
    }
  }, /*#__PURE__*/React.createElement(ProductWindow, {
    url: "app.techperevod.com/router"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-routing-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__doc"
  }, "patent-claims.pdf \xB7 RU\u2192EN"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    size: "sm"
  }, "GPT"), /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__reason"
  }, "\u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u043E\u043A")), /*#__PURE__*/React.createElement("div", {
    className: "tp-routing-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__doc"
  }, "pump-manual.docx \xB7 RU\u2192DE"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    size: "sm"
  }, "DeepL"), /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__reason"
  }, "\u043B\u0443\u0447\u0448\u0435\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430 \u0434\u043B\u044F DE")), /*#__PURE__*/React.createElement("div", {
    className: "tp-routing-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__doc"
  }, "tech-drawing.dwg \xB7 RU\u2192ZH"), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    size: "sm"
  }, "YandexGPT"), /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__reason"
  }, "\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u2014 \u0434\u0435\u0448\u0435\u0432\u043B\u0435 \u0434\u043B\u044F ZH")), /*#__PURE__*/React.createElement("div", {
    className: "tp-routing-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__doc"
  }, "spec-sheet.xlsx \xB7 RU\u2192EN"), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    size: "sm"
  }, "DeepSeek"), /*#__PURE__*/React.createElement("span", {
    className: "tp-routing-row__reason"
  }, "\u0434\u043B\u0438\u043D\u043D\u044B\u0435 \u0442\u0430\u0431\u043B\u0438\u0446\u044B, \u043D\u0438\u0437\u043A\u0430\u044F \u0446\u0435\u043D\u0430")))), /*#__PURE__*/React.createElement("div", {
    className: "tp-orchestrator-layout__copy",
    style: {
      order: 2
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    align: "left",
    title: "\u0415\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0441 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u043A \u043E\u0431\u043E\u0438\u043C \u043A\u043E\u043D\u0442\u0443\u0440\u0430\u043C \u043C\u043E\u0434\u0435\u043B\u0435\u0439",
    subtitle: "GPT, Claude, DeepL \u0438 YandexGPT, DeepSeek \u2014 \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u043E \u0432 \u043E\u0434\u043D\u043E\u043C \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435. \u0420\u043E\u0443\u0442\u0435\u0440 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043C\u043E\u0434\u0435\u043B\u044C \u043F\u043E\u0434 \u044F\u0437\u044B\u043A\u043E\u0432\u0443\u044E \u043F\u0430\u0440\u0443 \u0438 \u0442\u0438\u043F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430, \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442, \u043F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B\u0431\u0440\u0430\u043B \u0438\u043C\u0435\u043D\u043D\u043E \u0435\u0451."
  }), /*#__PURE__*/React.createElement("div", {
    className: "tp-legend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-legend__item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-legend__dot tp-legend__dot--western"
  }), "\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0435 \u043C\u043E\u0434\u0435\u043B\u0438"), /*#__PURE__*/React.createElement("span", {
    className: "tp-legend__item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-legend__dot tp-legend__dot--local"
  }), "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043C\u043E\u0434\u0435\u043B\u0438")), /*#__PURE__*/React.createElement("p", {
    className: "tp-orchestrator-layout__caption"
  }, "\u0422\u0435\u0440\u043C\u0431\u0430\u0437\u0430 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043C\u043E\u043C\u0435\u043D\u0442 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430 \u2014 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u043B\u043E\u0433\u0438\u044F \u0435\u0434\u0438\u043D\u0430 \u0432\u043E \u0432\u0441\u0435\u0445 \u0437\u0430\u043A\u0430\u0437\u0430\u0445"))));
}
window.OrchestratorSection = OrchestratorSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/OrchestratorSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/PricingSection.jsx
try { (() => {
/* PricingSection — section 5 */
const {
  SectionHeader,
  PricingCard,
  Badge,
  ScrollReveal
} = window.TechperevodDesignSystem_4028dd;
function PricingSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0422\u0440\u0438 \u0443\u0440\u043E\u0432\u043D\u044F \u2014 \u0432\u044B \u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0437\u0430 \u043D\u0443\u0436\u043D\u0443\u044E \u0433\u043B\u0443\u0431\u0438\u043D\u0443"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-pricing-grid"
  }, /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 0
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Full",
    description: "\u041F\u0435\u0440\u0435\u0432\u043E\u0434 + \u0440\u0435\u0434\u0430\u043A\u0442\u0443\u0440\u0430 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043E\u043C. \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E.",
    features: ["Перевод инженером-переводчиком", "Полная редактура", "Персональная термбаза"]
  })), /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 90
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "MTPE",
    featured: true,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439"),
    description: "AI-\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A + \u0434\u043E\u0432\u043E\u0434\u043A\u0430 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C. \u0411\u044B\u0441\u0442\u0440\u0435\u0435 \u0438 \u0434\u0435\u0448\u0435\u0432\u043B\u0435.",
    features: ["AI-оркестрация черновика", "Правка инженером-редактором", "Экономия 30–40%"]
  })), /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 180
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Express",
    description: "\u0421\u0440\u043E\u0447\u043D\u0430\u044F \u0441\u0434\u0430\u0447\u0430, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u0430\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u044C.",
    features: ["Приоритетная очередь", "Сдача от 24 часов", "Доплата за срочность"]
  })))));
}
window.PricingSection = PricingSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/PricingSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/ProofSection.jsx
try { (() => {
/* ProofSection — section 10. Illustrative metrics (see readme.md caveats)
   plus real-feeling social proof: a sample customer quote and a client
   logo wall — both explicitly flagged as placeholders until real
   figures/customers replace them. */
const {
  SectionHeader,
  StatMetric,
  LogoStrip,
  Testimonial
} = window.TechperevodDesignSystem_4028dd;
function ProofSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    id: "proof"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-proof-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-proof-layout__stats"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    align: "left",
    title: "\u041D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043B\u043E\u0432\u0430 \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0446\u0438\u0444\u0440\u044B",
    subtitle: "\u0418\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u043F\u0438\u043B\u043E\u0442\u0430; \u043E\u0431\u043D\u043E\u0432\u0438\u043C \u043D\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0438\u0442\u043E\u0433\u0430\u043C \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0438\u043E\u0434\u0430."
  }), /*#__PURE__*/React.createElement("div", {
    className: "tp-proof-row tp-proof-row--left"
  }, /*#__PURE__*/React.createElement(StatMetric, {
    value: "40 \u043C\u043B\u043D+",
    label: "\u0441\u043B\u043E\u0432 \u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043D\u043E"
  }), /*#__PURE__*/React.createElement(StatMetric, {
    value: "35%",
    label: "\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0438 \u043F\u043E TM"
  }), /*#__PURE__*/React.createElement(StatMetric, {
    value: "2 \u043C\u0438\u043D",
    label: "\u0441\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0446\u0435\u043D\u043A\u0438"
  }))), /*#__PURE__*/React.createElement(Testimonial, {
    quote: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u0447\u0435\u0440\u0442\u0435\u0436\u0438 \u0432\u0435\u0447\u0435\u0440\u043E\u043C \u2014 \u0443\u0442\u0440\u043E\u043C \u0443\u0436\u0435 \u0432\u0438\u0434\u0435\u043D \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0439 \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u043E\u0439 \u0442\u0430\u0431\u043B\u0438\u0446, \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0443 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0432\u0435\u0440\u0438\u0442\u044C \u0442\u0435\u0440\u043C\u0438\u043D\u044B.",
    name: "\u0420\u043E\u043C\u0430\u043D \u0421\u043E\u043A\u043E\u043B\u043E\u0432",
    role: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432",
    company: "\u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u044B\u0439 \u0445\u043E\u043B\u0434\u0438\u043D\u0433",
    sample: true
  })), /*#__PURE__*/React.createElement(LogoStrip, {
    caption: "\u041F\u0438\u043B\u043E\u0442\u043D\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B (\u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C\u0438)",
    logos: ["ПРОММАШ", "НЕФТЕСЕРВИС", "МЕДТЕХГРУПП", "ИТ-ВЕКТОР", "ГАЗТЕХНО"]
  })));
}
window.ProofSection = ProofSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/ProofSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/shared/IndustryPageBody.jsx
try { (() => {
/* IndustryPageBody — shared content for every /pages/industry-*.html page.
   Takes a plain `data` object (see the per-industry mount scripts) so the
   4 industry pages stay thin and only differ in content. */
const {
  SectionHeader,
  Card,
  PricingCard,
  Badge,
  IndustryCard,
  FormatChip,
  ScrollSteps,
  ScrollReveal,
  Icon
} = window.TechperevodDesignSystem_4028dd;
function IndustryPageBody({
  data,
  root
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    breadcrumb: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("a", {
      href: root + "index.html"
    }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"), " / ", /*#__PURE__*/React.createElement("a", {
      href: root + "index.html#industries"
    }, "\u041E\u0442\u0440\u0430\u0441\u043B\u0438"), " / ", data.name),
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: data.iconName,
      size: 26
    }),
    title: data.heroTitle,
    subtitle: data.heroSubtitle,
    ctaHref: root + "index.html#hero"
  }), /*#__PURE__*/React.createElement("section", {
    className: "tp-section",
    "data-screen-label": data.slug
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0427\u0442\u043E \u043C\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043C"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-doctype-grid"
  }, data.docTypes.map((d, i) => /*#__PURE__*/React.createElement(ScrollReveal, {
    key: d.title,
    delay: i * 70,
    as: "div"
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    className: "tp-doctype-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-doctype-card__title"
  }, d.title), /*#__PURE__*/React.createElement("p", {
    className: "tp-doctype-card__desc"
  }, d.desc))))))), /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u041A\u0430\u043A \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043F\u0435\u0440\u0435\u0432\u043E\u0434"
  })), /*#__PURE__*/React.createElement(ScrollSteps, {
    steps: data.steps
  }))), /*#__PURE__*/React.createElement("section", {
    className: "tp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0432 \u044D\u0442\u043E\u0439 \u043E\u0442\u0440\u0430\u0441\u043B\u0438"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-format-strip"
  }, data.formats.map(f => /*#__PURE__*/React.createElement(FormatChip, {
    key: f
  }, f))))), /*#__PURE__*/React.createElement("section", {
    className: "tp-section tp-section--tint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0422\u0430\u0440\u0438\u0444\u044B",
    subtitle: "\u0422\u0435 \u0436\u0435 \u0442\u0440\u0438 \u0443\u0440\u043E\u0432\u043D\u044F, \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u0434 \u043E\u0431\u044A\u0451\u043C \u0438 \u0441\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u043E\u0442\u0440\u0430\u0441\u043B\u0435\u0432\u043E\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-pricing-grid"
  }, /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 0
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Full",
    description: "\u041F\u0435\u0440\u0435\u0432\u043E\u0434 + \u0440\u0435\u0434\u0430\u043A\u0442\u0443\u0440\u0430 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043E\u043C \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u043E\u0439 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438.",
    features: ["Инженер-переводчик по отрасли", "Полная редактура", "Персональная термбаза"]
  })), /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "MTPE",
    featured: true,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439"),
    description: "AI-\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A + \u0434\u043E\u0432\u043E\u0434\u043A\u0430 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C.",
    features: ["AI-оркестрация черновика", "Правка инженером", "Экономия 30–40%"]
  })), /*#__PURE__*/React.createElement(ScrollReveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Express",
    description: "\u0421\u0440\u043E\u0447\u043D\u0430\u044F \u0441\u0434\u0430\u0447\u0430, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u0430\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u044C.",
    features: ["Приоритетная очередь", "Сдача от 24 часов"]
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "tp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-section__inner"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u0414\u0440\u0443\u0433\u0438\u0435 \u043E\u0442\u0440\u0430\u0441\u043B\u0438"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tp-industry-grid"
  }, data.otherIndustries.map((ind, i) => /*#__PURE__*/React.createElement(ScrollReveal, {
    key: ind.slug,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("a", {
    href: root + "pages/" + ind.slug + ".html",
    style: {
      textDecoration: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(IndustryCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: ind.iconName,
      color: "var(--tp-primary)"
    }),
    name: ind.name
  }))))))));
}
window.IndustryPageBody = IndustryPageBody;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/shared/IndustryPageBody.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/shared/PageHero.jsx
try { (() => {
/* PageHero — compact interior-page hero: breadcrumb, H1, subtitle, CTA. */
const {
  Button
} = window.TechperevodDesignSystem_4028dd;
function PageHero({
  breadcrumb,
  title,
  subtitle,
  icon,
  ctaHref = "#",
  ctaLabel = "Загрузить документ"
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tp-pagehero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tp-pagehero__inner"
  }, breadcrumb ? /*#__PURE__*/React.createElement("div", {
    className: "tp-pagehero__breadcrumb"
  }, breadcrumb) : null, /*#__PURE__*/React.createElement("div", {
    className: "tp-pagehero__title-row"
  }, icon ? /*#__PURE__*/React.createElement("div", {
    className: "tp-pagehero__icon"
  }, icon) : null, /*#__PURE__*/React.createElement("h1", {
    className: "tp-pagehero__title"
  }, title)), subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "tp-pagehero__subtitle"
  }, subtitle) : null, /*#__PURE__*/React.createElement("div", {
    className: "tp-pagehero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    as: "a",
    href: ctaHref
  }, ctaLabel))));
}
window.PageHero = PageHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/shared/PageHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/techperevod-landing/shared/PageShell.jsx
try { (() => {
/* PageShell — shared Nav + Footer wrapper for every secondary page.
   `root` = relative path from the page's own file to ui_kits/techperevod-landing/
            (e.g. "../" for files in pages/, "./" for index.html itself).
   `assetsRoot` = relative path from the page's own file to the project root
            (for BrandMark/logo assets + the design-system bundle). */
const {
  NavBar,
  Footer,
  ThemeToggle,
  Button,
  BrandMark
} = window.TechperevodDesignSystem_4028dd;
function PageShell({
  theme,
  setTheme,
  root = "../",
  assetsRoot = "../../../",
  children
}) {
  const links = [{
    label: "Как это работает",
    href: root + "index.html#how"
  }, {
    label: "AI-оркестратор",
    href: root + "index.html#orchestrator"
  }, {
    label: "Тарифы",
    href: root + "index.html#pricing"
  }, {
    label: "Отрасли",
    href: root + "index.html#industries"
  }, {
    label: "Блог",
    href: root + "pages/blog.html"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "tp-landing"
  }, /*#__PURE__*/React.createElement(NavBar, {
    logo: /*#__PURE__*/React.createElement("a", {
      href: root + "index.html",
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(BrandMark, {
      theme: theme,
      basePath: assetsRoot,
      height: 48,
      tagline: false
    })),
    links: links,
    right: /*#__PURE__*/React.createElement(ThemeToggle, {
      theme: theme,
      onChange: setTheme
    }),
    cta: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      as: "a",
      href: root + "index.html#hero"
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442")
  }), children, /*#__PURE__*/React.createElement(Footer, {
    logo: /*#__PURE__*/React.createElement(BrandMark, {
      theme: theme,
      basePath: assetsRoot,
      height: 68
    }),
    columns: [{
      title: "Услуги",
      links: [{
        label: "Full",
        href: root + "index.html#pricing"
      }, {
        label: "MTPE",
        href: root + "index.html#pricing"
      }, {
        label: "Express",
        href: root + "index.html#pricing"
      }]
    }, {
      title: "Отрасли",
      links: [{
        label: "IT и SaaS",
        href: root + "pages/industry-it-saas.html"
      }, {
        label: "Нефтегаз и энергетика",
        href: root + "pages/industry-oil-gas.html"
      }, {
        label: "Машиностроение",
        href: root + "pages/industry-machinery.html"
      }, {
        label: "Медтех и фарма",
        href: root + "pages/industry-medtech.html"
      }]
    }, {
      title: "Платформа",
      links: [{
        label: "AI-оркестратор",
        href: root + "index.html#orchestrator"
      }, {
        label: "Термбаза и TM",
        href: root + "index.html#glossary"
      }, {
        label: "Форматы",
        href: root + "index.html#formats"
      }]
    }, {
      title: "Компания",
      links: [{
        label: "О нас",
        href: root + "pages/about.html"
      }, {
        label: "Блог",
        href: root + "pages/blog.html"
      }, {
        label: "Контакты",
        href: root + "pages/contacts.html"
      }]
    }],
    bottom: /*#__PURE__*/React.createElement("span", null, "\xA9 2026 techperevod.com")
  }));
}
window.PageShell = PageShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/techperevod-landing/shared/PageShell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ScrollReveal = __ds_scope.ScrollReveal;

__ds_ns.FileDropzone = __ds_scope.FileDropzone;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.FormatChip = __ds_scope.FormatChip;

__ds_ns.HeroModelDiagram = __ds_scope.HeroModelDiagram;

__ds_ns.IndustryCard = __ds_scope.IndustryCard;

__ds_ns.LogoStrip = __ds_scope.LogoStrip;

__ds_ns.ModelNode = __ds_scope.ModelNode;

__ds_ns.OrchestratorDiagram = __ds_scope.OrchestratorDiagram;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.ProductWindow = __ds_scope.ProductWindow;

__ds_ns.ScrollSteps = __ds_scope.ScrollSteps;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.StatMetric = __ds_scope.StatMetric;

__ds_ns.StepFlow = __ds_scope.StepFlow;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();
