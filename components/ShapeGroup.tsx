"use client";

// "Vizual mantiq" VA "Naqsh / Matritsa" savollarida ko'rsatiladigan shakllar
// — tayyor rasm fayl yoki emoji EMAS (emoji operatsion tizimga qarab
// boshqacha, "g'alati" chiqib ketardi), va components/icons.tsx dagi
// tekis-chiziqli ikonlardan ham ATAYLAB farqli: har bir shakl TEKIS (bitta
// to'q) rangda, gradientsiz chiziladi (AGENTS.md: ortiqcha gradient
// ishlatilmaydi) — lekin yumaloq burchaklar (stroke-linejoin: round) va
// yumshoq soyasi (feDropShadow) bilan puxta, "o'yin toshi"ga o'xshash
// ko'rinishga ega bo'ladi. Barchasi SVG path/polygon orqali (canvas emas) —
// skalanadi, og'irlik qo'shmaydi.

import { useId, type CSSProperties } from "react";
import { HueName, ShapeItem, ShapeKind } from "@/data/questions";

/** Har bir rang nomining tekis (to'q, gradientsiz) rangi. "slate" — neytral/
 *  "faol emas" belgi uchun (diagonal/holat jumboqlarida). */
const HUES: Record<HueName, string> = {
  amber: "#f59e0b",
  cyan: "#0891b2",
  rose: "#e11d48",
  violet: "#7c3aed",
  emerald: "#059669",
  sky: "#0284c7",
  pink: "#db2777",
  slate: "#94a3b8",
};

/** Har bir shaklning o'z tabiiy (standart) rangi. */
const DEFAULT_HUE: Record<ShapeKind, HueName> = {
  triangle: "amber",
  circle: "cyan",
  square: "rose",
  diamond: "violet",
  pentagon: "emerald",
  hexagon: "sky",
  star: "pink",
};

/** Burchakli shakllar uchun nuqtalar (100x100 viewBox ichida). */
const POLYGON_POINTS: Partial<Record<ShapeKind, string>> = {
  triangle: "50,14 14,84 86,84",
  diamond: "50,8 92,50 50,92 8,50",
  pentagon: "50,6 93,38 76,92 24,92 7,38",
  hexagon: "27,9 73,9 96,50 73,91 27,91 4,50",
  star: "50,4 61,36 95,36 67,56 78,90 50,70 22,90 33,56 5,36 39,36",
};

/** Bitta shakl — kerak bo'lsa bo'sh konturli ("filled: false") variantda. */
export function Shape({ kind, hue, size = 48, rotate = 0, filled = true }: ShapeItem) {
  const shadowId = useId();
  const color = HUES[hue ?? DEFAULT_HUE[kind]];
  const fill = filled ? color : "white";
  const strokeWidth = filled ? 13 : 9;
  const style: CSSProperties = {
    overflow: "visible",
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    transformOrigin: "50% 50%",
    transformBox: "fill-box",
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden>
      <defs>
        <filter x="-40%" y="-40%" width="180%" height="180%" id={shadowId}>
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#181423" floodOpacity="0.18" />
        </filter>
      </defs>
      <g style={{ filter: `url(#${shadowId})` }}>
        {kind === "circle" && <circle cx="50" cy="50" r="40" fill={fill} stroke={color} strokeWidth={filled ? 0 : strokeWidth} />}
        {kind === "square" && (
          <rect x="12" y="12" width="76" height="76" rx="22" fill={fill} stroke={color} strokeWidth={filled ? 0 : strokeWidth} />
        )}
        {POLYGON_POINTS[kind] && (
          <polygon
            points={POLYGON_POINTS[kind]}
            fill={fill}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
      </g>
    </svg>
  );
}

/** Bitta "slot" ichida bir yoki bir nechta (item.count) shaklni ko'rsatadi —
 *  "soni ortib boradi" uslubidagi savollar uchun (masalan 3 ta doira). */
export function ShapeCluster({ item, slot = 56 }: { item: ShapeItem; slot?: number }) {
  const n = Math.max(1, item.count ?? 1);
  if (n === 1) return <Shape {...item} size={item.size ?? slot} />;

  const perRow = n <= 4 ? 2 : 3;
  const unit = item.size ?? Math.max(16, Math.round(slot / perRow) - 4);
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-1"
      style={{ width: slot, height: slot }}
    >
      {Array.from({ length: n }).map((_, i) => (
        <Shape key={i} {...item} count={undefined} size={unit} />
      ))}
    </div>
  );
}

/** Bir qatorli taqqoslash — "qaysi biri farq qiladi" uslubidagi savollar uchun. */
export function ShapeGroupPuzzle({ items }: { items: ShapeItem[] }) {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-6 rounded-2xl bg-slate-50 px-6 py-10 sm:gap-9">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2.5">
          <div className="flex h-20 w-20 items-center justify-center">
            <ShapeCluster item={item} slot={56} />
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Qator-ustun mantiqiy matritsa — yetishmagan (`null`) katak "?" bilan,
 *  bir oz "tortishib turgan" (pulse) urg'u bilan ko'rsatiladi. */
export function ShapeMatrixPuzzle({ cols, cells }: { cols: number; cells: (ShapeItem | null)[] }) {
  return (
    <div
      className="grid w-full max-w-sm gap-3 rounded-2xl bg-slate-50 p-5 sm:gap-4 sm:p-7"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((cell, i) =>
        cell ? (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-xl bg-white shadow-sm shadow-slate-900/5"
          >
            <ShapeCluster item={cell} slot={52} />
          </div>
        ) : (
          <div
            key={i}
            className="flex aspect-square animate-pulse items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-white text-2xl font-extrabold text-violet-500"
          >
            ?
          </div>
        )
      )}
    </div>
  );
}

/** Chapdan o'ngga o'qiladigan ketma-ketlik — "naqshni davom ettiring"
 *  savollari uchun; `null` bo'lgan bosqichda "?" chiziladi. */
export function ShapeSequencePuzzle({ steps }: { steps: (ShapeItem | null)[] }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-8 sm:gap-3 sm:px-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3">
          {i > 0 && (
            <span className="text-lg text-slate-300 sm:text-xl" aria-hidden>
              →
            </span>
          )}
          {step ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm shadow-slate-900/5 sm:h-[72px] sm:w-[72px]">
              <ShapeCluster item={step} slot={48} />
            </div>
          ) : (
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-white text-xl font-extrabold text-violet-500 sm:h-[72px] sm:w-[72px]">
              ?
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
