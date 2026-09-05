import { ImageResponse } from "next/og";

// Standart Next.js/Vercel logotipi o'rniga o'z brend belgimiz — dinamik
// generatsiya qilingan, rangli fonli "porlash" belgisi (bu fayl favicon.ico
// ni almashtiradi, hech qanday statik shablon rasm ishlatilmaydi).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "#7c3aed",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5c.5 3.2 1.1 5.3 2.3 6.6 1.3 1.3 3.4 1.9 6.6 2.4-3.2.5-5.3 1.1-6.6 2.4-1.2 1.3-1.8 3.4-2.3 6.6-.5-3.2-1.1-5.3-2.3-6.6-1.3-1.3-3.4-1.9-6.6-2.4 3.2-.5 5.3-1.1 6.6-2.4 1.2-1.3 1.8-3.4 2.3-6.6Z"
            fill="#fbbf24"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
