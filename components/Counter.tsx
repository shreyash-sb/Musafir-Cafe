"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, inView, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-primary/10 bg-white p-6 text-center shadow-xl shadow-primary/10 dark:border-white/10 dark:bg-white/10">
      <motion.strong className="font-heading text-5xl text-primary dark:text-white">{rounded}</motion.strong>
      <span className="font-heading text-5xl text-accent">{suffix}</span>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-cafe-muted dark:text-white/60">{label}</p>
    </div>
  );
}
