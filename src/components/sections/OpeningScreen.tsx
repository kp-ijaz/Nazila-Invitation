"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMusic } from "@/components/providers/MusicProvider";
import CoverMark from "@/components/ui/CoverMark";
import { INVITATION_OPENED } from "@/lib/constants";
import { useScrollLock } from "@/lib/useScrollLock";

// how long the monogram grows before the screen fades away (matches the CSS transition)
const OPEN_MS = 800;

/**
 * Welcome screen — a monogram on a clean page; tap to step through it, start the nasheed and enter.
 */
export default function OpeningScreen() {
  const { startMusic } = useMusic();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
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
    if (opening) return;
    startMusic(); // must run inside the tap itself or browsers block the audio
    window.dispatchEvent(new Event(INVITATION_OPENED));
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }
    setOpening(true);
    setTimeout(() => setVisible(false), OPEN_MS);
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
          <div className="opening-aura" aria-hidden />
          <div className="opening-grain" aria-hidden />

          <motion.div
            className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoverMark entering={opening} />
            <p
              className={`opening-tap-hint mt-10 font-body text-xs tracking-[0.32em] text-ink-muted transition-opacity duration-300 ${opening ? "!opacity-0" : ""}`}
            >
              Tap to open
            </p>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
