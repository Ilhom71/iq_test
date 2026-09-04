"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Question } from "@/data/questions";
import {
  AdaptiveState,
  CATEGORY_ORDER,
  TOTAL_QUESTIONS,
  applyAnswer,
  computeFinalResult,
  createInitialState,
  selectNextQuestion,
} from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

const TEST_DURATION_SECONDS = 15 * 60;
const FEEDBACK_DELAY_MS = 650;

export default function TestPage() {
  const router = useRouter();
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(createInitialState);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(() =>
    selectNextQuestion(CATEGORY_ORDER[0], 3, [])
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);

  const stateRef = useRef(adaptiveState);
  const finishedRef = useRef(false);

  useEffect(() => {
    stateRef.current = adaptiveState;
  }, [adaptiveState]);

  const finishTest = (state: AdaptiveState) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const result = computeFinalResult(state);
    saveResult(result);
    router.push("/result");
  };

  // Umumiy taymer
  useEffect(() => {
    const interval = setInterval(() => {
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
    if (phase === "feedback" || !currentQuestion) return;
    setSelectedIndex(index);
    setPhase("feedback");

    setTimeout(() => {
      const correct = index === currentQuestion.correctIndex;
      const newState = applyAnswer(adaptiveState, currentQuestion, correct);
      setAdaptiveState(newState);

      const answeredCount = newState.history.length;
      if (answeredCount >= TOTAL_QUESTIONS) {
        finishTest(newState);
        return;
      }

      const nextCategory = CATEGORY_ORDER[answeredCount % CATEGORY_ORDER.length];
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
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-2xl flex-col justify-center px-6 py-16">
        <div className="mb-10">
          <ProgressBar
            current={adaptiveState.history.length}
            total={TOTAL_QUESTIONS}
            secondsLeft={secondsLeft}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-indigo-500/5 backdrop-blur">
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
    </main>
  );
}
