'use client';

import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);
  return count;
}

export default function StatCounter({ value, suffix = '', label, description }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, isInView);

  return (
    <div
      ref={ref}
      className="group bg-white border border-slate-200 rounded-[10px] p-4 sm:p-6 text-center hover:border-amber-300 hover:shadow-lg transition-all duration-300 card-elevated"
    >
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-amber-500 tracking-tight leading-none mb-1">
        {count.toLocaleString()}
        <span className="text-amber-400">{suffix}</span>
      </p>
      <p className="text-xs sm:text-sm font-bold text-slate-800 font-display mt-1.5 leading-tight">{label}</p>
      {description && (
        <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{description}</p>
      )}
    </div>
  );
}
