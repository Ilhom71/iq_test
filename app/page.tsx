import Link from "next/link";
import { Category, CATEGORY_LABELS } from "@/data/questions";
import { CATEGORY_THEME } from "@/lib/theme";
import {
  IconArrowRight,
  IconLogical,
  IconMath,
  IconPattern,
  IconSpark,
  IconVerbal,
} from "@/components/icons";

const FEATURES: { category: Category; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { category: "pattern", icon: IconPattern, desc: "Naqsh va matritsalarni tahlil qilish qobiliyati" },
  { category: "math", icon: IconMath, desc: "Shakllar orasidan farqni yoki qoidabuzarni topish qobiliyati" },
  { category: "logical", icon: IconLogical, desc: "Ketma-ketliklarda qonuniyatni topish" },
  { category: "verbal", icon: IconVerbal, desc: "So'zlar orasidagi mantiqiy bog'liqlikni anglash" },
];

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Fon bezaklari — nuqtali to'r + rangli dog'lar, aniq gradient blur o'rniga xilma-xil rang */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="dot-grid-bg absolute inset-0 text-violet-900/[0.05]" />
      </div>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-16 text-center sm:pt-28">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-semibold text-violet-700 shadow-sm">
          <IconSpark className="h-4 w-4 text-amber-500" />
          Adaptiv IQ test — 20 savol, ~15 daqiqa
        </div>

        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Aqliy salohiyatingizni{" "}
          <span className="relative inline-block text-violet-600">
            sinab ko&apos;ring
            <svg
              viewBox="0 0 200 12"
              className="absolute -bottom-2 left-0 w-full text-amber-400"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 9c40-8 156-8 196 0"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Har bir javobingizga qarab savollar qiyinlashadi yoki osonlashadi —
          natija tasodifiy emas, faqat sizning haqiqiy ishlashingizga
          asoslanadi.
        </p>

        <Link
          href="/test"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105 hover:bg-violet-700 active:scale-95"
        >
          IQ testni boshlash
          <IconArrowRight className="h-5 w-5" />
        </Link>

        <p className="mt-4 text-sm text-slate-400">
          Ro&apos;yxatdan o&apos;tish shart emas · Bepul
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-6 text-center">
          <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
            Yoki bitta toifada mashq qiling
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Har bir kartaga bosing — faqat shu toifadan savollar bilan qisqa
            mashq boshlanadi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const theme = CATEGORY_THEME[f.category];
            const Icon = f.icon;
            return (
              <Link
                key={f.category}
                href={`/test?category=${f.category}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl p-2.5 text-white ${theme.solidBg}`}>
                  <Icon className="h-full w-full" />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{CATEGORY_LABELS[f.category]}</h3>
                <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
                <span
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
                  style={{ color: theme.hex }}
                >
                  Mashq qilish
                  <IconArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mx-auto max-w-2xl px-6 pb-12 text-center text-xs text-slate-400">
        Bu test ilmiy sertifikatlangan psixometrik baholash emas — o&apos;z-o&apos;zini
        qiziqtirish va ko&apos;ngilochar maqsadda mo&apos;ljallangan taxminiy natija
        beradi.
      </footer>
    </main>
  );
}
