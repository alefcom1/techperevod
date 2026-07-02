import { CSSProperties } from "react";

export interface IconProps {
  /** kebab-case Lucide icon name, e.g. "cpu", "cloud-upload", "shield-check" — must exist in Icon.jsx's ICONS registry. */
  name: string;
  size?: number;
  /** CSS color; defaults to inherited currentColor. */
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon(props: IconProps): JSX.Element;
