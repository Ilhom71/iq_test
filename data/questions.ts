// Savollar banki — IQ Test Website
// Har bir savol: toifa, qiyinlik darajasi (1-5), matn, 4 variant, to'g'ri javob indeksi.
// Qoidalar CLAUDE.md va PLAN.md § 4-5 da tavsiflangan.

export type Category = "logical" | "math" | "verbal" | "pattern";

// "Vizual mantiq" toifasida arifmetik amal (qo'shish/ayirish/ko'paytirish/
// bo'lish) YO'Q — bular chinakam MANTIQIY matritsa (Raven uslubidagi)
// jumboqlari: 2x2/3x3 to'rda qator va ustun bo'yicha qoida (shakl/rang/
// o'lcham "lotin kvadrati" tarzida takrorlanmay taqsimlangan) bo'ladi va
// yetishmagan katak topiladi — chinakam xulosa chiqarish (eliminatsiya)
// talab qiladi, oddiy "farqni top"dan ancha qiyinroq (min. yosh ~14-15).
// Shakllar haqiqiy rasm fayl/emoji emas — components/ShapeGroup.tsx da SVG
// bilan (tekis rang, yumaloq burchakli, soyali) chiziladi.
export type ShapeKind =
  | "triangle"
  | "circle"
  | "square"
  | "diamond"
  | "pentagon"
  | "hexagon"
  | "star";

/** Shakl rangi mavzusi — har bir shaklning o'z tabiiy rangi bor, lekin
 *  matritsa jumboqlarida qoidaga ko'ra boshqa rang bilan beriladi. "slate"
 *  — neytral/"faol emas" belgi uchun (masalan diagonal jumboqlarda). */
export type HueName = "amber" | "cyan" | "rose" | "violet" | "emerald" | "sky" | "pink" | "slate";

export interface ShapeItem {
  kind: ShapeKind;
  /** berilmasa — shu shaklning o'z standart rangi ishlatiladi */
  hue?: HueName;
  /** piksellarda o'lcham; berilmasa standart (kattalik bilan farqlash savollari uchun) */
  size?: number;
  /** gradus, yo'nalish bilan farqlash savollari uchun */
  rotate?: number;
  /** nechta nusxada ko'rsatiladi (standart 1) — "soni ortib boradi" savollari uchun */
  count?: number;
  /** false bo'lsa — shakl ichi bo'sh, faqat kontur chiziladi (standart: to'liq) */
  filled?: boolean;
}

/** Shakllar qatori — savol matnida tavsiflangan taqqoslash uchun. */
export interface ShapeGroupVisual {
  kind: "shape-group";
  items: ShapeItem[];
}

/** Mantiqiy matritsa — qator-ustun to'r, `cols` ustunli, `cells` qator
 *  bo'yicha tartiblangan; ro'yxatdagi aynan bitta `null` — "?" qidirilgan
 *  katak (u har doim so'nggi katak sifatida beriladi). */
export interface ShapeMatrixVisual {
  kind: "shape-matrix";
  cols: number;
  cells: (ShapeItem | null)[];
}

/** Chapdan o'ngga o'qiladigan ketma-ketlik ("naqshni davom ettiring" uslubi)
 *  — oxirgi (yoki istalgan) elementi `null` bo'lsa, o'sha joyda "?" chiziladi. */
export interface ShapeSequenceVisual {
  kind: "shape-sequence";
  steps: (ShapeItem | null)[];
}

