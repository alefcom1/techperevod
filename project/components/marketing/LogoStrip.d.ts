export interface LogoStripProps {
  /** Placeholder wordmark labels — swap for real client logos when available. */
  logos?: string[];
  caption?: string;
  className?: string;
}

export function LogoStrip(props: LogoStripProps): JSX.Element;
