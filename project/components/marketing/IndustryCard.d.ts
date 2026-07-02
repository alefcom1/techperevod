import { ReactNode } from "react";

export interface IndustryCardProps {
  /** Lucide icon element, e.g. <Cpu size={22} />. */
  icon: ReactNode;
  name: string;
  className?: string;
}

export function IndustryCard(props: IndustryCardProps): JSX.Element;
