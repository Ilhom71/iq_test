// Har bir savol toifasi uchun mustaqil rang — dizaynda "rang-barang" ko'rinish
// uchun har joyda bitta gradientga tayanish o'rniga har toifaga o'z rangi
// beriladi (CLAUDE.md: rang-barang, gradientni ortiqcha ishlatmaslik).

import { Category } from "@/data/questions";

export interface CategoryTheme {
  /** To'liq to'yingan fon — belgi (badge), faol holatlar uchun */
  solidBg: string;
  /** Matn rangi (och fonlarda) */
  text: string;
  /** Yumshoq fon — karta va halqa (ring) uchun */
  softBg: string;
  ring: string;
  /** Xom hex qiymat — SVG/canvas hisoblashlar uchun (gauge, chart) */
  hex: string;
}

export const CATEGORY_THEME: Record<Category, CategoryTheme> = {
  pattern: {
    solidBg: "bg-violet-600",
    text: "text-violet-700",
    softBg: "bg-violet-50",
    ring: "ring-violet-200",
    hex: "#7c3aed",
  },
  math: {
    solidBg: "bg-teal-600",
    text: "text-teal-700",
    softBg: "bg-teal-50",
    ring: "ring-teal-200",
    hex: "#0d9488",
  },
  logical: {
    solidBg: "bg-amber-500",
    text: "text-amber-700",
    softBg: "bg-amber-50",
    ring: "ring-amber-200",
    hex: "#d97706",
  },
  verbal: {
    solidBg: "bg-rose-600",
    text: "text-rose-700",
    softBg: "bg-rose-50",
    ring: "ring-rose-200",
    hex: "#e11d48",
  },
};
