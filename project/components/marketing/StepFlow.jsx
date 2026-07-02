import React from "react";

/** Numbered step in a horizontal connected flow (used by "Как работает"). */
export function StepFlow({ steps = [], className = "" }) {
  return (
    <div className={["tp-stepflow", className].filter(Boolean).join(" ")}>
      <div className="tp-stepflow__line" aria-hidden="true" />
      {steps.map((s, i) => (
        <div className="tp-stepflow__step" key={s.title}>
          <div className="tp-stepflow__node">{s.icon || i + 1}</div>
          <div className="tp-stepflow__title">{s.title}</div>
          {s.description ? <div className="tp-stepflow__desc">{s.description}</div> : null}
        </div>
      ))}
    </div>
  );
}
