import { IconClock } from "./icons";

interface ProgressBarProps {
  current: number;
  total: number;
  secondsLeft: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProgressBar({ current, total, secondsLeft }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((current / total) * 100));
  const isLow = secondsLeft <= 60;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
        <span className="font-medium">
          Savol {Math.min(current + 1, total)} / {total}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 ${
            isLow ? "font-semibold text-rose-500" : ""
          }`}
        >
          <IconClock className="h-4 w-4" />
          {formatTime(secondsLeft)}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
