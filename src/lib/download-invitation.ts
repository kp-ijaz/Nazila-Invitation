"use client";

import { toPng } from "html-to-image";
import { INVITATION_CARD } from "@/lib/constants";

// paint and type properties that come from stylesheets; transforms stay on the elements' own attributes
const SVG_PROPS = [
  "fill",
  "fill-opacity",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",
  "opacity",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
];

/** html-to-image doesn't carry stylesheet rules into inline SVG, so pin each part's resolved style inline. Returns an undo. */
function inlineSvgStyles(root: HTMLElement) {
  const saved: [Element & ElementCSSInlineStyle, string | null][] = [];
  root.querySelectorAll<SVGElement>("svg, svg *").forEach((el) => {
    const computed = getComputedStyle(el);
    saved.push([el, el.getAttribute("style")]);
    for (const prop of SVG_PROPS) el.style.setProperty(prop, computed.getPropertyValue(prop));
  });
  return () =>
    saved.forEach(([el, style]) => (style === null ? el.removeAttribute("style") : el.setAttribute("style", style)));
}

// Renders the live hero card to PNG so the download always matches the page.
export async function downloadInvitationCard(): Promise<void> {
  const card = document.getElementById("invitation-card");
  if (!card) return;

  // freeze the monogram's draw-in so the image shows it finished, not its first frame
  card.classList.add("is-exporting");
  const restoreSvg = inlineSvgStyles(card);
  try {
    const dataUrl = await toPng(card, {
      pixelRatio: 2,
      backgroundColor: "#faf6ee",
      // the card is centred with auto margins on the page; in the image they would push it off the edge
      style: { margin: "0" },
      filter: (node) =>
        !(node instanceof Element && node.hasAttribute("data-export-hide")),
    });
    const link = document.createElement("a");
    link.download = INVITATION_CARD.filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to download invitation card:", error);
  } finally {
    restoreSvg();
    card.classList.remove("is-exporting");
  }
}
