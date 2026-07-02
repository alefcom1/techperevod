export interface TestimonialProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Marks the quote as an illustrative placeholder (renders a "пример" tag). */
  sample?: boolean;
  className?: string;
}

export function Testimonial(props: TestimonialProps): JSX.Element;
