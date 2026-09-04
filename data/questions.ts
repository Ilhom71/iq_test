// Savollar banki — IQ Test Website
// Har bir savol: toifa, qiyinlik darajasi (1-5), matn, 4 variant, to'g'ri javob indeksi.
// Qoidalar CLAUDE.md va PLAN.md § 4-5 da tavsiflangan.

export type Category = "logical" | "math" | "verbal" | "pattern";

export interface Question {
  id: string;
  category: Category;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  logical: "Mantiqiy ketma-ketlik",
  math: "Arifmetik",
  verbal: "Og'zaki analogiya",
  pattern: "Naqsh / Matritsa",
};

export const questions: Question[] = [
  // ---------- LOGICAL ----------
  { id: "log-1-1", category: "logical", difficulty: 1, prompt: "Ketma-ketlikni davom ettiring:\n2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], correctIndex: 1 },
  { id: "log-1-2", category: "logical", difficulty: 1, prompt: "Ketma-ketlikni davom ettiring:\nA, B, C, D, ?", options: ["D", "E", "F", "C"], correctIndex: 1 },
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

  // ---------- MATH ----------
  { id: "math-1-1", category: "math", difficulty: 1, prompt: "12 + 15 = ?", options: ["25", "26", "27", "28"], correctIndex: 2 },
  { id: "math-1-2", category: "math", difficulty: 1, prompt: "45 − 18 = ?", options: ["25", "26", "27", "29"], correctIndex: 2 },
  { id: "math-1-3", category: "math", difficulty: 1, prompt: "6 × 7 = ?", options: ["40", "41", "42", "48"], correctIndex: 2 },

  { id: "math-2-1", category: "math", difficulty: 2, prompt: "144 ÷ 12 = ?", options: ["10", "11", "12", "14"], correctIndex: 2 },
  { id: "math-2-2", category: "math", difficulty: 2, prompt: "8 × 9 − 15 = ?", options: ["55", "56", "57", "58"], correctIndex: 2 },
  { id: "math-2-3", category: "math", difficulty: 2, prompt: "80 ning 25% i nechaga teng?", options: ["15", "18", "20", "22"], correctIndex: 2 },

  { id: "math-3-1", category: "math", difficulty: 3, prompt: "96 ning 3/4 qismi nechaga teng?", options: ["66", "70", "72", "74"], correctIndex: 2 },
  { id: "math-3-2", category: "math", difficulty: 3, prompt: "(15 × 4) − (60 ÷ 3) = ?", options: ["36", "38", "40", "42"], correctIndex: 2 },
  { id: "math-3-3", category: "math", difficulty: 3, prompt: "Mashina 60 km/soat tezlikda 2.5 soat yursa, qancha masofa bosib o'tadi (km)?", options: ["120", "140", "150", "160"], correctIndex: 2 },

  { id: "math-4-1", category: "math", difficulty: 4, prompt: "x + 15 = 3x − 7 tenglamada x = ?", options: ["9", "10", "11", "12"], correctIndex: 2 },
  { id: "math-4-2", category: "math", difficulty: 4, prompt: "Ikki sonning yig'indisi 48, ayirmasi 12. Kattasi nechaga teng?", options: ["28", "30", "32", "34"], correctIndex: 1 },
  { id: "math-4-3", category: "math", difficulty: 4, prompt: "2⁵ − 3³ = ?", options: ["3", "4", "5", "6"], correctIndex: 2 },

  { id: "math-5-1", category: "math", difficulty: 5, prompt: "3 ishchi 3 kunda 3 ta stol yasaydi. Xuddi shu tezlikda 9 ishchi 9 kunda nechta stol yasaydi?", options: ["9", "18", "27", "36"], correctIndex: 2 },
  { id: "math-5-2", category: "math", difficulty: 5, prompt: "x² − 5x + 6 = 0 tenglamaning ildizlari yig'indisi nechaga teng?", options: ["1", "5", "6", "11"], correctIndex: 1 },
  { id: "math-5-3", category: "math", difficulty: 5, prompt: "Ketma-ket 5 ta butun sonning yig'indisi 100. Ulardan eng kattasi nechaga teng?", options: ["20", "21", "22", "24"], correctIndex: 2 },

  // ---------- VERBAL ----------
  { id: "verb-1-1", category: "verbal", difficulty: 1, prompt: "Pichoq — Kesish\nIgna — ?", options: ["Kesish", "Tikish", "Yozish", "Chizish"], correctIndex: 1 },
  { id: "verb-1-2", category: "verbal", difficulty: 1, prompt: "Ot — Toy (bola)\nSigir — ?", options: ["Bola", "Buzoq", "Qo'zi", "Kuchuk"], correctIndex: 1 },
  { id: "verb-1-3", category: "verbal", difficulty: 1, prompt: "Issiq — Sovuq\nBaland — ?", options: ["Katta", "Kichik", "Past", "Uzun"], correctIndex: 2 },

  { id: "verb-2-1", category: "verbal", difficulty: 2, prompt: "Shifokor — Kasalxona\nO'qituvchi — ?", options: ["Kasalxona", "Maktab", "Dorixona", "Bank"], correctIndex: 1 },
  { id: "verb-2-2", category: "verbal", difficulty: 2, prompt: "Baliq — Suv\nQush — ?", options: ["Er", "Suv", "Havo", "Daraxt"], correctIndex: 2 },
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

  // ---------- PATTERN ----------
  { id: "pat-1-1", category: "pattern", difficulty: 1, prompt: "Naqshni davom ettiring:\n🔴 🔵 🔴 🔵 🔴 ?", options: ["🔴", "🔵", "🟢", "🟡"], correctIndex: 1 },
  { id: "pat-1-2", category: "pattern", difficulty: 1, prompt: "Naqshni davom ettiring:\n⬛ ⬜ ⬛ ⬜ ⬛ ?", options: ["⬛", "⬜", "🔺", "🔵"], correctIndex: 1 },
  { id: "pat-1-3", category: "pattern", difficulty: 1, prompt: "Naqshni davom ettiring:\n⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ⭐ ⭐ ?", options: ["⭐", "🌙", "☀️", "⚡"], correctIndex: 1 },

  { id: "pat-2-1", category: "pattern", difficulty: 2, prompt: "Matritsani to'ldiring (har qatorda naqsh takrorlanadi):\n🔺 🔵 🔺\n🔵 🔺 🔵\n🔺 🔵 ?", options: ["🔺", "🔵", "🟢", "⬛"], correctIndex: 0 },
  { id: "pat-2-2", category: "pattern", difficulty: 2, prompt: "Sonlar ketma-ketligini davom ettiring:\n🔴 | 🔴🔴 | 🔴🔴🔴 | ?", options: ["🔴🔴", "🔴🔴🔴", "🔴🔴🔴🔴", "🔴🔴🔴🔴🔴"], correctIndex: 2 },
  { id: "pat-2-3", category: "pattern", difficulty: 2, prompt: "Aylanish naqshini davom ettiring:\n▲ ▶ ▼ ◀ ▲ ▶ ?", options: ["▲", "▶", "▼", "◀"], correctIndex: 2 },

  { id: "pat-3-1", category: "pattern", difficulty: 3, prompt: "Qator soni ortib boradi. Uchinchi qatorni toping:\n🟩\n🟩🟩\n?", options: ["🟩", "🟩🟩", "🟩🟩🟩", "🟩🟩🟩🟩"], correctIndex: 2 },
  { id: "pat-3-2", category: "pattern", difficulty: 3, prompt: "Diagonal naqshni to'ldiring:\n⬛ ⬜ ⬜\n⬜ ⬛ ⬜\n⬜ ⬜ ?", options: ["⬛", "⬜", "🔺", "🔵"], correctIndex: 0 },
  { id: "pat-3-3", category: "pattern", difficulty: 3, prompt: "Shakllar soni har safar ikki barobar ortadi:\n🔵 | 🔵🔵 | 🔵🔵🔵🔵 | ?", options: ["🔵🔵🔵🔵🔵🔵", "🔵🔵🔵🔵🔵🔵🔵🔵", "🔵🔵🔵🔵🔵🔵🔵", "🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵"], correctIndex: 1 },

  { id: "pat-4-1", category: "pattern", difficulty: 4, prompt: "Qoida: har qatorda shakllar soni ortadi, har ustunda rang almashadi.\n🔴 🔵 🟢\n🔴🔴 🔵🔵 🟢🟢\n🔴🔴🔴 🔵🔵🔵 ?", options: ["🟢", "🟢🟢", "🟢🟢🟢", "🟢🟢🟢🟢"], correctIndex: 2 },
  { id: "pat-4-2", category: "pattern", difficulty: 4, prompt: "1-shaklda 3 burchak (uchburchak), 2-shaklda 4 burchak (kvadrat), 3-shaklda 5 burchak (beshburchak). 4-shaklda nechta burchak bo'ladi?", options: ["5", "6", "7", "8"], correctIndex: 1 },
  { id: "pat-4-3", category: "pattern", difficulty: 4, prompt: "Qoida: 🔺 belgisi har qatorda bittadan o'ngga siljiydi, oxiriga yetgach yana boshiga qaytadi.\n🔺 ⬜ ⬜\n⬜ 🔺 ⬜\n⬜ ⬜ 🔺\n?", options: ["🔺 ⬜ ⬜", "⬜ 🔺 ⬜", "⬜ ⬜ 🔺", "⬜ ⬜ ⬜"], correctIndex: 0 },

  { id: "pat-5-1", category: "pattern", difficulty: 5, prompt: "Ketma-ketlik: △ (bo'sh, 3 tomon) → ■ (to'liq, 4 tomon) → ⬠ (bo'sh, 5 tomon) → ?\n(Qoida: tomonlar soni +1 ortadi, ichki bo'sh/to'liq holat almashinadi)", options: ["⬡ (bo'sh oltiburchak)", "⬢ (to'liq oltiburchak)", "⬟ (to'liq beshburchak)", "△ (to'liq uchburchak)"], correctIndex: 1 },
  { id: "pat-5-2", category: "pattern", difficulty: 5, prompt: "Qoida: ikki belgi bir xil bo'lsa, natija X; agar turli bo'lsa, natija O.\nBerilgan: O, X → natija?", options: ["X", "O", "XO", "Hech biri"], correctIndex: 1 },
  { id: "pat-5-3", category: "pattern", difficulty: 5, prompt: "Qoida: har safar shakllar soni 1 taga ortadi VA yo'nalish 90° buriladi (▲→▶→▼→◀→▲...).\n1-holat: ▲ (1 ta)\n2-holat: ▶▶ (2 ta)\n3-holat: ▼▼▼ (3 ta)\n4-holat: ?", options: ["◀◀◀◀ (4 ta)", "▲▲▲▲ (4 ta)", "◀◀◀ (3 ta)", "▶▶▶▶ (4 ta)"], correctIndex: 0 },
];

export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return questions.filter((q) => q.difficulty === difficulty);
}
