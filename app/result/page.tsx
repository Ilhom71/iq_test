"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORY_THEME } from "@/lib/theme";
import { FinalResult, iqLabel } from "@/lib/scoring";
import { loadResult } from "@/lib/storage";
import ResultGauge from "@/components/ResultGauge";
import CategoryBadge from "@/components/CategoryBadge";
import { IconArrowRight, IconMedal } from "@/components/icons";

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
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700"
        >
          Testni boshlash
        </Link>
      </main>
    );
  }

  return (
    <main className="relative flex-1">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
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

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display font-semibold text-slate-900">Toifalar bo&apos;yicha natija</h2>
          <div className="space-y-5">
            {result.categoryBreakdown
              .filter((entry) => entry.total > 0)
              .map((entry) => {
              const percent =
                entry.total === 0 ? 0 : Math.round((entry.correct / entry.total) * 100);
              const theme = CATEGORY_THEME[entry.category];
              return (
                <div key={entry.category}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <CategoryBadge category={entry.category} size="sm" />
                    <span className="text-slate-400">
                      {entry.correct}/{entry.total} · daraja {entry.maxDifficultyReached || "—"}/5
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: theme.hex }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {result.finalDifficultyLevel < 5 && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 p-2.5 text-white">
              <IconMedal className="h-full w-full" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display font-semibold text-slate-900">Yaxshi natija!</p>
              <p className="mt-0.5 text-sm text-slate-600">
                Qiyinroq darajadagi savollar bilan o&apos;zingizni sinab ko&apos;ring
              </p>
            </div>
            <Link
              href={`/test?start=${Math.min(5, result.finalDifficultyLevel + 1)}`}
              className="shrink-0 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Qiyinroq test
            </Link>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105 hover:bg-violet-700 active:scale-95"
          >
            Qayta yechish
            <IconArrowRight className="h-5 w-5" />
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
