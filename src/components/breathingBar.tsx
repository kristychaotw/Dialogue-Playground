import { useEffect, useRef, useState } from "react";

type BreathingBarProps = {
  durationMs?: number;
  onComplete?: () => void;
};

export function BreathingBar({
  durationMs = 3000,
  onComplete,
}: BreathingBarProps) {
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    const step = (t: number) => {
      if (start.current == null) start.current = t;
      const e = Math.min(t - start.current, durationMs);
      setElapsed(e);
      if (e < durationMs) raf.current = requestAnimationFrame(step);
      else onComplete?.();
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [durationMs, onComplete]);

  const pct = Math.round((elapsed / durationMs) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border bg-[#f8f5f0] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-neutral-700">花 3 秒，讓句子更像你。</p>
        <span className="text-xs text-neutral-500">{pct}%</span>
      </div>
      <div
        className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden"
        role="progressbar"
        aria-label="Breathing countdown"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="h-full bg-neutral-600 transition-[width] ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-neutral-500">
        {pct < 100
          ? "暫時停一下，等進度完成就可以開始。"
          : "準備好了，開始書寫吧。"}
      </div>
    </div>
  );
}
