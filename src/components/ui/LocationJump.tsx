"use client";

import { MapPin } from "lucide-react";

export default function LocationJump() {
  const scrollToLocation = () => {
    document.getElementById("location")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToLocation}
      className="location-jump relative flex h-11 w-11 items-center justify-center rounded-full border sm:h-14 sm:w-14 border-gold/60 bg-surface/85 backdrop-blur-sm shadow-[0_6px_18px_rgba(107,67,25,0.12)] transition-all hover:border-gold"
      aria-label="View location"
    >
      <span className="location-jump-ping" aria-hidden />
      <MapPin
        className="location-jump-icon relative z-10 h-5 w-5 text-gold sm:h-6 sm:w-6"
        strokeWidth={2}
      />
    </button>
  );
}
