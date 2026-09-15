# IQ Test Website — Loyiha rejasi

## 1. G'oya

Foydalanuvchi saytga kirib, IQ (aqliy salohiyat) testini yechadi va oxirida taxminiy IQ
ballini chiroyli, tushunarli natija sahifasida ko'radi. V1 juda sodda: ro'yxatdan
o'tish yo'q, ma'lumotlar bazasi yo'q — faqat "kirdi → test yechdi → natijani ko'rdi".

> ⚠️ Muhim: bu ilmiy sertifikatlangan psixometrik test emas, ko'ngilochar/
> o'z-o'zini baholash maqsadidagi taxminiy IQ testi. Bu ogohlantirish natija
> sahifasida foydalanuvchiga ham ko'rsatiladi.

## 2. Texnologiya stack (Claude tanladi — sabab: eng chiroyli va tez natija)

- **Next.js 15 (App Router) + TypeScript** — zamonaviy, komponentga asoslangan,
  keyinchalik backend/DB/auth qo'shish oson (rewrite kerak bo'lmaydi).
- **Tailwind CSS** — tez va izchil, chiroyli UI qurish uchun.
- **Framer Motion** — savollar orasidagi o'tishlar, progress bar, natija
  animatsiyalari uchun (testni "jonli" va professional ko'rsatadi).
- **shadcn/ui** komponentlari (kerak bo'lganda) — tugma, karta, progress bar kabi
  bazaviy elementlar uchun tayyor, chiroyli asos.
- Hozircha **backend/DB yo'q** — barcha holat client-side (React state +
  localStorage, sahifa yangilansa test yo'qolmasligi uchun).

Hosting — foydalanuvchi o'zi qiladi (Vercel tavsiya etiladi, lekin bu uning ishi).
Deploy qilinganda `NEXT_PUBLIC_SITE_URL` env o'zgaruvchisini haqiqiy domenga
o'rnating — aks holda ijtimoiy tarmoq (OG) rasmlari to'g'ri ko'rinmaydi
(`app/layout.tsx` dagi `metadataBase`).

## 3. V1 qamrovi (hozir qilinadigan)

1. **Bosh sahifa (landing)** — chiroyli hero, testning qisqa tavsifi, "Testni
   boshlash" tugmasi.
2. **Adaptiv test oqimi** (MUHIM — natija tasodifiy emas, ishlashga qarab):
   - 20 ta savol, 4 turdagi (mantiqiy ketma-ketlik, arifmetik, og'zaki
     analogiya, naqsh/matritsa — matn/emoji asosida chizilgan grid).
   - Har bir savol 1–5 qiyinlik darajasiga ega.
   - Test **3-darajadan (o'rta)** boshlanadi. To'g'ri javob → keyingi savol
     bir daraja qiyinroq (max 5). Xato javob → bir daraja osonroq (min 1).
     Shu tariqa test har bir foydalanuvchiga moslashadi.
   - Har bir savol uchun 4 ta variant, bitta to'g'ri javob.
   - Umumiy timer (15–20 daqiqa) + progress bar.
   - Orqaga qaytmasdan, bosqichma-bosqich savol almashinuvi (animatsiya bilan).
3. **Natija sahifasi**:
   - IQ balli — **faqat test davomidagi haqiqiy ishlash asosida** hisoblanadi
     (4-bo'limga qarang), hech qanday tasodifiy/random qiymat ishlatilmaydi.
   - Toifalar bo'yicha breakdown (mantiqiy/arifmetik/verbal/naqsh — har
     birida foiz va qaysi qiyinlik darajasiga yetgani).
   - Chiroyli vizualizatsiya (gauge/donut chart).
   - "Qayta yechish" tugmasi.
4. **Responsive dizayn** — mobil va desktopda bir xil darajada chiroyli
   ishlashi shart (ko'pchilik foydalanuvchi telefondan kirishi mumkin).

## 4. Ball hisoblash metodologiyasi — Adaptiv (Elo/IRT-uslubida)

Bu real adaptiv test tizimlarida ishlatiladigan yondashuvning soddalashtirilgan
varianti (shaxmatdagi Elo reytingiga o'xshash g'oya):

1. Har bir qiyinlik darajasi (1–5) o'zining "qiyinlik balli"ga ega:
   `{1: 85, 2: 95, 3: 105, 4: 115, 5: 130}` (IQ shkalasida taxminiy joylashuv).
2. Foydalanuvchining "ability" (qobiliyat) qiymati **100** dan boshlanadi.
3. Har bir javobdan keyin:
   - `expected` = shu savolga to'g'ri javob berish ehtimoli (joriy ability va
     savol qiyinligi farqidan hisoblanadi, logistik formula bilan).
   - `ability += K * (actual − expected)`, bunda `actual` = 1 (to'g'ri) yoki 0
     (xato), `K` — sezgirlik koeffitsienti (masalan 6–8).
   - Bir vaqtda keyingi savol tanlanadigan qiyinlik darajasi ham shu ability'ga
     eng yaqin darajaga moslashtiriladi (yuqoridagi +1/−1 qadam orqali).
4. Test tugagach, yakuniy `ability` qiymati — bu foydalanuvchining IQ balli
   (65–145 oralig'ida cheklanadi).
5. Natija sahifasida aniq shkala va **"bu ilmiy sertifikatlangan test emas,
   taxminiy/o'z-o'zini baholash uchun"** degan eslatma ko'rsatiladi.

Bu usul: (a) natija **hech qachon tasodifiy emas** — to'liq javoblar tarixiga
bog'liq; (b) real adaptiv testlarga (masalan Raven's, CAT tizimlari) yaqin
mantiqqa ega; (c) implementatsiyasi sodda (`lib/scoring.ts`).

## 5. Savollar banki (Claude tomonidan yoziladi)

- 4 toifa × 5 qiyinlik darajasi × ~3 savol = ~60 ta qo'lda yozilgan savol.
- Har bir savol: matn, 4 variant, to'g'ri javob indeksi, toifa, qiyinlik (1–5).
- `data/questions.ts` da statik massiv sifatida saqlanadi.
- Naqsh/matritsa savollari matn/emoji/unicode belgilar bilan chiziladi
  (masalan `🔺🔺⬛ / 🔺⬛⬛ / ⬛⬛?`), rasm fayllar kerak emas — shu bilan v1
  tezroq va yengil bo'ladi.

## 6. Kelajakdagi bosqichlar (v2+, hozir QILINMAYDI)

- Foydalanuvchi ro'yxatdan o'tishi / login (auth).
- Natijalar tarixi + ma'lumotlar bazasi (masalan Supabase/PostgreSQL).
- Reyting jadvali (leaderboard), do'stlar bilan solishtirish.
- To'lov tizimi — masalan batafsil natija tahlili yoki qo'shimcha testlar pullik.
- Savollar banki yanada kengaytirilishi (100+ savol).
- Ko'p tillilik (o'zbek / rus / ingliz).
- Admin panel — savollarni qo'shish/tahrirlash uchun.

## 7. Loyihaning papka strukturasi (rejalashtirilgan)

```
iq_test_website/
├── app/
│   ├── page.tsx              # Landing page
│   ├── test/page.tsx         # Test oqimi
│   ├── result/page.tsx       # Natija sahifasi
│   └── layout.tsx
├── components/
│   ├── ui/                   # Bazaviy UI elementlari (tugma, karta, progress...)
│   ├── QuestionCard.tsx
│   ├── ResultChart.tsx
│   └── ...
├── data/
│   └── questions.ts           # Savollar banki (v1: statik fayl)
├── lib/
│   └── scoring.ts             # IQ ball hisoblash logikasi
├── PLAN.md
└── CLAUDE.md
```

## 8. Keyingi qadam

Claude Code shu strukturada Next.js loyihasini `create-next-app` orqali
ishga tushiradi, savollar bankini yozadi, test oqimi va natija sahifasini
quradi — hammasi chiroyli, animatsiyali UI bilan.
