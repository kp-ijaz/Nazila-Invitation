"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { Rise } from "@/components/ui/Motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date(EVENT.countdownTarget).getTime();
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

const digitClass =
  "gold-foil-text block font-heading text-5xl font-light leading-none tabular-nums sm:text-8xl lg:text-[7.25rem]";

function CountdownDigit({ value, counting }: { value: string; counting: boolean }) {
  // while counting up the value changes every frame, so skip the per-change flip
  if (counting) return <span className={digitClass}>{value}</span>;
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className={digitClass}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const seen = useInView(grid, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  // 0 → 1 the first time the numbers are seen; they count up from zero to the live values
  const [k, setK] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (reduce) return setK(1);
    const run = animate(0, 1, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setK });
    return () => run.stop();
  }, [seen, reduce]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-alt px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn duration={1}>
          <SectionHeading title="Counting the Days" />
        </FadeIn>

        <FadeIn delay={0.15} duration={1}>
          <div ref={grid} className="grid grid-cols-2 border-y border-gold/25 lg:grid-cols-4">
            {UNITS.map(({ key, label }, i) => (
              <Rise
                key={key}
                index={i}
                className={`px-5 py-6 text-center sm:px-8 sm:py-14 sm:text-left ${i % 2 === 1 ? "border-l border-gold/25" : ""} ${i >= 2 ? "border-t border-gold/25 lg:border-t-0 lg:border-l" : ""}`}
              >
                <CountdownDigit
                  value={timeLeft ? String(Math.round(timeLeft[key] * k)).padStart(2, "0") : "--"}
                  counting={k < 1}
                />
                <span className="eyebrow mt-3 block text-ink-muted sm:mt-5">{label}</span>
              </Rise>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
