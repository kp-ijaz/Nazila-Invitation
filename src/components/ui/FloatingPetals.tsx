"use client";

import { motion, useReducedMotion } from "framer-motion";

const MOTES = [
  { left: "6%", delay: 0, duration: 18, size: 3 },
  { left: "18%", delay: 4, duration: 22, size: 2 },
  { left: "33%", delay: 1, duration: 20, size: 2 },
  { left: "48%", delay: 6, duration: 24, size: 3 },
  { left: "62%", delay: 2, duration: 19, size: 2 },
  { left: "77%", delay: 5, duration: 23, size: 3 },
  { left: "91%", delay: 3, duration: 21, size: 2 },
];

/** Slow-rising gold dust across the whole page. */
export default function FloatingPetals() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden print:hidden" aria-hidden>
      {MOTES.map((mote, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full bg-gold-soft shadow-[0_0_8px_rgba(241,217,146,0.9)]"
          style={{ left: mote.left, width: mote.size, height: mote.size }}
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 0.7, 0.7, 0], x: [0, 12, -8, 0] }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
