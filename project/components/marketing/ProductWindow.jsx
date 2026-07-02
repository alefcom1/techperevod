import React from "react";

/**
 * Realistic app/browser-window chrome for product mockups — the system's
 * replacement for abstract node-and-line AI diagrams (see readme.md §
 * revision notes). Minimal top bar (three neutral dots + a mono URL pill)
 * plus a body slot for real-looking mockup content built from existing
 * primitives (Badge for status/model tags, Icon for glyphs, plain rows).
 */
export function ProductWindow({ url = "app.techperevod.com", children, className = "" }) {
  return (
    <div className="tp-window-frame">
      <div className={["tp-window", className].filter(Boolean).join(" ")}>
        <div className="tp-window__bar">
          <span className="tp-window__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tp-window__url">{url}</span>
        </div>
        <div className="tp-window__body">{children}</div>
      </div>
    </div>
  );
}
