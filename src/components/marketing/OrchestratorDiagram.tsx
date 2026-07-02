import React from "react";
import { ModelNode } from "./ModelNode";

interface Model {
  name: string;
  kind: "western" | "local";
}

export interface OrchestratorDiagramProps {
  models?: Model[];
  className?: string;
}

const DEFAULT_MODELS: Model[] = [
  { name: "GPT", kind: "western" },
  { name: "Claude", kind: "western" },
  { name: "DeepL", kind: "western" },
  { name: "YandexGPT", kind: "local" },
  { name: "DeepSeek", kind: "local" },
];

/**
 * Document → router → 5 model nodes (western vs local, colour-coded) → merged
 * result. Lines carry an animated turquoise "pulse" (disabled under
 * prefers-reduced-motion).
 */
export function OrchestratorDiagram({ models = DEFAULT_MODELS, className = "" }: OrchestratorDiagramProps) {
  const w = 640;
  const h = 320;
  const docX = 46;
  const docY = h / 2;
  const routerX = 210;
  const routerY = h / 2;
  const nodeX = 430;
  const resultX = 592;
  const resultY = h / 2;
  const n = models.length;
  const gap = (h - 60) / (n - 1);
  const nodeYs = models.map((_, i) => 30 + i * gap);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={["tp-orchestrator", className].filter(Boolean).join(" ")}
      role="img"
      aria-label="Схема AI-оркестратора"
    >
      <g className="tp-orchestrator__lines">
        <path d={`M${docX + 34},${docY} H${routerX - 18}`} className="tp-orchestrator__line" />
        {nodeYs.map((ny, i) => (
          <path
            key={"in" + i}
            d={`M${routerX + 18},${routerY} C${routerX + 90},${routerY} ${nodeX - 90},${ny} ${nodeX - 30},${ny}`}
            className={
              "tp-orchestrator__line " +
              (models[i].kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western")
            }
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {nodeYs.map((ny, i) => (
          <path
            key={"out" + i}
            d={`M${nodeX + 30},${ny} C${nodeX + 90},${ny} ${resultX - 90},${resultY} ${resultX - 26},${resultY}`}
            className={
              "tp-orchestrator__line " +
              (models[i].kind === "local" ? "tp-orchestrator__line--local" : "tp-orchestrator__line--western")
            }
            style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          />
        ))}
      </g>

      <g transform={`translate(${docX},${docY})`}>
        <rect x="-34" y="-24" width="68" height="48" rx="10" className="tp-orchestrator__doc" />
        <path d="M-10,-9 V9 M-10,-9 L-2,-9 M-10,3 L4,3" className="tp-orchestrator__doc-lines" />
      </g>

      <g transform={`translate(${routerX},${routerY}) rotate(45)`}>
        <rect x="-18" y="-18" width="36" height="36" rx="6" className="tp-orchestrator__router" />
      </g>

      {models.map((m, i) => (
        <ModelNode key={m.name} x={nodeX} y={nodeYs[i]} label={m.name} kind={m.kind} r={30} />
      ))}

      <g transform={`translate(${resultX},${resultY})`}>
        <circle r="22" className="tp-orchestrator__result" />
        <path d="M-8,0 L-2,7 L9,-8" className="tp-orchestrator__check" />
      </g>
    </svg>
  );
}
