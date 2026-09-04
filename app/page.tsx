import Link from "next/link";
import { CATEGORY_LABELS } from "@/data/questions";

const FEATURES: { emoji: string; title: string; desc: string }[] = [
  { emoji: "🧩", title: CATEGORY_LABELS.pattern, desc: "Naqsh va matritsalarni tahlil qilish qobiliyati" },
  { emoji: "🔢", title: CATEGORY_LABELS.math, desc: "Sonlar va formulalar bilan ishlash tezligi" },
  { emoji: "🔗", title: CATEGORY_LABELS.logical, desc: "Ketma-ketliklarda qonuniyatni topish" },
  { emoji: "💬", title: CATEGORY_LABELS.verbal, desc: "So'zlar orasidagi mantiqiy bog'liqlikni anglash" },
];

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Fon bezaklari */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
      </div>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-16 text-center sm:pt-32">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
          🧠 Adaptiv IQ test — 20 savol, ~15 daqiqa
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Aqliy salohiyatingizni{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            sinab ko&apos;ring
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Har bir javobingizga qarab savollar qiyinlashadi yoki osonlashadi —
          natija tasodifiy emas, faqat sizning haqiqiy ishlashingizga
          asoslanadi.
        </p>

        <Link
          href="/test"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95"
        >
          Testni boshlash
          <span aria-hidden>→</span>
        </Link>

        <p className="mt-4 text-sm text-slate-400">
          Ro&apos;yxatdan o&apos;tish shart emas · Bepul
        </p>
      </section>

      <section className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-6 pb-24 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-left shadow-sm backdrop-blur transition-shadow hover:shadow-md"
          >
            <div className="mb-3 text-3xl">{f.emoji}</div>
            <h3 className="font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="mx-auto max-w-2xl px-6 pb-12 text-center text-xs text-slate-400">
        Bu test ilmiy sertifikatlangan psixometrik baholash emas — o&apos;z-o&apos;zini
        qiziqtirish va ko&apos;ngilochar maqsadda mo&apos;ljallangan taxminiy natija
        beradi.
      </footer>
    </main>
  );
}
