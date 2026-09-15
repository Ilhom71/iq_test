import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconPhone, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati",
  description:
    "IQ Test Online maxfiylik siyosati: ro'yxatdan o'tish talab qilinmaydi, ma'lumotlar faqat brauzeringizda saqlanadi, cookie va kuzatuv tizimlari ishlatilmaydi.",
  alternates: { canonical: "/maxfiylik" },
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Ro'yxatdan o'tish va hisob talab qilinmaydi",
    body: "Testni topshirish uchun ro'yxatdan o'tish, login yoki parol kerak emas. Ismingiz, email yoki telefon raqamingizni so'ramaymiz.",
  },
  {
    title: "Ma'lumotlar faqat sizning brauzeringizda saqlanadi",
    body: "Test davomidagi javoblaringiz va yakuniy natija hech qanday serverga yuborilmaydi — ular faqat shu qurilmadagi brauzer xotirasida (localStorage) saqlanadi. Boshqa hech kim, jumladan sayt egasi ham, bu ma'lumotlarga kira olmaydi.",
  },
  {
    title: "Cookie va kuzatuv tizimlari ishlatilmaydi",
    body: "Sayt sizni kuzatib boruvchi cookie, reklama tarmog'i yoki tahlil (analytics) xizmatlaridan foydalanmaydi.",
  },
  {
    title: "Ma'lumotlarni o'chirish",
    body: "Brauzeringiz sozlamalaridan sayt ma'lumotlarini istalgan vaqtda tozalashingiz mumkin — bu saqlangan natijangizni butunlay o'chiradi.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative flex-1">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-5 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 p-3 text-white shadow-lg shadow-violet-500/30">
            <IconShield className="h-full w-full" />
          </span>
        </div>
        <h1 className="text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          Maxfiylik siyosati
        </h1>
        <p className="mt-3 text-center text-slate-500">
          Maxfiyligingiz biz uchun muhim. Quyida ma&apos;lumotlaringiz bilan
          qanday ishlashimiz haqida to&apos;liq tushuntirilgan.
        </p>

        <div className="mt-10 space-y-4">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-display font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl bg-violet-50 p-6 text-center">
          <p className="text-sm text-violet-700">
            Savol yoki takliflaringiz bo&apos;lsa, biz bilan bog&apos;laning
          </p>
          <a
            href="tel:+998940442604"
            className="inline-flex items-center gap-2 font-display text-lg font-bold text-violet-700"
          >
            <IconPhone className="h-5 w-5" />
            +998 94 044 26 04
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105 hover:bg-violet-700 active:scale-95"
          >
            Bosh sahifaga qaytish
            <IconArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
