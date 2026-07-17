"use client";

import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import { motion, useInView } from "framer-motion";

function CountUpItem({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center flex flex-col items-center">
      <span className="text-5xl md:text-7xl font-serif text-accent-gold font-light tracking-tight leading-none mb-3 tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-mono max-w-[150px] leading-relaxed">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-bg-secondary border-t border-b border-border-light relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6">
          {personalInfo.stats.map((stat, idx) => (
            <CountUpItem
              key={idx}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
