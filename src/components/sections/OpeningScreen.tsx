"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMusic } from "@/components/providers/MusicProvider";
import { Botanicals } from "@/components/ui/DecorativeElements";
import Monogram from "@/components/ui/Monogram";
import ScriptName from "@/components/ui/ScriptName";
import { COUPLE, EVENT } from "@/lib/constants";
import { useScrollLock } from "@/lib/useScrollLock";

/**
 * Editorial welcome — monogram top-left, names stacked large, tap to enter and hear the nasheed.
 */
export default function OpeningScreen() {
  const { startMusic } = useMusic();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  useScrollLock(visible);

  useEffect(() => {
    // every visit starts at the top, behind the opening screen
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setMounted(true);
    setVisible(true);
  }, []);

  const dismiss = () => {
    startMusic();
    setVisible(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="fixed inset-0 z-[100] flex cursor-pointer touch-none overscroll-none flex-col justify-between overflow-hidden bg-paper px-6 py-8 sm:px-12 sm:py-10 lg:px-20"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: shouldReduceMotion ? 0.25 : 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          onClick={dismiss}
          role="button"
          tabIndex={0}
          aria-label="Tap to open invitation and play music"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              dismiss();
            }
          }}
        >
          <Botanicals className="botanicals--opening" />

          <motion.div
            className="pointer-events-none relative z-10 flex h-full flex-col justify-between"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <Monogram size="4.5rem" />
              <p className="eyebrow text-right">
                Nikah Invitation
                <span className="mt-1 block text-ink-muted">{EVENT.date}</span>
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">Together with our families</p>
              <h1 className="display-name gold-foil-text"><ScriptName name={COUPLE.bride} /></h1>
              <div className="my-1 flex items-center gap-6 sm:my-2">
                <span className="font-heading text-6xl italic leading-none text-gold sm:text-8xl">&amp;</span>
                <span className="ornamental-line w-32 sm:w-64" />
              </div>
              <h1 className="display-name gold-foil-text sm:ml-[8vw]"><ScriptName name={COUPLE.groom} /></h1>
            </div>

            <div className="flex items-end justify-between">
              <p className="opening-tap-hint eyebrow text-ink-muted">Tap to open</p>
              <p className="hidden font-heading text-xl font-light italic text-ink/70 sm:block">
                {EVENT.venue}
              </p>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
