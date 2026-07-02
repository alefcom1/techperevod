import React from "react";

export interface StepFlowStep {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export interface StepFlowProps {
  steps?: StepFlowStep[];
  className?: string;
}

/** Numbered step in a horizontal connected flow. */
export function StepFlow({ steps = [], className = "" }: StepFlowProps) {
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
