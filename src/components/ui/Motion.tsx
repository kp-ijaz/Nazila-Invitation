"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin bronze line across the top that fills as the guest scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress print:hidden" style={{ scaleX }} aria-hidden />;
}

/** Words rise one after another out of a mask when the line comes into view. */
export function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;

  // the line is watched as a whole: each word sits clipped inside its mask, so it can't be watched itself
  return (
    <motion.span initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="reveal-mask">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                shown: { y: "0%", transition: { duration: 0.9, delay: delay + i * 0.07, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.span>
  );
}

function ScrubWord({ progress, range, className, children }: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span className={className} style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Words light up one by one as the guest scrolls through the passage. */
export function ScrubWords({ text, wordClassName, after }: { text: string; wordClassName?: string; after?: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const words = text.split(" ");

  return (
    <span ref={ref} className="block">
      {reduce
        ? words.map((w, i) => (
            <span key={i} className={wordClassName}>
              {w}{" "}
            </span>
          ))
        : words.map((w, i) => (
            <ScrubWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} className={wordClassName}>
              {w}
            </ScrubWord>
          ))}
      {after}
    </span>
  );
}

/** Writes its content in from left to right, like a pen stroke. */
export function WipeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;

  // the outer span is watched: the clipped inner one has no visible area, so it would never count as in view
  return (
    <motion.span className={`block ${className}`} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }}>
      <motion.span
        className="block"
        variants={{
          // generous negative insets keep the script's swashes from being clipped once revealed
          hidden: { clipPath: "inset(-30% 100% -40% -10%)" },
          shown: { clipPath: "inset(-30% -10% -40% -10%)", transition: { duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** A hairline that draws out from its start when it comes into view. */
export function DrawLine({ className = "", delay = 0, origin = "left" }: { className?: string; delay?: number; origin?: "left" | "right" | "center" }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      style={{ transformOrigin: origin }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
      aria-hidden
    />
  );
}

/** Children rise into place one after another; pass the child's position as `index`. */
export function Rise({ children, index = 0, className = "", as = "div" }: { children: ReactNode; index?: number; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
