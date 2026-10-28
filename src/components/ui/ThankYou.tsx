"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import CalendarActions from "@/components/ui/CalendarActions";
import GoldButton from "@/components/ui/GoldButton";
import Monogram from "@/components/ui/Monogram";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import ScriptName from "@/components/ui/ScriptName";
import { EVENT, LOCATION } from "@/lib/constants";
import { useScrollLock } from "@/lib/useScrollLock";

/** Shown after a guest taps "Joyfully Accept". */
export default function ThankYou({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const rise = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="thank-you fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto overscroll-contain px-6 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-lg text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute -top-2 right-0 rounded-full p-2 text-ink-muted transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <motion.div className="flex justify-center" {...rise(0.1)}>
              <div className="thank-you-halo">
                <Monogram size="6rem" />
              </div>
            </motion.div>

            <motion.p className="eyebrow mt-16" {...rise(0.3)}>
              Jazakallahu khairan
            </motion.p>
            <motion.h2
              id="thank-you-title"
              className="display-name gold-foil-text mx-auto mt-2 !text-6xl sm:!text-7xl"
              {...rise(0.4)}
            >
              <ScriptName name="Thank you" />
            </motion.h2>
            <motion.p className="mt-3 font-heading text-xl font-light italic text-ink/80 sm:text-2xl" {...rise(0.5)}>
              Your reply means the world to us. We can&rsquo;t wait to celebrate with you.
            </motion.p>

            <motion.div {...rise(0.65)}>
              <OrnamentalDivider className="my-7" />
              <p className="eyebrow">Let&rsquo;s meet on</p>
              <p className="mt-3 font-heading text-3xl font-light text-ink sm:text-4xl">{EVENT.date}</p>
              <p className="mt-2 font-heading text-xl text-gold">{EVENT.nikahTime}</p>
              <p className="mt-1 font-body text-sm text-ink-muted">
                {EVENT.venue}, {EVENT.address}
              </p>
            </motion.div>

            <motion.div className="mt-8 flex flex-col items-center gap-3" {...rise(0.8)}>
              <CalendarActions className="sm:justify-center" />
              <GoldButton href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" variant="solid">
                <MapPin className="h-4 w-4" />
                {LOCATION.mapsButton}
              </GoldButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