export interface Question {
  id: string;
  category: Category;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  options: string[];
  correctIndex: number;
  /** faqat "math" va "pattern" toifasidagi shakl-jumboq savollarida mavjud */
  visual?: ShapeGroupVisual | ShapeMatrixVisual | ShapeSequenceVisual;
  /** berilsa — javob variantlari matn o'rniga shu shakllar bilan chiziladi
   *  (options massivi bilan bir xil tartibda, faqat ekran o'quvchisi uchun) */
  optionShapes?: ShapeItem[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  logical: "Mantiqiy ketma-ketlik",
  math: "Vizual mantiq",
  verbal: "Og'zaki analogiya",
  pattern: "Naqsh / Matritsa",
};

export const questions: Question[] = [
  // ---------- LOGICAL ----------
  { id: "log-1-1", category: "logical", difficulty: 1, prompt: "Ketma-ketlikni davom ettiring:\n2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], correctIndex: 1 },
  // Diqqat: A/B/C/D harflari ishlatilmaydi — ular javob variantlarining
  // pozitsiya belgisi (A/B/C/D) bilan chalkashib, savolni chalkash qilib
  // qo'yardi. Shuning uchun alifboning boshqa qismidan olingan.
  { id: "log-1-2", category: "logical", difficulty: 1, prompt: "Ketma-ketlikni davom ettiring:\nF, G, H, I, ?", options: ["I", "J", "K", "H"], correctIndex: 1 },
  { id: "log-1-3", category: "logical", difficulty: 1, prompt: "Ketma-ketlikni davom ettiring:\n1, 2, 3, 4, ?", options: ["4", "5", "6", "7"], correctIndex: 1 },

  { id: "log-2-1", category: "logical", difficulty: 2, prompt: "Ketma-ketlikni davom ettiring:\n3, 6, 9, 12, ?", options: ["13", "14", "15", "16"], correctIndex: 2 },
  { id: "log-2-2", category: "logical", difficulty: 2, prompt: "Ketma-ketlikni davom ettiring:\n1, 4, 7, 10, ?", options: ["11", "12", "13", "14"], correctIndex: 2 },
  { id: "log-2-3", category: "logical", difficulty: 2, prompt: "Ketma-ketlikni davom ettiring:\nZ, Y, X, W, ?", options: ["U", "V", "T", "W"], correctIndex: 1 },

  { id: "log-3-1", category: "logical", difficulty: 3, prompt: "Ketma-ketlikni davom ettiring:\n2, 4, 8, 16, ?", options: ["24", "28", "30", "32"], correctIndex: 3 },
  { id: "log-3-2", category: "logical", difficulty: 3, prompt: "Ketma-ketlikni davom ettiring:\n1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "14"], correctIndex: 2 },
  { id: "log-3-3", category: "logical", difficulty: 3, prompt: "Ketma-ketlikni davom ettiring:\n5, 10, 20, 40, ?", options: ["60", "70", "80", "90"], correctIndex: 2 },

  { id: "log-4-1", category: "logical", difficulty: 4, prompt: "Ketma-ketlikni davom ettiring:\n1, 4, 9, 16, 25, ?", options: ["30", "32", "36", "42"], correctIndex: 2 },
  { id: "log-4-2", category: "logical", difficulty: 4, prompt: "Ketma-ketlikni davom ettiring:\n2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctIndex: 1 },
  { id: "log-4-3", category: "logical", difficulty: 4, prompt: "Ketma-ketlikni davom ettiring:\n3, 7, 15, 31, ?", options: ["47", "55", "61", "63"], correctIndex: 3 },

  { id: "log-5-1", category: "logical", difficulty: 5, prompt: "Ketma-ketlikni davom ettiring:\n1, 2, 6, 24, 120, ?", options: ["240", "360", "600", "720"], correctIndex: 3 },
  { id: "log-5-2", category: "logical", difficulty: 5, prompt: "Ketma-ketlikni davom ettiring:\n2, 3, 5, 9, 17, ?", options: ["31", "32", "33", "34"], correctIndex: 2 },
  { id: "log-5-3", category: "logical", difficulty: 5, prompt: "Ketma-ketlikni davom ettiring:\n4, 9, 19, 39, 79, ?", options: ["149", "155", "159", "161"], correctIndex: 2 },

  // ---------- MATH → VIZUAL MANTIQ (arifmetik amalsiz) ----------
  // Hech qanday qo'shish/ayirish/ko'paytirish/bo'lish YO'Q — bular chinakam
  // MANTIQIY matritsa (Raven uslubidagi) jumboqlari: 2x2 yoki 3x3 to'r
  // ko'rsatiladi, bitta katak "?" — qatorlar/ustunlar qoidasiga (har birida
  // har xil shakl/rang bir marta uchraydi — "lotin kvadrati" mantiqi) qarab
  // yetishmagan katakni topish kerak. Minimal yosh chegarasi ~14-15 —
  // qiyinlik shakllarni farqlashda emas, chinakam xulosa chiqarishda
  // (qator+ustun bo'yicha eliminatsiya).
  // 1-2 daraja: 2x2 to'r, bitta/ikkita qoida. 3 daraja: 3x3, faqat shakl
  // bo'yicha lotin kvadrati. 4 daraja: 3x3, shakl VA rang bir vaqtda (ikki
  // mustaqil lotin kvadrati). 5 daraja: xuddi shu, lekin variantlar orasida
  // "chalg'ituvchi" (to'g'ri shakl-noto'g'ri rang va h.k.) juda ko'p.
  {
    id: "math-1-1",
    category: "math",
    difficulty: 1,
    prompt: "To'rdagi qoidaga ko'ra \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "square", hue: "amber" },
      { kind: "square", hue: "sky" },
      { kind: "triangle", hue: "sky" },
      { kind: "circle", hue: "sky" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "triangle", hue: "amber" },
        { kind: "square", hue: "amber" },
        { kind: "triangle", hue: "sky" },
        null,
      ],
    },
  },
  {
    id: "math-1-2",
    category: "math",
    difficulty: 1,
    prompt: "To'rdagi qoidaga ko'ra \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "circle", hue: "pink" },
      { kind: "diamond", hue: "cyan" },
      { kind: "diamond", hue: "pink" },
      { kind: "hexagon", hue: "pink" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "circle", hue: "cyan" },
        { kind: "diamond", hue: "cyan" },
        { kind: "circle", hue: "pink" },
        null,
      ],
    },
  },
  {
    id: "math-1-3",
    category: "math",
    difficulty: 1,
    prompt: "To'rdagi qoidaga ko'ra \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 3,
    optionShapes: [
      { kind: "pentagon", hue: "rose" },
      { kind: "star", hue: "rose" },
      { kind: "hexagon", hue: "emerald" },
      { kind: "hexagon", hue: "rose" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "pentagon", hue: "emerald" },
        { kind: "hexagon", hue: "emerald" },
        { kind: "pentagon", hue: "rose" },
        null,
      ],
    },
  },

  {
    id: "math-2-1",
    category: "math",
    difficulty: 2,
    prompt: "To'rdagi qoidaga ko'ra shakl, rang VA burilish — uchalasi bir vaqtda o'zgaradi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    optionShapes: [
      { kind: "pentagon", hue: "sky", rotate: 150 },
      { kind: "pentagon", hue: "sky", rotate: 0 },
      { kind: "pentagon", hue: "amber", rotate: 150 },
      { kind: "triangle", hue: "sky", rotate: 150 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "triangle", hue: "amber", rotate: 0 },
        { kind: "pentagon", hue: "sky", rotate: 0 },
        { kind: "triangle", hue: "amber", rotate: 150 },
        null,
      ],
    },
  },
  {
    id: "math-2-2",
    category: "math",
    difficulty: 2,
    prompt: "To'rdagi qoidaga ko'ra shakl, rang VA burilish — uchalasi bir vaqtda o'zgaradi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "star", hue: "rose", rotate: 0 },
      { kind: "star", hue: "violet", rotate: 100 },
      { kind: "star", hue: "rose", rotate: 100 },
      { kind: "hexagon", hue: "rose", rotate: 100 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "hexagon", hue: "violet", rotate: 0 },
        { kind: "star", hue: "rose", rotate: 0 },
        { kind: "hexagon", hue: "violet", rotate: 100 },
        null,
      ],
    },
  },
  {
    id: "math-2-3",
    category: "math",
    difficulty: 2,
    prompt: "To'rdagi qoidaga ko'ra shakl, rang VA burilish — uchalasi bir vaqtda o'zgaradi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 3,
    optionShapes: [
      { kind: "triangle", hue: "emerald", rotate: 0 },
      { kind: "triangle", hue: "cyan", rotate: 200 },
      { kind: "pentagon", hue: "emerald", rotate: 200 },
      { kind: "triangle", hue: "emerald", rotate: 200 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 2,
      cells: [
        { kind: "pentagon", hue: "cyan", rotate: 0 },
        { kind: "triangle", hue: "emerald", rotate: 0 },
        { kind: "pentagon", hue: "cyan", rotate: 200 },
        null,
      ],
    },
  },

  {
    id: "math-3-1",
    category: "math",
    difficulty: 3,
    prompt: "Har bir qator VA ustunda uchala shakl aynan bir martadan uchraydi. \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    optionShapes: [
      { kind: "circle", hue: "violet" },
      { kind: "triangle", hue: "violet" },
      { kind: "square", hue: "violet" },
      { kind: "diamond", hue: "violet" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "triangle", hue: "violet" },
        { kind: "circle", hue: "violet" },
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "violet" },
        { kind: "square", hue: "violet" },
        { kind: "triangle", hue: "violet" },
        { kind: "square", hue: "violet" },
        { kind: "triangle", hue: "violet" },
        null,
      ],
    },
  },
  {
    id: "math-3-2",
    category: "math",
    difficulty: 3,
    prompt: "Har bir qator VA ustunda uchala shakl aynan bir martadan uchraydi. \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "circle", hue: "sky" },
      { kind: "hexagon", hue: "sky" },
      { kind: "diamond", hue: "sky" },
      { kind: "star", hue: "sky" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "circle", hue: "sky" },
        { kind: "diamond", hue: "sky" },
        { kind: "hexagon", hue: "sky" },
        { kind: "diamond", hue: "sky" },
        { kind: "hexagon", hue: "sky" },
        { kind: "circle", hue: "sky" },
        { kind: "hexagon", hue: "sky" },
        { kind: "circle", hue: "sky" },
        null,
      ],
    },
  },
  {
    id: "math-3-3",
    category: "math",
    difficulty: 3,
    prompt: "Har bir qator VA ustunda uchala shakl aynan bir martadan uchraydi. \"?\" o'rniga qaysi shakl kelishi kerak?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "pentagon", hue: "amber" },
      { kind: "square", hue: "amber" },
      { kind: "star", hue: "amber" },
      { kind: "triangle", hue: "amber" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "pentagon", hue: "amber" },
        { kind: "square", hue: "amber" },
        { kind: "star", hue: "amber" },
        { kind: "square", hue: "amber" },
        { kind: "star", hue: "amber" },
        { kind: "pentagon", hue: "amber" },
        { kind: "star", hue: "amber" },
        { kind: "pentagon", hue: "amber" },
        null,
      ],
    },
  },

  {
    id: "math-4-1",
    category: "math",
    difficulty: 4,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang — ikkalasi ham har qator/ustunda alohida-alohida bir martadan uchraydi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 3,
    optionShapes: [
      { kind: "circle", hue: "violet" },
      { kind: "triangle", hue: "amber" },
      { kind: "square", hue: "cyan" },
      { kind: "circle", hue: "amber" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "triangle", hue: "amber" },
        { kind: "circle", hue: "cyan" },
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "violet" },
        { kind: "square", hue: "amber" },
        { kind: "triangle", hue: "cyan" },
        { kind: "square", hue: "cyan" },
        { kind: "triangle", hue: "violet" },
        null,
      ],
    },
  },
  {
    id: "math-4-2",
    category: "math",
    difficulty: 4,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang — ikkalasi ham har qator/ustunda alohida-alohida bir martadan uchraydi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    optionShapes: [
      { kind: "pentagon", hue: "rose" },
      { kind: "pentagon", hue: "emerald" },
      { kind: "hexagon", hue: "rose" },
      { kind: "diamond", hue: "sky" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "diamond", hue: "rose" },
        { kind: "pentagon", hue: "sky" },
        { kind: "hexagon", hue: "emerald" },
        { kind: "pentagon", hue: "emerald" },
        { kind: "hexagon", hue: "rose" },
        { kind: "diamond", hue: "sky" },
        { kind: "hexagon", hue: "sky" },
        { kind: "diamond", hue: "emerald" },
        null,
      ],
    },
  },
  {
    id: "math-4-3",
    category: "math",
    difficulty: 4,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang — ikkalasi ham har qator/ustunda alohida-alohida bir martadan uchraydi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "triangle", hue: "violet" },
      { kind: "triangle", hue: "pink" },
      { kind: "star", hue: "amber" },
      { kind: "square", hue: "amber" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "star", hue: "pink" },
        { kind: "triangle", hue: "amber" },
        { kind: "square", hue: "violet" },
        { kind: "triangle", hue: "violet" },
        { kind: "square", hue: "pink" },
        { kind: "star", hue: "amber" },
        { kind: "square", hue: "amber" },
        { kind: "star", hue: "violet" },
        null,
      ],
    },
  },

  {
    id: "math-5-1",
    category: "math",
    difficulty: 5,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang har qator/ustunda alohida-alohida bir martadan uchraydi, o'lcham esa har qatorda o'zgarmas turadi. \"?\" o'rniga nima keladi? (Diqqat: variantlar orasida shakl yoki rangi to'g'ri, lekin o'lchami noto'g'ri bo'lganlari ham bor.)",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "circle", hue: "sky", size: 40 },
      { kind: "circle", hue: "rose", size: 72 },
      { kind: "circle", hue: "sky", size: 72 },
      { kind: "triangle", hue: "sky", size: 72 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "triangle", hue: "sky", size: 40 },
        { kind: "circle", hue: "rose", size: 40 },
        { kind: "square", hue: "emerald", size: 40 },
        { kind: "circle", hue: "emerald", size: 56 },
        { kind: "square", hue: "sky", size: 56 },
        { kind: "triangle", hue: "rose", size: 56 },
        { kind: "square", hue: "rose", size: 72 },
        { kind: "triangle", hue: "emerald", size: 72 },
        null,
      ],
    },
  },
  {
    id: "math-5-2",
    category: "math",
    difficulty: 5,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang har qator/ustunda alohida-alohida bir martadan uchraydi, o'lcham esa har qatorda o'zgarmas turadi. \"?\" o'rniga nima keladi? (Diqqat: variantlar orasida shakl yoki rangi to'g'ri, lekin o'lchami noto'g'ri bo'lganlari ham bor.)",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "pentagon", hue: "amber", size: 40 },
      { kind: "pentagon", hue: "amber", size: 72 },
      { kind: "pentagon", hue: "violet", size: 72 },
      { kind: "star", hue: "amber", size: 72 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "diamond", hue: "amber", size: 40 },
        { kind: "pentagon", hue: "violet", size: 40 },
        { kind: "star", hue: "cyan", size: 40 },
        { kind: "pentagon", hue: "cyan", size: 56 },
        { kind: "star", hue: "amber", size: 56 },
        { kind: "diamond", hue: "violet", size: 56 },
        { kind: "star", hue: "violet", size: 72 },
        { kind: "diamond", hue: "cyan", size: 72 },
        null,
      ],
    },
  },
  {
    id: "math-5-3",
    category: "math",
    difficulty: 5,
    prompt: "To'rdagi qoidaga ko'ra shakl VA rang har qator/ustunda alohida-alohida bir martadan uchraydi, o'lcham esa har qatorda o'zgarmas turadi. \"?\" o'rniga nima keladi? (Diqqat: variantlar orasida shakl yoki rangi to'g'ri, lekin o'lchami noto'g'ri bo'lganlari ham bor.)",
    options: ["A", "B", "C", "D"],
    correctIndex: 3,
    optionShapes: [
      { kind: "square", hue: "sky", size: 40 },
      { kind: "square", hue: "emerald", size: 72 },
      { kind: "circle", hue: "sky", size: 72 },
      { kind: "square", hue: "sky", size: 72 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "hexagon", hue: "sky", size: 40 },
        { kind: "square", hue: "pink", size: 40 },
        { kind: "circle", hue: "emerald", size: 40 },
        { kind: "square", hue: "emerald", size: 56 },
        { kind: "circle", hue: "sky", size: 56 },
        { kind: "hexagon", hue: "pink", size: 56 },
        { kind: "circle", hue: "pink", size: 72 },
        { kind: "hexagon", hue: "emerald", size: 72 },
        null,
      ],
    },
  },

  // ---------- VERBAL ----------
  { id: "verb-1-1", category: "verbal", difficulty: 1, prompt: "Pichoq — Kesish\nIgna — ?", options: ["Kesish", "Tikish", "Yozish", "Chizish"], correctIndex: 1 },
  { id: "verb-1-2", category: "verbal", difficulty: 1, prompt: "Ot — Toy\nSigir — ?", options: ["Bola", "Buzoq", "Qo'zi", "Kuchuk"], correctIndex: 1 },
  { id: "verb-1-3", category: "verbal", difficulty: 1, prompt: "Issiq — Sovuq\nBaland — ?", options: ["Katta", "Kichik", "Past", "Uzun"], correctIndex: 2 },

  { id: "verb-2-1", category: "verbal", difficulty: 2, prompt: "Shifokor — Kasalxona\nO'qituvchi — ?", options: ["Kasalxona", "Maktab", "Dorixona", "Bank"], correctIndex: 1 },
  { id: "verb-2-2", category: "verbal", difficulty: 2, prompt: "Baliq — Suv\nQush — ?", options: ["Yer", "Suv", "Havo", "Daraxt"], correctIndex: 2 },
  { id: "verb-2-3", category: "verbal", difficulty: 2, prompt: "Kitob — Muallif\nRasm — ?", options: ["Kitobxon", "Rassom", "O'qituvchi", "Haykaltarosh"], correctIndex: 1 },

  { id: "verb-3-1", category: "verbal", difficulty: 3, prompt: "Quyosh — Yorug'lik\nOlov — ?", options: ["Tutun", "Issiqlik", "Kul", "Yong'in"], correctIndex: 1 },
  { id: "verb-3-2", category: "verbal", difficulty: 3, prompt: "Kitob — Bob\nUy — ?", options: ["Devor", "Xona", "Tom", "Eshik"], correctIndex: 1 },
  { id: "verb-3-3", category: "verbal", difficulty: 3, prompt: "Muz — Suv\nSuv — ?", options: ["Qor", "Bug'", "Yomg'ir", "Muz"], correctIndex: 1 },

  { id: "verb-4-1", category: "verbal", difficulty: 4, prompt: "Yozuvchi — Roman\nBastakor — ?", options: ["Rasm", "Qo'shiq", "Haykal", "Spektakl"], correctIndex: 1 },
  { id: "verb-4-2", category: "verbal", difficulty: 4, prompt: "Optimist — Umid\nPessimist — ?", options: ["Xursandchilik", "Qo'rquv", "Umidsizlik", "G'azab"], correctIndex: 2 },
  { id: "verb-4-3", category: "verbal", difficulty: 4, prompt: "Demokratiya — Xalq\nMonarxiya — ?", options: ["Parlament", "Qirol", "Armiya", "Sud"], correctIndex: 1 },

  { id: "verb-5-1", category: "verbal", difficulty: 5, prompt: "Kutubxona — Kitoblar\nMuzey — ?", options: ["Talabalar", "Eksponatlar", "O'qituvchilar", "Kompyuterlar"], correctIndex: 1 },
  { id: "verb-5-2", category: "verbal", difficulty: 5, prompt: "Uyg'unlik — Tartib\nTartibsizlik — ?", options: ["Nizo", "Xaos", "Yolg'izlik", "Sukunat"], correctIndex: 1 },
  { id: "verb-5-3", category: "verbal", difficulty: 5, prompt: "Kamdan-kam — Noyob\nKo'p uchraydigan — ?", options: ["G'alati", "Qiziq", "Odatiy", "Nodir"], correctIndex: 2 },

  // ---------- PATTERN (naqsh/matritsa — endi emoji EMAS, SVG shakllar) ----------
  // Avval bu toifa 🔺🔵⬛⬜ kabi emojilarda edi — emoji operatsion tizimga
  // qarab boshqacha chiqib, saytning boshqa joylaridagi puxta shakllarga
  // mos kelmasdi. Endi hammasi components/ShapeGroup.tsx dagi bir xil SVG
  // shakllar bilan chiziladi ("shape-sequence" — ketma-ketlik, "shape-matrix"
  // — qator-ustun to'r).
  {
    id: "pat-1-1",
    category: "pattern",
    difficulty: 1,
    prompt: "Naqshni davom ettiring — rang har safar almashinadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "circle", hue: "cyan" },
      { kind: "circle", hue: "rose" },
      { kind: "circle", hue: "emerald" },
      { kind: "square", hue: "rose" },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "circle", hue: "cyan" },
        { kind: "circle", hue: "rose" },
        { kind: "circle", hue: "cyan" },
        { kind: "circle", hue: "rose" },
        { kind: "circle", hue: "cyan" },
        null,
      ],
    },
  },
  {
    id: "pat-1-2",
    category: "pattern",
    difficulty: 1,
    prompt: "Naqshni davom ettiring — shakl turi har safar almashinadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "square", hue: "violet" },
      { kind: "circle", hue: "violet" },
      { kind: "triangle", hue: "violet" },
      { kind: "circle", hue: "sky" },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "violet" },
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "violet" },
        { kind: "square", hue: "violet" },
        null,
      ],
    },
  },
  {
    id: "pat-1-3",
    category: "pattern",
    difficulty: 1,
    prompt: "Naqshni davom ettiring — har uchinchi shakl boshqacha. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "circle" },
      { kind: "triangle" },
      { kind: "square" },
      { kind: "star" },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "circle" },
        { kind: "circle" },
        { kind: "triangle" },
        { kind: "circle" },
        { kind: "circle" },
        { kind: "triangle" },
        { kind: "circle" },
        { kind: "circle" },
        null,
      ],
    },
  },

  {
    id: "pat-2-1",
    category: "pattern",
    difficulty: 2,
    prompt: "Matritsani to'ldiring — shakllar shaxmat taxtasidek almashinadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "circle" },
      { kind: "triangle" },
      { kind: "square" },
      { kind: "star" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "triangle" },
        { kind: "circle" },
        { kind: "triangle" },
        { kind: "circle" },
        { kind: "triangle" },
        { kind: "circle" },
        { kind: "triangle" },
        { kind: "circle" },
        null,
      ],
    },
  },
  {
    id: "pat-2-2",
    category: "pattern",
    difficulty: 2,
    prompt: "Har bosqichda doiralar soni bittaga ortib boradi. \"?\" bosqichda nechta doira bo'ladi?",
    options: ["3 ta", "4 ta", "5 ta", "6 ta"],
    correctIndex: 1,
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "circle", count: 1 },
        { kind: "circle", count: 2 },
        { kind: "circle", count: 3 },
        null,
      ],
    },
  },
  {
    id: "pat-2-3",
    category: "pattern",
    difficulty: 2,
    prompt: "Aylanish naqshini davom ettiring — shakl har safar 90° ga buriladi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "triangle", rotate: 270 },
      { kind: "triangle", rotate: 0 },
      { kind: "triangle", rotate: 180 },
      { kind: "triangle", rotate: 90 },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "triangle", rotate: 0 },
        { kind: "triangle", rotate: 90 },
        { kind: "triangle", rotate: 180 },
        { kind: "triangle", rotate: 270 },
        { kind: "triangle", rotate: 0 },
        { kind: "triangle", rotate: 90 },
        null,
      ],
    },
  },

  {
    id: "pat-3-1",
    category: "pattern",
    difficulty: 3,
    prompt: "Har bosqichda kvadratlar soni bittaga ortib boradi. Uchinchi bosqichda nechta kvadrat bo'ladi?",
    options: ["2 ta", "3 ta", "4 ta", "5 ta"],
    correctIndex: 1,
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "square", hue: "emerald", count: 1 },
        { kind: "square", hue: "emerald", count: 2 },
        null,
      ],
    },
  },
  {
    id: "pat-3-2",
    category: "pattern",
    difficulty: 3,
    prompt: "Diagonal naqshni to'ldiring — rangli kvadrat faqat diagonal bo'ylab turadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "circle", hue: "slate" },
      { kind: "square", hue: "violet" },
      { kind: "triangle", hue: "violet" },
      { kind: "square", hue: "slate" },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "square", hue: "violet" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        null,
      ],
    },
  },
  {
    id: "pat-3-3",
    category: "pattern",
    difficulty: 3,
    prompt: "Har bosqichda doiralar soni ikki barobar ortadi. \"?\" bosqichda nechta doira bo'ladi?",
    options: ["6 ta", "7 ta", "8 ta", "10 ta"],
    correctIndex: 2,
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "circle", hue: "pink", count: 1 },
        { kind: "circle", hue: "pink", count: 2 },
        { kind: "circle", hue: "pink", count: 4 },
        null,
      ],
    },
  },

  {
    id: "pat-4-1",
    category: "pattern",
    difficulty: 4,
    prompt: "Qoida: har qatorda shakllar soni ortadi, har ustunda rang almashadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
    optionShapes: [
      { kind: "circle", hue: "emerald", count: 2 },
      { kind: "circle", hue: "emerald", count: 3 },
      { kind: "circle", hue: "emerald", count: 4 },
      { kind: "circle", hue: "rose", count: 3 },
    ],
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "circle", hue: "rose", count: 1 },
        { kind: "circle", hue: "sky", count: 1 },
        { kind: "circle", hue: "emerald", count: 1 },
        { kind: "circle", hue: "rose", count: 2 },
        { kind: "circle", hue: "sky", count: 2 },
        { kind: "circle", hue: "emerald", count: 2 },
        { kind: "circle", hue: "rose", count: 3 },
        { kind: "circle", hue: "sky", count: 3 },
        null,
      ],
    },
  },
  {
    id: "pat-4-2",
    category: "pattern",
    difficulty: 4,
    prompt: "1-shaklda 3 burchak (uchburchak), 2-shaklda 4 burchak (kvadrat), 3-shaklda 5 burchak (beshburchak) bor. 4-shaklda nechta burchak bo'ladi?",
    options: ["5", "6", "7", "8"],
    correctIndex: 1,
  },
  {
    id: "pat-4-3",
    category: "pattern",
    difficulty: 4,
    prompt: "Qoida: rangli shakl har qatorda bittadan o'ngga siljiydi. Ko'rsatilgan uchta qatordan keyin, to'rtinchi qatorda rangli shakl nechinchi katakda turadi?",
    options: ["1-katakda", "2-katakda", "3-katakda", "Butunlay yo'qoladi"],
    correctIndex: 0,
    visual: {
      kind: "shape-matrix",
      cols: 3,
      cells: [
        { kind: "triangle", hue: "amber" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "triangle", hue: "amber" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "circle", hue: "slate" },
        { kind: "triangle", hue: "amber" },
      ],
    },
  },

  {
    id: "pat-5-1",
    category: "pattern",
    difficulty: 5,
    prompt: "Ketma-ketlikni kuzating: tomonlar soni har safar bittaga ortadi, shakl ichi bo'sh/to'liq bo'lib almashinadi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 3,
    optionShapes: [
      { kind: "pentagon", hue: "violet", filled: true },
      { kind: "hexagon", hue: "violet", filled: false },
      { kind: "triangle", hue: "violet", filled: true },
      { kind: "hexagon", hue: "violet", filled: true },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "triangle", hue: "violet", filled: false },
        { kind: "square", hue: "violet", filled: true },
        { kind: "pentagon", hue: "violet", filled: false },
        null,
      ],
    },
  },
  {
    id: "pat-5-2",
    category: "pattern",
    difficulty: 5,
    prompt: "Qoida: ikki belgi bir xil bo'lsa, natija X; agar turlicha bo'lsa, natija O.\nBerilgan: O, X → natija nima bo'ladi?",
    options: ["X", "O", "XO", "Hech biri"],
    correctIndex: 1,
  },
  {
    id: "pat-5-3",
    category: "pattern",
    difficulty: 5,
    prompt: "Qoida: har bosqichda shakllar soni bittaga ortadi VA yo'nalish 90° ga buriladi. \"?\" o'rniga nima keladi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    optionShapes: [
      { kind: "triangle", hue: "amber", rotate: 270, count: 3 },
      { kind: "triangle", hue: "amber", rotate: 0, count: 4 },
      { kind: "triangle", hue: "amber", rotate: 270, count: 4 },
      { kind: "triangle", hue: "amber", rotate: 180, count: 4 },
    ],
    visual: {
      kind: "shape-sequence",
      steps: [
        { kind: "triangle", hue: "amber", rotate: 0, count: 1 },
        { kind: "triangle", hue: "amber", rotate: 90, count: 2 },
        { kind: "triangle", hue: "amber", rotate: 180, count: 3 },
        null,
      ],
    },
  },
];

export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return questions.filter((q) => q.difficulty === difficulty);
}
