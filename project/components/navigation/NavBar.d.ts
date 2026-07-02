import { ReactNode } from "react";

export interface NavLink {
  label: string;
  href?: string;
}

export interface NavBarProps {
  logo?: ReactNode;
  links?: NavLink[];
  cta?: ReactNode;
  /** Extra slot before the CTA — typically <ThemeToggle />. */
  right?: ReactNode;
  className?: string;
}

export function NavBar(props: NavBarProps): JSX.Element;
