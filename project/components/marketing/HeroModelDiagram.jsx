import React from "react";
import { ModelNode } from "./ModelNode.jsx";

/**
 * Hero visual: model nodes arranged in a ring around a central document,
 * connected by radiating lines with a turquoise pulse traveling outward.
 */
export function HeroModelDiagram({
  models = [
    { name: "GPT", kind: "western" },
    { name: "Claude", kind: "western" },
    { name: "DeepL", kind: "western" },
    { name: "YandexGPT", kind: "local" },
    { name: "DeepSeek", kind: "local" },
  ],
  className = "",
}) {
  const size = 420;
  const c = size / 2;
  const ringR = 150;
  const n = models.length;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={["tp-hero-diagram", className].filter(Boolean).join(" ")} role="img" aria-label="Узлы AI-моделей вокруг документа">
      <circle cx={c} cy={c} r={ringR} className="tp-hero-diagram__ring" />
      <g className="tp-hero-diagram__lines">
        {models.map((m, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = c + ringR * Math.cos(angle);
          const y = c + ringR * Math.sin(angle);
          return (
            <line
              key={m.name}
              x1={c}
              y1={c}
              x2={x}
              y2={y}
              className={"tp-orchestrator__line " + (m.kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western")}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}
      </g>

      <g transform={`translate(${c},${c})`}>
        <rect x="-38" y="-46" width="76" height="92" rx="12" className="tp-orchestrator__doc" />
        <path d="M-16,-20 H16 M-16,-4 H16 M-16,12 H4" className="tp-orchestrator__doc-lines" />
      </g>

      {models.map((m, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = c + ringR * Math.cos(angle);
        const y = c + ringR * Math.sin(angle);
        return <ModelNode key={m.name} x={x} y={y} label={m.name} kind={m.kind} r={34} />;
      })}
    </svg>
  );
}
