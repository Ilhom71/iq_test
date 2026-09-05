<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Bu fayl Claude Code uchun ushbu repo bo'yicha yo'riqnoma (`CLAUDE.md` bu faylga
`@AGENTS.md` orqali ishora qiladi — Next.js `next dev` shu konventsiyani
avtomatik o'rnatadi, shuning uchun loyihaga oid kontent shu yerda saqlanadi).
To'liq loyiha rejasi uchun [PLAN.md](./PLAN.md) ga qara.

## Loyiha haqida

IQ (aqliy salohiyat) testini onlayn topshirish imkonini beruvchi website.
V1: auth yo'q, DB yo'q — foydalanuvchi kirdi, testni yechdi, natijani ko'rdi.
Batafsil qamrov va kelajak rejalari uchun PLAN.md ga qara.

## Til

Foydalanuvchi bilan muloqot **o'zbek tilida** olib boriladi (foydalanuvchi shu
tilda yozadi). Kod, commit message va texnik izohlar — inglizcha bo'lishi
mumkin (standart amaliyot), lekin foydalanuvchiga javoblar o'zbekcha bo'lsin.

## Texnologiya stack

- Next.js 16 (App Router), TypeScript (strict mode)
- Tailwind CSS — barcha styling shu orqali, alohida CSS fayllardan qoching
- Framer Motion — o'tishlar/animatsiyalar uchun
- Backend/DB yo'q (v1) — holat client-side (React state + localStorage)

## Buyruqlar

```
npm run dev      # local dev server
npm run build    # production build (commit qilishdan oldin tekshirish tavsiya etiladi)
npm run lint     # ESLint
```

## Dizayn prinsiplari

- **Chiroyli va zamonaviy** ko'rinish — bu loyihaning asosiy talabi
  (foydalanuvchi aynan shuni so'ragan). Bo'sh, "default" ko'rinishdan qoching.
- Mobil-responsive — ko'p foydalanuvchi telefondan kiradi.
- Test jarayoni "jonli" his qilinishi kerak: progress bar, silliq o'tishlar,
  natija sahifasida animatsiyali vizualizatsiya (gauge/donut chart).
- Har doim yorug' fon + zamonaviy tipografiya + yetarlicha bo'sh joy (whitespace).

### Dizayn tizimi (v1 redizayndan keyin qaror qilingan — shunga rioya qiling)

- **Shriftlar**: jami 2 ta (`app/layout.tsx`) — sarlavhalar uchun `Sora`
  (`font-display` klassi), matn uchun `Plus Jakarta Sans` (default `body`).
  Standart Next.js shabloni shrifti (Geist) ishlatilmaydi. Yangi shrift
  qo'shmang — CLAUDE.md qoidasi: max 3 ta.
- **Ikonkalar**: hech qanday tayyor ikon kutubxona (lucide, heroicons, va
  h.k.) ishlatilmaydi — ular Claude/ChatGPT uslubidagi ingichka chiziqli
  ikonlarga o'xshaydi. Barcha ikonkalar qo'lda `components/icons.tsx` da,
  ikki tonli (duotone) SVG sifatida chizilgan. Yangi ikon kerak bo'lsa — shu
  faylga xuddi shu uslubda qo'shing, tashqi kutubxona o'rnatmang.
- **Ranglar**: bitta gradient hamma joyda emas — har savol toifasi o'z
  rangiga ega (`lib/theme.ts` → `CATEGORY_THEME`: naqsh=binafsha,
  arifmetik=teal, mantiqiy=kahrabo, og'zaki=pushti-qizil). Asosiy CTA
  tugmalar — to'q binafsha (`violet-600`), yassi rang, ortiqcha
  linear-gradient ishlatilmaydi (faqat gauge kabi funksional joylarda
  conic-gradient bor).
- **Standart shablon aktivlar yo'q**: `public/` papkada Next.js/Vercel
  default SVG (`next.svg`, `vercel.svg` va h.k.) yoki `favicon.ico`
  bo'lmasligi kerak — `app/icon.tsx` o'zining rangli logotipini generatsiya
  qiladi (`next/og` → `ImageResponse`).
- **Naqsh/matritsa savollari**: `components/QuestionPrompt.tsx` savol
  matnidagi belgi ketma-ketligini (masalan `🔺 🔵 🔺`) avtomatik chinakam
  grid/ketma-ketlik UI sifatida chizadi (oddiy matn emas). Yangi naqsh savoli
  qo'shganda mavjud formatga (qatorlar `\n` bilan, katakchalar bo'sh joy/`|`/
  vergul bilan ajratiladi) rioya qiling — shunda avtomatik chiroyli grid
  bo'lib chiqadi.

## Savollar banki va adaptiv scoring (MUHIM)

- Test **adaptiv** — natija hech qachon tasodifiy/random bo'lmasin. Qiyinlik
  darajasi foydalanuvchining har bir javobiga qarab real vaqtda o'zgaradi
  (to'g'ri → qiyinroq, xato → osonroq), va yakuniy IQ ball shu jarayonning
  natijasi sifatida `lib/scoring.ts` dagi Elo-uslubidagi formula orqali
  hisoblanadi. To'liq algoritm: PLAN.md § 4.
- `data/questions.ts` da statik massiv sifatida saqlanadi. Har bir savol:
  matn, variantlar (4 ta), to'g'ri javob indeksi, toifa (mantiqiy/arifmetik/
  verbal/naqsh), **qiyinlik darajasi (1–5)**. Yangi savol qo'shishda shu
  formatga rioya qiling.
- Savollarni Claude o'zi yozadi (haqiqiy, mantiqan to'g'ri, bir xil to'g'ri
  javobga ega bo'lishi shart — noaniq/ikki xil talqin qilinadigan savol
  qo'shmang).

## Maxfiy ma'lumotlar / parollar

- Loyihaga hech qanday `.env`, API key yoki parol **commit qilinmaydi**.
- Agar loyiha uchun parol/API key/token saqlash kerak bo'lsa — ularni
  `C:\Users\ilhom\Desktop\parollar\` papkasiga `.txt` shaklida yozing
  (masalan `iq_test_website_<xizmat_nomi>.txt`), repo ichiga emas.
- Hozircha (v1, backend/DB/auth yo'q) hech qanday parol talab qilinmaydi.
  Hosting'ni foydalanuvchi o'zi qiladi — shu bilan bog'liq
  credential'larni ham talab qilmang, kerak bo'lsa so'raladi.

## Ish tartibi

- Kod yozishdan oldin PLAN.md dagi qamrovga rioya qiling — v2 funksiyalarni
  (auth, DB, to'lov, leaderboard) foydalanuvchi alohida so'ramaguncha
  qo'shmang.
- O'zgarish kiritgandan keyin `npm run build` orqali xatolik yo'qligini
  tekshiring.
