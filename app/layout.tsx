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

const SITE_NAME = "IQ Test Online";
const SITE_DESCRIPTION =
  "Bepul onlayn IQ test — 20 ta adaptiv savol orqali aqliy salohiyatingizni (IQ darajangizni) aniq va tezkor tarzda o'lchang. Ro'yxatdan o'tish shart emas, natija darhol ekranda: mantiqiy, arifmetik, og'zaki va naqshli savollar.";
const SITE_KEYWORDS = [
  "IQ test",
  "IQ test online",
  "IQ test o'zbek tilida",
  "IQ test bepul",
  "aqliy salohiyat testi",
  "aql darajasini aniqlash",
  "IQ aniqlash",
  "IQ hisoblash",
  "IQ darajasi",
  "IQ testi natijasi",
  "intellekt testi",
  "mantiqiy fikrlash testi",
  "arifmetik test",
  "og'zaki test",
  "naqsh test",
  "adaptiv test",
  "psixologik test",
  "aqliy qobiliyat testi",
  "IQ o'lchash",
  "onlayn test uzbek",
  "bepul psixologik test",
  "IQ test topshirish",
  "aql testi",
  "IQ level test",
  "iq test sinov",
];

// Production domenini hosting joylashtirilgandan keyin NEXT_PUBLIC_SITE_URL
// env o'zgaruvchisi orqali beriladi (kod domenni taxmin qilmaydi/hardcode
// qilmaydi) — o'rnatilmagan bo'lsa OG rasmlari lokal manzilga tushadi.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${SITE_NAME} — Aqliy salohiyatingizni bepul sinab ko'ring`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "IQ Test Online" }],
  creator: "IQ Test Online",
  publisher: "IQ Test Online",
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      uz: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Aqliy salohiyatingizni bepul sinab ko'ring`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IQ Test Online — bepul adaptiv IQ testi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Aqliy salohiyatingizni bepul sinab ko'ring`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
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
