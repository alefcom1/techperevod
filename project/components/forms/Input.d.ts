import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Trailing unit/adornment, e.g. "слов" or "₽". */
  suffix?: ReactNode;
  /** Use JetBrains Mono — for glossary terms, codes, IDs. */
  mono?: boolean;
  className?: string;
}

export function Input(props: InputProps): JSX.Element;
