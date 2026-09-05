// Savol matnini (question.prompt) tahlil qilib, agar ichida ketma-ketlik/
// matritsa (masalan "🔺 🔵 🔺" yoki "2, 4, 6, 8, ?") bo'lsa — uni chinakam
// vizual grid/ketma-ketlik sifatida chizadi, oddiy uzun matn qatori sifatida
// emas. Shu orqali "naqsh/matritsa" savollari ancha tushunarli bo'ladi.

interface QuestionPromptProps {
  prompt: string;
  accentHex: string;
}

type Segment =
  | { kind: "text"; lines: string[] }
  | { kind: "grid"; rows: string[][] };

/** Qator sof "belgilar qatori" (harf/so'z emas, ramz/raqam/emoji) ekanini aniqlaydi. */
function isGridLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  const tokens = trimmed.includes(",")
    ? trimmed.split(",").map((t) => t.trim())
    : trimmed.split(/\s+/);
  if (tokens.length === 0) return false;
  return tokens.every((t) => t.length > 0 && t.length <= 6 && !/[a-zA-Z]{2,}/.test(t));
}

/** Bitta grid qatorini alohida katakchalarga ajratadi. */
function splitCells(line: string): string[] {
  const trimmed = line.trim();
  if (trimmed.includes(",")) return trimmed.split(",").map((t) => t.trim());
  if (trimmed.includes("|")) return trimmed.split("|").map((t) => t.trim());
  if (/\s/.test(trimmed)) return trimmed.split(/\s+/).filter(Boolean);
  return [trimmed];
}

function segmentPrompt(prompt: string): Segment[] {
  const lines = prompt.split("\n");
  const segments: Segment[] = [];

  for (const rawLine of lines) {
    const grid = isGridLine(rawLine);
    const last = segments[segments.length - 1];
    if (grid) {
      const cells = splitCells(rawLine);
      if (last && last.kind === "grid") {
        last.rows.push(cells);
      } else {
        segments.push({ kind: "grid", rows: [cells] });
      }
    } else {
      if (last && last.kind === "text") {
        last.lines.push(rawLine);
      } else {
        segments.push({ kind: "text", lines: [rawLine] });
      }
    }
  }

  return segments;
}

function GridCell({
  value,
  accentHex,
  muted = false,
}: {
  value: string;
  accentHex: string;
  muted?: boolean;
}) {
  const isAnswer = value === "?";
  return (
    <div
      className={`flex aspect-square min-w-12 flex-1 items-center justify-center rounded-2xl border-2 text-xl font-semibold leading-none sm:min-w-16 sm:text-2xl ${
        isAnswer ? "animate-pulse border-dashed bg-white" : "border-transparent bg-white"
      } ${muted ? "opacity-70" : ""}`}
      style={{
        borderColor: isAnswer ? accentHex : "transparent",
        color: isAnswer ? accentHex : "#181423",
        boxShadow: isAnswer ? "none" : "0 1px 2px rgba(24,20,35,.06)",
      }}
    >
      {value}
    </div>
  );
}

function GridBlock({ rows, accentHex }: { rows: string[][]; accentHex: string }) {
  if (rows.length === 1) {
    // Bitta qator — gorizontal ketma-ketlik (masalan "2, 4, 6, 8, ?")
    const cells = rows[0];
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {cells.map((cell, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            {i > 0 && (
              <span className="text-lg text-slate-300 sm:text-xl" aria-hidden>
                →
              </span>
            )}
            <GridCell value={cell} accentHex={accentHex} />
          </div>
        ))}
      </div>
    );
  }

  const colCounts = rows.map((r) => r.length);
  const primaryCols = Math.max(...colCounts.slice(0, -1), colCounts[0]);
  const lastRow = rows[rows.length - 1];
  const lastIsShorter = lastRow.length < primaryCols;
  const mainRows = lastIsShorter ? rows.slice(0, -1) : rows;
  const allEqual = mainRows.every((r) => r.length === mainRows[0].length);

  if (!allEqual) {
    // Kutilmagan shakl — har qatorni alohida qator sifatida chiz (xavfsiz variant)
    return (
      <div className="flex flex-col items-center gap-2">
        {rows.map((row, r) => (
          <div key={r} className="flex flex-wrap justify-center gap-2">
            {row.map((cell, c) => (
              <GridCell key={c} value={cell} accentHex={accentHex} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  const cols = mainRows[0].length;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {mainRows.map((row, r) =>
          row.map((cell, c) => <GridCell key={`${r}-${c}`} value={cell} accentHex={accentHex} />)
        )}
      </div>
      {lastIsShorter && (
        <div className="flex items-center gap-2 text-slate-400">
          <span aria-hidden>↓ keyingi qator</span>
        </div>
      )}
      {lastIsShorter && (
        <div className="flex justify-center gap-2">
          {lastRow.map((cell, c) => (
            <GridCell key={c} value={cell} accentHex={accentHex} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuestionPrompt({ prompt, accentHex }: QuestionPromptProps) {
  const segments = segmentPrompt(prompt);

  return (
    <div className="flex flex-col items-center gap-6">
      {segments.map((seg, i) =>
        seg.kind === "text" ? (
          <p
            key={i}
            className="whitespace-pre-line text-center text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl"
          >
            {seg.lines.join("\n")}
          </p>
        ) : (
          <GridBlock key={i} rows={seg.rows} accentHex={accentHex} />
        )
      )}
    </div>
  );
}
