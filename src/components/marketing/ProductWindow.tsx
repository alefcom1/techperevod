import React from "react";

export interface ProductWindowProps {
  url?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Realistic app/browser-window chrome for product mockups — the system's
 * replacement for abstract node-and-line diagrams. Minimal top bar (three
 * neutral dots + a mono URL pill) plus a body slot for mockup content.
 */
export function ProductWindow({ url = "app.techperevod.com", children, className = "" }: ProductWindowProps) {
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
