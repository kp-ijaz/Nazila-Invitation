"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { COUPLE, EVENT } from "@/lib/constants";

const ITEMS = [COUPLE.shortName, EVENT.date, EVENT.nikahTime, `${EVENT.venue}, ${EVENT.address}`];

// the track holds the items twice, so wrapping within half its width loops seamlessly
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Gold ribbon that drifts on its own and speeds up, or turns around, with the guest's scrolling. */
export default function Marquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    let move = direction.current * 1.25 * (delta / 1000); // half the track every 40s at rest
    move += move * Math.abs(b);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="marquee print:hidden" aria-hidden>
      <motion.div className="marquee-track font-display text-xs tracking-[0.12em] text-gold" style={{ x }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i}>
            {item} <span className="ml-8 text-gold-soft">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
