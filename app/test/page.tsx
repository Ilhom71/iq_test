"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Category, Question, questions } from "@/data/questions";
import {
  AdaptiveState,
  CATEGORY_ORDER,
  TOTAL_QUESTIONS,
  applyAnswer,
  computeFinalResult,
  createInitialState,
  randomCategoryOrder,
  selectNextQuestion,
} from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import CategoryBadge from "@/components/CategoryBadge";
import { IconCross } from "@/components/icons";

const TEST_DURATION_SECONDS = 15 * 60;
const SINGLE_CATEGORY_DURATION_SECONDS = 8 * 60;
const FEEDBACK_DELAY_MS = 650;
// Bitta toifada mashq qilishda to'liq testdan qisqaroq — 10 ta savol.
const SINGLE_CATEGORY_QUESTIONS = 10;

const VALID_CATEGORIES = new Set<Category>(CATEGORY_ORDER);

function clampDifficulty(value: number): number {
  return Math.min(5, Math.max(1, value));
}

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ?category=math kabi parametr bo'lsa — faqat shu toifadan savollar
  // beriladi (asosiy sahifadagi toifa tugmalari shu yerga yo'naltiradi).
  // Bo'lmasa — to'liq aralash adaptiv IQ test (barcha toifalar).
  const requestedCategory = searchParams.get("category");
  const singleCategory =
    requestedCategory && VALID_CATEGORIES.has(requestedCategory as Category)
      ? (requestedCategory as Category)
      : null;

  // Test har doim eng oson savoldan (1) boshlanadi. ?start=N faqat natija
  // sahifasidagi "Qiyinroq test" taklifidan kelganda ishlatiladi.
  const requestedStart = Number(searchParams.get("start"));
  const startDifficulty = clampDifficulty(
    Number.isFinite(requestedStart) && requestedStart > 0 ? requestedStart : 1
  );

  // Toifalar navbati har bir test boshlanishida tasodifiy aralashtiriladi
  // (bitta marta — keyin shu tartib saqlanadi), shunda savollar har safar
  // boshqacha ketma-ketlikda keladi. MUHIM: bu tasodifiy tanlov faqat
  // brauzerda, useEffect ichida (mount bo'lgandan keyin) amalga oshiriladi
  // — agar useState initializerida to'g'ridan-to'g'ri chaqirilsa, server
  // (SSR) va brauzer boshqa-boshqa tasodifiy natija berib, hydration
  // xatosiga olib kelardi (React server bilan client bir xil natija
  // kutadi, Math.random() esa har chaqirilganda boshqacha qiymat beradi).
  const [activeCategories, setActiveCategories] = useState<Category[] | null>(null);
  const totalQuestions = singleCategory
    ? Math.min(
        SINGLE_CATEGORY_QUESTIONS,
        questions.filter((q) => q.category === singleCategory).length
      )
    : TOTAL_QUESTIONS;
  const durationSeconds = singleCategory
    ? SINGLE_CATEGORY_DURATION_SECONDS
    : TEST_DURATION_SECONDS;

  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(() =>
    createInitialState(startDifficulty)
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // Bu yerda setState chaqirish ataylab qilingan — tasodifiy (Math.random
    // asosidagi) boshlang'ich holatni faqat mount'dan keyin o'rnatish SSR/
    // client hydration nomosligining oldini oladi (izohga qarang, yuqorida).
    const cats = singleCategory ? [singleCategory] : randomCategoryOrder();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveCategories(cats);
    setCurrentQuestion(selectNextQuestion(cats[0], startDifficulty, []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const stateRef = useRef(adaptiveState);
  const finishedRef = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    stateRef.current = adaptiveState;
  }, [adaptiveState]);

  useEffect(() => {
    pausedRef.current = showCancelConfirm;
  }, [showCancelConfirm]);

  const finishTest = (state: AdaptiveState) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const result = computeFinalResult(state);
    saveResult(result);
    router.push("/result");
  };

  // Umumiy taymer — "Bekor qilish" tasdiqlash oynasi ochiq bo'lganda to'xtaydi.
  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest(stateRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (index: number) => {
    if (phase === "feedback" || !currentQuestion || !activeCategories) return;
    setSelectedIndex(index);
    setPhase("feedback");

    setTimeout(() => {
      const correct = index === currentQuestion.correctIndex;
      const newState = applyAnswer(adaptiveState, currentQuestion, correct);
      setAdaptiveState(newState);

      const answeredCount = newState.history.length;
      if (answeredCount >= totalQuestions) {
        finishTest(newState);
        return;
      }

      const nextCategory = activeCategories[answeredCount % activeCategories.length];
      const nextQuestion = selectNextQuestion(
        nextCategory,
        newState.difficultyLevel,
        newState.usedIds
      );

      if (!nextQuestion) {
        finishTest(newState);
        return;
      }

      setCurrentQuestion(nextQuestion);
      setSelectedIndex(null);
      setPhase("answering");
    }, FEEDBACK_DELAY_MS);
  };

  if (!currentQuestion) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-slate-400">Yuklanmoqda...</p>
      </main>
    );
  }

  return (
    <main className="relative flex-1">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-2xl flex-col justify-center px-6 py-16">
        <div className="mb-4 flex items-center justify-between">
          {singleCategory ? <CategoryBadge category={singleCategory} /> : <span />}
          <button
            type="button"
            onClick={() => setShowCancelConfirm(true)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <IconCross className="h-3.5 w-3.5" />
            Testni bekor qilish
          </button>
        </div>

        <div className="mb-10">
          <ProgressBar
            current={adaptiveState.history.length}
            total={totalQuestions}
            secondsLeft={secondsLeft}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-violet-500/5">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              disabled={phase === "feedback"}
            />
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-6 backdrop-blur-sm"
            onClick={() => setShowCancelConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <IconCross className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Testni bekor qilasizmi?
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Joriy javoblaringiz saqlanmaydi va natija chiqmaydi.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="rounded-full bg-rose-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  Ha, bekor qilish
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="rounded-full bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Yo&apos;q, davom etaman
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <p className="text-slate-400">Yuklanmoqda...</p>
        </main>
      }
    >
      <TestContent />
    </Suspense>
  );
}
