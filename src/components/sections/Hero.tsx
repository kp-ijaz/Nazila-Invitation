"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import GuestGreeting from "@/components/ui/GuestGreeting";
import ScriptName from "@/components/ui/ScriptName";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { BISMILLAH, CLOSING_MESSAGE, COUPLE, EVENT, HERO, INVITATION_OPENED } from "@/lib/constants";

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

/** The same soft-focus rise for the details below the names, played as each one scrolls into view. */
function Reveal({ shown, className = "", children }: { shown: boolean; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : "hidden"}
      // waits for the opening screen too, which covers the hero while it is in view
      animate={shown && inView ? "shown" : "hidden"}
      variants={rise}
    >
      {children}
    </motion.div>
  );
}

/** First section: the Bismillah, the names, then the date and time. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // the entrance waits for the tap-to-open screen, so guests actually see it play
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  // fades only as the last lines leave the top of the screen, so the details stay readable while scrolling to them
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(INVITATION_OPENED, onOpen);
    return () => window.removeEventListener(INVITATION_OPENED, onOpen);
  }, []);

  const shown = open || reduce;

  return (
    <section ref={ref} id="hero" className="relative flex flex-1 items-center justify-center px-6 pt-20 pb-6">
      <motion.div className="w-full" style={reduce ? undefined : { y, opacity }}>
        <motion.div
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

          <motion.p variants={rise} className="eyebrow hero-gap-md uppercase">
            {HERO.subtitle}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-3 max-w-xs text-balance font-heading text-lg font-light italic leading-relaxed text-ink-muted sm:max-w-sm sm:text-xl"
          >
            {HERO.invitation}
          </motion.p>

          <Reveal shown={!!shown} className="hero-gap-lg">
            <p className="font-heading text-2xl font-light text-ink sm:text-3xl">{EVENT.dateDay}</p>
            <p className="mt-1 font-heading text-2xl font-light text-ink sm:text-3xl">
              {EVENT.dateNumber} {EVENT.dateMonthYear}
            </p>
          </Reveal>

          <Reveal shown={!!shown} className="hero-gap-md">
            <p className="eyebrow uppercase">{HERO.ceremony}</p>
            <p className="gold-foil-text mt-2 font-heading text-4xl font-light sm:text-5xl">{EVENT.nikahTime}</p>
          </Reveal>

          <Reveal shown={!!shown} className="hero-gap-md">
            <p className="max-w-xs text-balance font-heading text-lg font-light italic leading-relaxed text-ink-muted sm:max-w-sm sm:text-xl">
              {CLOSING_MESSAGE}
            </p>
          </Reveal>

          <Reveal shown={!!shown}>
            <ScrollIndicator />
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}
