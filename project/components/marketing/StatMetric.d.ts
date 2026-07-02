export interface StatMetricProps {
  /** Pre-formatted display value, e.g. "40 млн+", "35%", "2 мин". */
  value: string;
  label: string;
  className?: string;
}

export function StatMetric(props: StatMetricProps): JSX.Element;
