import { ImageResponse } from "next/og";

// Ijtimoiy tarmoqlarda (Telegram, Twitter/X, Facebook) havola ulashilganda
// ko'rinadigan dinamik rasm — statik shablon rasm emas, so'rov kelganda
// generatsiya qilinadi. Dizayn tizimidagi toifalar rangidan (lib/theme.ts)
// foydalaniladi, ortiqcha linear-gradient ishlatilmaydi.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = [
  { hex: "#7c3aed" }, // pattern — binafsha
  { hex: "#0d9488" }, // math — teal
  { hex: "#d97706" }, // logical — kahrabo
  { hex: "#e11d48" }, // verbal — pushti-qizil
];

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
          background: "#7c3aed",
        }}
      >
        <div style={{ display: "flex", gap: 14, marginBottom: 36 }}>
          {DOTS.map((d, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                background: d.hex,
                border: "3px solid rgba(255,255,255,0.85)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.5c.5 3.2 1.1 5.3 2.3 6.6 1.3 1.3 3.4 1.9 6.6 2.4-3.2.5-5.3 1.1-6.6 2.4-1.2 1.3-1.8 3.4-2.3 6.6-.5-3.2-1.1-5.3-2.3-6.6-1.3-1.3-3.4-1.9-6.6-2.4 3.2-.5 5.3-1.1 6.6-2.4 1.2-1.3 1.8-3.4 2.3-6.6Z"
              fill="#fbbf24"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            IQ Test Online
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Aqliy salohiyatingizni bepul va adaptiv IQ test orqali sinab ko&apos;ring
        </div>
      </div>
    ),
    { ...size }
  );
}
