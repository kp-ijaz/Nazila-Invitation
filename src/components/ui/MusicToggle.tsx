"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/components/providers/MusicProvider";

export default function MusicToggle() {
  const { isPlaying, hasError, toggle } = useMusic();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border sm:h-14 sm:w-14 bg-surface/85 backdrop-blur-sm shadow-[0_6px_18px_rgba(107,67,25,0.12)] transition-all ${
          hasError
            ? "border-red-400 ring-2 ring-red-300/60"
            : isPlaying
              ? "border-gold music-toggle-active"
              : "border-gold/60 hover:border-gold music-toggle-idle"
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
      >
        {isPlaying && <span className="music-toggle-ping" aria-hidden />}
        {isPlaying ? (
          <Volume2 className="music-toggle-icon relative z-10 h-5 w-5 text-gold sm:h-6 sm:w-6" strokeWidth={2} />
        ) : (
          <VolumeX className="music-toggle-icon-idle relative z-10 h-5 w-5 text-gold sm:h-6 sm:w-6" strokeWidth={2} />
        )}
      </button>
      {hasError && (
        <span className="sr-only" role="status" aria-live="polite">
          Music could not play. Tap again or check the audio file.
        </span>
      )}
    </div>
  );
}
