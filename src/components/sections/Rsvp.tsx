"use client";

import { useState } from "react";
import { Download, HeartHandshake, MessageCircle, Phone } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import GoldButton from "@/components/ui/GoldButton";
import ThankYou from "@/components/ui/ThankYou";
import { CONTACTS, RSVP } from "@/lib/constants";

const whatsAppNumber = CONTACTS.whatsApp.replace(/[^0-9]/g, "");
const whatsAppLink = (text: string) =>
  `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(text)}`;

async function handleDownload() {
  const { downloadInvitationCard } = await import("@/lib/download-invitation");
  await downloadInvitationCard();
}

export default function Rsvp() {
  const [thanked, setThanked] = useState(false);

  return (
    <section id="rsvp" className="section-alt px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 border-y border-gold/25 py-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-14">
        <FadeIn duration={1.1}>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-[0.08em] text-ink sm:text-6xl">
            Will you
            <span className="gold-foil-text mt-2 block font-script text-6xl normal-case tracking-normal sm:text-8xl">
              Join us?
            </span>
          </h2>
          <p className="mt-8 max-w-md font-heading text-xl font-light italic text-ink/80 sm:text-2xl">
            Let us know you are coming, or send your duas from afar — both mean the world to us.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="flex flex-col gap-4">
            <GoldButton
              type="button"
              onClick={() => setThanked(true)}
              variant="solid"
              className="w-full"
            >
              <HeartHandshake className="h-4 w-4" />
              Joyfully Accept
            </GoldButton>
            <GoldButton
              href={whatsAppLink(RSVP.dua)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Send Duas
            </GoldButton>

            <div className="mt-6 flex flex-col gap-4 border-t border-gold/20 pt-6 font-body text-xs tracking-[0.08em] text-ink-muted">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-3 text-left transition-colors hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <Download className="h-4 w-4 text-gold" strokeWidth={1.5} />
                Download invitation
              </button>
              <a
                href={`tel:${CONTACTS.familyContact.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-gold-soft"
              >
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {CONTACTS.familyContact}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      <ThankYou open={thanked} onClose={() => setThanked(false)} />
    </section>
  );
}
