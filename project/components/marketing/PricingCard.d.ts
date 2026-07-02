import { ReactNode } from "react";

export interface PricingCardProps {
  name: string;
  description: string;
  /** Highlights this tier with the accent border + glow (use once — MTPE is "Популярный"). */
  featured?: boolean;
  badge?: ReactNode;
  features?: string[];
  cta?: string;
  onSelect?: () => void;
  className?: string;
}

export function PricingCard(props: PricingCardProps): JSX.Element;
