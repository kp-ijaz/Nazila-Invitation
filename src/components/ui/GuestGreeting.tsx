"use client";

import { useEffect, useState } from "react";

// Personalises the card when the link carries ?to=Guest+Name
export default function GuestGreeting() {
  const [guest, setGuest] = useState("");

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("to")?.trim() ?? "";
    setGuest(name.slice(0, 40));
  }, []);

  if (!guest) return null;

  return (
    <p className="mb-3 font-heading text-xl italic text-gold-soft sm:text-2xl">
      Dear {guest},
    </p>
  );
}
