import { ReactNode } from "react";

export interface StepFlowStep {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export interface StepFlowProps {
  steps: StepFlowStep[];
  className?: string;
}

export function StepFlow(props: StepFlowProps): JSX.Element;
