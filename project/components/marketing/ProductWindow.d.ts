import { ReactNode } from "react";

export interface ProductWindowProps {
  /** Mono label shown in the fake address bar, e.g. "app.techperevod.com/router". */
  url?: string;
  children?: ReactNode;
  className?: string;
}

export function ProductWindow(props: ProductWindowProps): JSX.Element;
