import React from "react";

/**
 * Icon glyph — renders real Lucide path geometry inline (MIT license), NOT a
 * live CDN fetch/mask. Always uses stroke="currentColor", so it follows text
 * colour/theme with zero network dependency.
 *
 * To add an icon: copy its child elements from lucide-icons/lucide into ICONS
 * (kebab-case key matching the Lucide filename).
 */
type IconChild = [string, Record<string, string | number>];

const ICONS: Record<string, IconChild[]> = {
  cpu: [
    ["path", { d: "M12 20v2" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M17 20v2" }],
    ["path", { d: "M17 2v2" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M2 17h2" }],
    ["path", { d: "M2 7h2" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "M20 17h2" }],
    ["path", { d: "M20 7h2" }],
    ["path", { d: "M7 20v2" }],
    ["path", { d: "M7 2v2" }],
    ["rect", { x: 4, y: 4, width: 16, height: 16, rx: 2 }],
    ["rect", { x: 8, y: 8, width: 8, height: 8, rx: 1 }],
  ],
  "cloud-upload": [
    ["path", { d: "M12 13v8" }],
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "m8 17 4-4 4 4" }],
  ],
  "shield-check": [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4" }],
  ],
  database: [
    ["ellipse", { cx: 12, cy: 5, rx: 9, ry: 3 }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12" }],
  ],
  flame: [
    ["path", { d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" }],
  ],
  cog: [
    ["path", { d: "M11 10.27 7 3.34" }],
    ["path", { d: "m11 13.73-4 6.93" }],
    ["path", { d: "M12 22v-2" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M14 12h8" }],
    ["path", { d: "m17 20.66-1-1.73" }],
    ["path", { d: "m17 3.34-1 1.73" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "m20.66 17-1.73-1" }],
    ["path", { d: "m20.66 7-1.73 1" }],
    ["path", { d: "m3.34 17 1.73-1" }],
    ["path", { d: "m3.34 7 1.73 1" }],
    ["circle", { cx: 12, cy: 12, r: 2 }],
    ["circle", { cx: 12, cy: 12, r: 8 }],
  ],
  pill: [
    ["path", { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" }],
    ["path", { d: "m8.5 8.5 7 7" }],
  ],
  "plug-zap": [
    ["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
    ["path", { d: "m2 22 3-3" }],
    ["path", { d: "M7.5 13.5 10 11" }],
    ["path", { d: "M10.5 16.5 13 14" }],
    ["path", { d: "m18 3-4 4h6l-4 4" }],
  ],
  "user-round": [
    ["circle", { cx: 12, cy: 8, r: 5 }],
    ["path", { d: "M20 21a8 8 0 0 0-16 0" }],
  ],
  "user-check": [
    ["path", { d: "m16 11 2 2 4-4" }],
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: 9, cy: 7, r: 4 }],
  ],
  "package-check": [
    ["path", { d: "M12 22V12" }],
    ["path", { d: "m16 17 2 2 4-4" }],
    ["path", { d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" }],
    ["path", { d: "M3.29 7 12 12l8.71-5" }],
    ["path", { d: "m7.5 4.27 8.997 5.148" }],
  ],
  mail: [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    ["rect", { x: 2, y: 4, width: 20, height: 16, rx: 2 }],
  ],
  phone: [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      },
    ],
  ],
  "map-pin": [
    ["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }],
    ["circle", { cx: 12, cy: 10, r: 3 }],
  ],
  send: [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939" }],
  ],
  calendar: [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: 18, height: 18, x: 3, y: 4, rx: 2 }],
    ["path", { d: "M3 10h18" }],
  ],
  gauge: [
    ["path", { d: "m12 14 4-4" }],
    ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }],
  ],
  globe: [
    ["circle", { cx: 12, cy: 12, r: 10 }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }],
  ],
  "file-text": [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M10 9H8" }],
    ["path", { d: "M16 13H8" }],
    ["path", { d: "M16 17H8" }],
  ],
  check: [["path", { d: "M20 6 9 17l-5-5" }]],
  clock: [
    ["circle", { cx: 12, cy: 12, r: 10 }],
    ["polyline", { points: "12 6 12 12 16 14" }],
  ],
};

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 22, color, className = "", style = {} }: IconProps) {
  const children = ICONS[name];
  if (!children) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`Icon: unknown name "${name}" — add it to components/core/Icon.tsx ICONS.`);
    }
    return null;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["tp-icon", className].filter(Boolean).join(" ")}
      style={{ flex: "none", ...style }}
      role="img"
      aria-label={name}
    >
      {children.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
