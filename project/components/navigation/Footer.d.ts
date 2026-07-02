import { ReactNode } from "react";

export interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

export interface FooterProps {
  logo?: ReactNode;
  columns?: FooterColumn[];
  bottom?: ReactNode;
  className?: string;
}

export function Footer(props: FooterProps): JSX.Element;
