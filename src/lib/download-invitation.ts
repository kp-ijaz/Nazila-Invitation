"use client";

import { toPng } from "html-to-image";
import { INVITATION_CARD } from "@/lib/constants";

// Renders the live hero card to PNG so the download always matches the page.
export async function downloadInvitationCard(): Promise<void> {
  const card = document.getElementById("invitation-card");
  if (!card) return;

  try {
    const dataUrl = await toPng(card, {
      pixelRatio: 2,
      backgroundColor: "#faf6ee",
      filter: (node) =>
        !(node instanceof Element && node.hasAttribute("data-export-hide")),
    });
    const link = document.createElement("a");
    link.download = INVITATION_CARD.filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to download invitation card:", error);
  }
}
