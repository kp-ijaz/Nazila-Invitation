"use client";

import { CalendarPlus, CalendarHeart } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import { downloadICS, getGoogleCalendarUrl } from "@/lib/calendar";

export default function CalendarActions({ className = "sm:justify-start" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <GoldButton onClick={downloadICS}>
        <CalendarHeart className="h-4 w-4 " />
        Save the Date
      </GoldButton>
      <GoldButton
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarPlus className="h-4 w-4 " />
        Add to Calendar
      </GoldButton>
    </div>
  );
}
