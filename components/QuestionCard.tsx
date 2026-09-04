"use client";

import { Question } from "@/data/questions";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

const optionLetters = ["A", "B", "C", "D"];

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
  disabled,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <p className="mb-8 whitespace-pre-line text-center text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
        {question.prompt}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === question.correctIndex;
          const showFeedback = disabled;

          let stateClasses =
            "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50";
          if (showFeedback && isCorrectOption) {
            stateClasses = "border-emerald-400 bg-emerald-50 text-emerald-900";
          } else if (showFeedback && isSelected && !isCorrectOption) {
            stateClasses = "border-rose-400 bg-rose-50 text-rose-900";
          } else if (showFeedback) {
            stateClasses = "border-slate-200 bg-white opacity-60";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(index)}
              className={`flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left text-base font-medium text-slate-800 transition-colors disabled:cursor-not-allowed ${stateClasses}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                {optionLetters[index]}
              </span>
              <span className="whitespace-pre-line">{option}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
