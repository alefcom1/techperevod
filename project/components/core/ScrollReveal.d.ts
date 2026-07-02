import { ReactNode, CSSProperties, ElementType } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger delay in ms — pass index*80 across a list of siblings. */
  delay?: number;
  /** Slide-up distance in px. */
  y?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal(props: ScrollRevealProps): JSX.Element;
