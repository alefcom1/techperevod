import { ReactNode } from "react";

export interface ButtonProps {
  /** Visual weight. Primary = solid brand blue, used for the single main CTA per section. */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Optional icon element (e.g. from lucide-react) shown beside the label. */
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Render as <a> instead of <button> for navigational CTAs. */
  as?: "button" | "a";
  href?: string;
  className?: string;
  children: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
