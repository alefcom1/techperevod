import { ReactNode } from "react";

export interface BadgeProps {
  tone?: "primary" | "accent" | "neutral";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}

export function Badge(props: BadgeProps): JSX.Element;
