"use client";

import { Question } from "@/data/questions";
import { motion } from "framer-motion";
import { CATEGORY_THEME } from "@/lib/theme";
import CategoryBadge from "./CategoryBadge";
import QuestionPrompt from "./QuestionPrompt";
import { ShapeCluster, ShapeGroupPuzzle, ShapeMatrixPuzzle, ShapeSequencePuzzle } from "./ShapeGroup";
import { IconCheck } from "./icons";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

const optionLetters = ["A", "B", "C", "D"];

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Qiyinlik darajasi: ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full ${n <= level ? "bg-amber-500" : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
}

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
  disabled,
}: QuestionCardProps) {
  const theme = CATEGORY_THEME[question.category];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <div className="mb-6 flex items-center justify-between">
        <CategoryBadge category={question.category} size="sm" />
        <DifficultyDots level={question.difficulty} />
      </div>

      <div className="mb-8 flex flex-col items-center gap-5">
        <QuestionPrompt prompt={question.prompt} accentHex={theme.hex} />
        {question.visual?.kind === "shape-group" && (
          <ShapeGroupPuzzle items={question.visual.items} />
        )}
        {question.visual?.kind === "shape-matrix" && (
          <ShapeMatrixPuzzle cols={question.visual.cols} cells={question.visual.cells} />
        )}
        {question.visual?.kind === "shape-sequence" && (
          <ShapeSequencePuzzle steps={question.visual.steps} />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          // To'g'ri/xato javob shu yerda ko'rsatilmaydi — foydalanuvchi faqat
          // tanlagan variantini ko'radi, natija test oxirida IQ ball sifatida
          // chiqadi (CLAUDE.md: adaptiv jarayon, oraliq "feedback" emas).
          const isSelected = selectedIndex === index;

          let stateClasses = "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50";
          let letterClasses = "bg-slate-100 text-slate-500";
          if (isSelected) {
            stateClasses = "border-violet-400 bg-violet-50 text-violet-900";
            letterClasses = "bg-violet-600 text-white";
          } else if (disabled) {
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
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${letterClasses}`}
              >
                {optionLetters[index]}
              </span>
              {question.optionShapes ? (
                <span className="flex flex-1 items-center">
                  <ShapeCluster item={question.optionShapes[index]} slot={40} />
                  <span className="sr-only">{option}</span>
                </span>
              ) : (
                <span className="flex-1 whitespace-pre-line">{option}</span>
              )}
              {isSelected && <IconCheck className="h-5 w-5 shrink-0 text-violet-600" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
