export interface ThemeToggleProps {
  theme?: "light" | "dark";
  onChange?: (theme: "light" | "dark") => void;
  className?: string;
}

export function ThemeToggle(props: ThemeToggleProps): JSX.Element;
