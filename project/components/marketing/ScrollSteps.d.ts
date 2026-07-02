import { ReactNode } from "react";

export interface ScrollStep {
  icon?: ReactNode;
  title: string;
  description: string;
  bullets?: string[];
}

export interface ScrollStepsProps {
  steps: ScrollStep[];
  className?: string;
}

export function ScrollSteps(props: ScrollStepsProps): JSX.Element;
