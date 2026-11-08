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
  // rendered into the page's HTML, so the cover shows before any script has loaded
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  useScrollLock(visible);

  useEffect(() => {
    // every visit starts at the top, behind the opening screen
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
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

          {/* the entrances are CSS animations so they play straight from the HTML, before hydration */}
          <div className="opening-rise pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
            <CoverMark entering={opening} />
          </div>

          {/* pinned 30px above the bottom edge, clear of the iPhone home indicator */}
          <p
            className={`opening-hint-in pointer-events-none absolute inset-x-0 z-10 text-center font-body text-xs tracking-[0.32em] text-ink-muted transition-opacity duration-300 ${opening ? "!opacity-0" : ""}`}
            style={{ bottom: "calc(30px + env(safe-area-inset-bottom))" }}
          >
            <span className="opening-tap-hint inline-block">Tap to open</span>
          </p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
