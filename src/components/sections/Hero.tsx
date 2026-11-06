"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import GuestGreeting from "@/components/ui/GuestGreeting";
import ScriptName from "@/components/ui/ScriptName";
import { BISMILLAH, COUPLE, HERO, INVITATION_OPENED } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

// the Bismillah rises first, then the names follow
const sequence: Variants = {
  shown: { transition: { staggerChildren: 0.22, delayChildren: 0.3 } },
};

// soft-focus rise
const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.4, ease: EASE } },
};

/** Quiet first section: the Bismillah, the names, one line — and space. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // the entrance waits for the tap-to-open screen, so guests actually see it play
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(INVITATION_OPENED, onOpen);
    return () => window.removeEventListener(INVITATION_OPENED, onOpen);
  }, []);

  const shown = open || reduce;

  return (
    <section ref={ref} id="hero" className="relative flex flex-1 items-center justify-center px-6 pt-20 pb-6">
      {/* the motion wrapper stays outside the card, so "Download invitation" captures it untransformed */}
      <motion.div className="w-full" style={reduce ? undefined : { y, opacity }}>
        <motion.div
          id="invitation-card"
          className="mx-auto flex max-w-2xl flex-col items-center px-4 py-8 text-center"
          initial={reduce ? false : "hidden"}
          animate={shown ? "shown" : "hidden"}
          variants={sequence}
        >
          <motion.p variants={rise} lang="ar" dir="rtl" className="bismillah font-arabic gold-foil-text">
            {BISMILLAH}
          </motion.p>

          <motion.div variants={rise} className="hero-gap-lg">
            <GuestGreeting />
          </motion.div>

          <motion.h1 variants={rise} className="display-name hero-name gold-foil-text">
            <ScriptName name={COUPLE.bride} />
          </motion.h1>
          <motion.span variants={rise} className="hero-amp font-heading italic text-gold" aria-hidden>
            &amp;
          </motion.span>
          <motion.h1 variants={rise} className="display-name hero-name gold-foil-text">
            <span className="name-title">
              <ScriptName name={COUPLE.groomTitle} />
            </span>{" "}
            <ScriptName name={COUPLE.groomFull} />
          </motion.h1>

          <motion.p
            variants={rise}
            className="hero-gap-md max-w-xs text-balance font-heading text-lg font-light italic leading-relaxed text-ink-muted sm:max-w-sm sm:text-xl"
          >
            {HERO.invitation}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
