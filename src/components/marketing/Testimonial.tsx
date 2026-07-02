import React from "react";

export interface TestimonialProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  sample?: boolean;
  className?: string;
}

/**
 * Single customer quote — initials avatar (no photography anywhere in this
 * system by design), name/role/company. `sample` renders a small "пример" tag
 * so a placeholder quote reads honestly.
 */
export function Testimonial({ quote, name, role, company, sample = false, className = "" }: TestimonialProps) {
  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";
  return (
    <div className={["tp-testimonial", className].filter(Boolean).join(" ")}>
      <p className="tp-testimonial__quote">«{quote}»</p>
      <div className="tp-testimonial__byline">
        <span className="tp-testimonial__avatar">{initials}</span>
        <span className="tp-testimonial__who">
          <span className="tp-testimonial__name">{name}</span>
          <span className="tp-testimonial__role">
            {role}
            {company ? `, ${company}` : ""}
          </span>
        </span>
        {sample ? <span className="tp-testimonial__sample">пример</span> : null}
      </div>
    </div>
  );
}
