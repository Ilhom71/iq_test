interface ResultGaugeProps {
  iq: number;
  min: number;
  max: number;
  label: string;
}

export default function ResultGauge({ iq, min, max, label }: ResultGaugeProps) {
  const percent = Math.max(0, Math.min(100, ((iq - min) / (max - min)) * 100));

  return (
    <div className="relative mx-auto h-56 w-56">
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(#6366f1 ${percent}%, #e2e8f0 ${percent}%)`,
        }}
      />
      <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
        <span className="text-5xl font-extrabold text-slate-900">{iq}</span>
        <span className="mt-1 text-sm font-medium text-indigo-600">{label}</span>
      </div>
    </div>
  );
}
