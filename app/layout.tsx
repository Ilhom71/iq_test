import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Ikkita zamonaviy shrift: sarlavhalar uchun Sora (geometrik, o'ziga xos),
// matn uchun Plus Jakarta Sans. Jami 2 ta oila — CLAUDE.md qoidasi (max 3).
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IQ Test — Aqliy salohiyatingizni sinab ko'ring",
  description:
    "Adaptiv IQ test: 20 ta savol, javoblaringizga qarab qiyinlik darajasi moslashadi. Bepul va tezkor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${sora.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {children}
        <Footer />
      </body>
    </html>
  );
}
