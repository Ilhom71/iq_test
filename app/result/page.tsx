"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS } from "@/data/questions";
import { FinalResult, iqLabel } from "@/lib/scoring";
import { loadResult } from "@/lib/storage";
import ResultGauge from "@/components/ResultGauge";

const MIN_IQ = 65;
const MAX_IQ = 145;

export default function ResultPage() {
  const [result, setResult] = useState<FinalResult | null | undefined>(undefined);

  useEffect(() => {
    // localStorage faqat brauzerda mavjud — shu sababli o'qish mount
    // bo'lgandan keyin, effect ichida amalga oshiriladi.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(loadResult());
  }, []);

  if (result === undefined) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-slate-400">Yuklanmoqda...</p>
      </main>
    );
  }

  if (result === null) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-lg text-slate-600">Hali natija topilmadi.</p>
        <Link
          href="/test"
          className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg"
        >
          Testni boshlash
        </Link>
      </main>
    );
  }

  return (
    <main className="relative flex-1">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Sizning natijangiz
        </h1>
        <p className="mt-2 text-center text-slate-500">
          {result.totalCorrect} / {result.totalQuestions} savolga to&apos;g&apos;ri javob berdingiz
        </p>

        <div className="mt-10">
          <ResultGauge
            iq={result.iq}
            min={MIN_IQ}
            max={MAX_IQ}
            label={iqLabel(result.iq)}
          />
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="mb-4 font-semibold text-slate-900">Toifalar bo&apos;yicha natija</h2>
          <div className="space-y-4">
            {result.categoryBreakdown.map((entry) => {
              const percent =
                entry.total === 0 ? 0 : Math.round((entry.correct / entry.total) * 100);
              return (
                <div key={entry.category}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {CATEGORY_LABELS[entry.category]}
                    </span>
                    <span className="text-slate-400">
                      {entry.correct}/{entry.total} · daraja {entry.maxDifficultyReached || "—"}/5
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95"
          >
            Qayta yechish
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
            Bosh sahifaga qaytish
          </Link>
        </div>

        <p className="mt-12 text-center text-xs text-slate-400">
          Bu test ilmiy sertifikatlangan psixometrik baholash emas — natija
          o&apos;z-o&apos;zini qiziqtirish maqsadida taxminiy tarzda hisoblangan.
        </p>
      </div>
    </main>
  );
}
