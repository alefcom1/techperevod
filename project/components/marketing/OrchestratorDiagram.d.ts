export interface OrchestratorModel {
  name: string;
  kind: "western" | "local";
}

export interface OrchestratorDiagramProps {
  /** Defaults to GPT/Claude/DeepL (western) + YandexGPT/DeepSeek (local). */
  models?: OrchestratorModel[];
  className?: string;
}

export function OrchestratorDiagram(props: OrchestratorDiagramProps): JSX.Element;
