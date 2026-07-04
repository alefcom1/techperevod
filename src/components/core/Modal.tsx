"use client";

import React from "react";

export interface ModalProps {
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: number;
  children: React.ReactNode;
}

/** Generic centered modal shell — backdrop click / Escape to close. */
export function Modal({ onClose, title, subtitle, footer, maxWidth = 640, children }: ModalProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="tp-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tp-modal" style={{ maxWidth }}>
        <button className="tp-modal__close" onClick={onClose} aria-label="Закрыть" type="button">
          ×
        </button>
        {title || subtitle ? (
          <div className="tp-modal__header">
            {title ? <div className="tp-modal__title">{title}</div> : null}
            {subtitle ? <div className="tp-modal__subtitle">{subtitle}</div> : null}
          </div>
        ) : null}
        <div className="tp-modal__body">{children}</div>
        {footer ? <div className="tp-modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
