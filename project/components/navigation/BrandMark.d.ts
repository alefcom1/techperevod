import { CSSProperties } from "react";

export interface BrandMarkProps {
  theme?: "light" | "dark";
  /** Relative path from your HTML file to the project root, e.g. "../../". */
  basePath?: string;
  height?: number;
  /** false crops to just the icon+wordmark row, hiding the tagline. */
  tagline?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function BrandMark(props: BrandMarkProps): JSX.Element;
