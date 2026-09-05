import { IconMedal } from "./icons";

interface ResultGaugeProps {
  iq: number;
  min: number;
  max: number;
  label: string;
}

export default function ResultGauge({ iq, min, max, label }: ResultGaugeProps) {
  const percent = Math.max(0, Math.min(100, ((iq - min) / (max - min)) * 100));
  const angle = (percent / 100) * 360;

  return (
    <div className="relative mx-auto h-56 w-56">
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(#d97706 0deg, #7c3aed ${angle * 0.5}deg, #0d9488 ${angle}deg, #e2e8f0 ${angle}deg)`,
        }}
      />
      <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
        <IconMedal className="mb-1 h-7 w-7 text-violet-600" />
        <span className="text-5xl font-extrabold font-display text-slate-900">{iq}</span>
        <span className="mt-1 text-sm font-semibold text-violet-600">{label}</span>
      </div>
    </div>
  );
}
