import React from "react";

export interface ModelNodeProps {
  x?: number;
  y?: number;
  label: React.ReactNode;
  kind?: "western" | "local";
  r?: number;
}

/**
 * Single LLM/model node used inside OrchestratorDiagram / HeroModelDiagram.
 * Renders as an SVG <g> — must be placed inside an <svg>.
 */
export function ModelNode({ x = 0, y = 0, label, kind = "western", r = 28 }: ModelNodeProps) {
  const cls = kind === "local" ? "tp-model-node tp-model-node--local" : "tp-model-node tp-model-node--western";
  return (
    <g transform={`translate(${x},${y})`} className={cls}>
      <circle r={r} className="tp-model-node__circle" />
      <text textAnchor="middle" dominantBaseline="central" className="tp-model-node__label">
        {label}
      </text>
    </g>
  );
}
