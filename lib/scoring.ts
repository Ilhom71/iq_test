// Adaptiv test mantiqi va IQ ball hisoblash — PLAN.md § 4 ga asoslangan.
// G'oya: Elo/IRT-uslubidagi adaptiv baholash. Natija HECH QACHON tasodifiy emas —
// to'liq javoblar tarixiga (qaysi qiyinlikda, to'g'ri/xato) bog'liq.

import { Category, Question, questions } from "@/data/questions";

export const TOTAL_QUESTIONS = 20;
export const CATEGORY_ORDER: Category[] = ["logical", "math", "verbal", "pattern"];

/** Har bir qiyinlik darajasining taxminiy IQ shkalasidagi joylashuvi. */
export const DIFFICULTY_IQ_MAP: Record<number, number> = {
  1: 85,
  2: 95,
  3: 105,
  4: 115,
  5: 130,
};

const INITIAL_ABILITY = 100;
const K_FACTOR = 8; // har bir javobdan keyingi o'zgarish sezgirligi
const SCALE = 20; // logistik funksiya kengligi (Elo divisor'ga o'xshash)
const MIN_IQ = 65;
const MAX_IQ = 145;

export interface AnswerRecord {
  questionId: string;
  category: Category;
  difficulty: number;
  correct: boolean;
}

export interface AdaptiveState {
  ability: number; // joriy taxminiy IQ (test davomida yangilanib boradi)
  difficultyLevel: number; // 1-5, keyingi savol shu darajadan tanlanadi
  usedIds: string[];
  history: AnswerRecord[];
}

/**
 * Test har doim eng oson savoldan boshlanadi (difficultyLevel 1) — shundan
 * keyin har bir to'g'ri javob qiyinlikni oshiradi, xato javob pasaytiradi.
 * `startDifficulty` faqat natija sahifasidan "qiyinroq test" tanlanganda
 * (avvalgi urinishning qiyinlik darajasidan) ishlatiladi.
 */
export function createInitialState(startDifficulty: number = 1): AdaptiveState {
  return {
    ability: INITIAL_ABILITY,
    difficultyLevel: clamp(startDifficulty, 1, 5),
    usedIds: [],
    history: [],
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Berilgan ability va savol qiyinligida to'g'ri javob berish ehtimoli (0-1). */
function expectedProbability(ability: number, difficultyIQ: number): number {
  return 1 / (1 + Math.pow(10, (difficultyIQ - ability) / SCALE));
}

/** Bitta javobdan keyin ability'ni Elo-uslubida yangilaydi. */
function updateAbility(ability: number, difficulty: number, correct: boolean): number {
  const difficultyIQ = DIFFICULTY_IQ_MAP[difficulty];
  const expected = expectedProbability(ability, difficultyIQ);
  const actual = correct ? 1 : 0;
  const next = ability + K_FACTOR * (actual - expected);
  return clamp(next, MIN_IQ, MAX_IQ);
}

/**
 * Keyingi savolni tanlaydi: berilgan toifada, joriy qiyinlik darajasiga eng
 * yaqin, hali ishlatilmagan savol. Agar aynan shu darajada savol qolmasa,
 * qo'shni darajalarga (±1, ±2, ...) o'tadi. Bir xil masofadagi savollar
 * bir nechta bo'lsa — ular orasidan TASODIFIY biri tanlanadi, shunda test
 * har safar boshqacha savollar ketma-ketligi bilan o'tadi (bir xil javob
 * yo'li bo'lsa ham savollar takrorlanib/yodlanib qolmaydi).
 */
export function selectNextQuestion(
  category: Category,
  difficultyLevel: number,
  usedIds: string[]
): Question | null {
  const usedSet = new Set(usedIds);
  const pool = questions.filter((q) => q.category === category && !usedSet.has(q.id));
  if (pool.length === 0) return null;

  let bestDistance = Infinity;
  for (const q of pool) {
    const distance = Math.abs(q.difficulty - difficultyLevel);
    if (distance < bestDistance) bestDistance = distance;
  }
  const candidates = pool.filter((q) => Math.abs(q.difficulty - difficultyLevel) === bestDistance);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Fisher–Yates aralashtirish — massivning nusxasini tasodifiy tartibda qaytaradi. */
function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Har bir test boshlanishida toifalar navbatini aralashtiradi — shunda test
 * har doim bir xil "mantiqiy → arifmetik → og'zaki → naqsh" tartibida emas,
 * tasodifiy tartibda boshlanadi.
 */
export function randomCategoryOrder(): Category[] {
  return shuffle(CATEGORY_ORDER);
}

/** Joriy state va foydalanuvchi javobiga asoslanib, keyingi state'ni hisoblaydi. */
export function applyAnswer(
  state: AdaptiveState,
  question: Question,
  correct: boolean
): AdaptiveState {
  const newAbility = updateAbility(state.ability, question.difficulty, correct);
  const newDifficulty = clamp(
    question.difficulty + (correct ? 1 : -1),
    1,
    5
  );
  return {
    ability: newAbility,
    difficultyLevel: newDifficulty,
    usedIds: [...state.usedIds, question.id],
    history: [
      ...state.history,
      { questionId: question.id, category: question.category, difficulty: question.difficulty, correct },
    ],
  };
}

export interface CategoryBreakdown {
  category: Category;
  correct: number;
  total: number;
  maxDifficultyReached: number;
}

export interface FinalResult {
  iq: number;
  totalCorrect: number;
  totalQuestions: number;
  categoryBreakdown: CategoryBreakdown[];
  /** Test tugagandagi qiyinlik darajasi — "qiyinroq test" taklifi shundan boshlanadi. */
  finalDifficultyLevel: number;
}

/** Test tugagach, yakuniy IQ ball va toifalar bo'yicha statistikani hisoblaydi. */
export function computeFinalResult(state: AdaptiveState): FinalResult {
  const breakdownMap = new Map<Category, CategoryBreakdown>();
  for (const cat of CATEGORY_ORDER) {
    breakdownMap.set(cat, { category: cat, correct: 0, total: 0, maxDifficultyReached: 0 });
  }

  let totalCorrect = 0;
  for (const record of state.history) {
    const entry = breakdownMap.get(record.category)!;
    entry.total += 1;
    if (record.correct) {
      entry.correct += 1;
      totalCorrect += 1;
    }
    if (record.correct && record.difficulty > entry.maxDifficultyReached) {
      entry.maxDifficultyReached = record.difficulty;
    }
  }

  return {
    iq: Math.round(state.ability),
    totalCorrect,
    totalQuestions: state.history.length,
    categoryBreakdown: Array.from(breakdownMap.values()),
    finalDifficultyLevel: state.difficultyLevel,
  };
}

export function iqLabel(iq: number): string {
  if (iq >= 130) return "Juda yuqori";
  if (iq >= 115) return "Yuqori";
  if (iq >= 85) return "O'rtacha";
  if (iq >= 70) return "Past";
  return "Juda past";
}
