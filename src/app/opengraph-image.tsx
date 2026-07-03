import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Техперевод.com — технический перевод AI + инженер";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0A0F1A 0%, #111E3D 55%, #0A0F1A 100%)",
          color: "#FAFBFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #1B4DFF, #00C4A7)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 800, display: "flex" }}>
            <span style={{ color: "#4D7BFF" }}>tech</span>
            <span>perevod.com</span>
          </div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, maxWidth: 980, display: "flex" }}>
          Технический перевод: AI + инженер
        </div>
        <div style={{ fontSize: 28, color: "#9AA7C4", marginTop: 24, maxWidth: 880, display: "flex" }}>
          Оценка объёма и стоимости — за 2 минуты после загрузки документа
        </div>
      </div>
    ),
    { ...size },
  );
}
