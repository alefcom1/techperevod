import { OrchestratorModel } from "./OrchestratorDiagram";

export interface HeroModelDiagramProps {
  models?: OrchestratorModel[];
  className?: string;
}

export function HeroModelDiagram(props: HeroModelDiagramProps): JSX.Element;
