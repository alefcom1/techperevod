import { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "flat" | "elevated" | "glass";
  padding?: "sm" | "md" | "lg";
  /** Adds hover lift + pointer cursor for clickable cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card(props: CardProps): JSX.Element;
