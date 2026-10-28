"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import ArabicCalligraphy from "@/components/ui/ArabicCalligraphy";
import SectionHeading from "@/components/ui/SectionHeading";
import { GoldLeaf } from "@/components/ui/DecorativeElements";
import { QURAN_VERSE } from "@/lib/constants";

export default function Invitation() {
  const [malayalam, setMalayalam] = useState(false);

  return (
    <section id="invitation" className="relative overflow-hidden px-6 pt-4 pb-14 sm:px-12 sm:pt-6 sm:pb-20 lg:px-20">
      <GoldLeaf className="right-8 top-10 -scale-x-100 opacity-40" />

      <div className="mx-auto max-w-6xl">
        <FadeIn duration={1}>
          <SectionHeading title="A Sign of His Mercy" />
        </FadeIn>

        <div className="mt-14 grid items-center gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-20">
          <FadeIn delay={0.14} duration={1.25} className="lg:order-2">
            <ArabicCalligraphy size="lg" className="gold-foil-text text-center lg:text-right">
              {QURAN_VERSE.arabic}
            </ArabicCalligraphy>
          </FadeIn>

          <FadeIn delay={0.3} duration={1.05} className="lg:border-r lg:border-gold/25 lg:pr-16">
            {/* "(Translate)" sits inline at the end of the quote and flips the language */}
            {(() => {
              const translate = (
                <button
                  type="button"
                  onClick={() => setMalayalam((v) => !v)}
                  className="ml-2 align-baseline font-body text-sm tracking-[0.06em] text-gold not-italic transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  aria-pressed={malayalam}
                  aria-label={malayalam ? "Read in English" : "Read in Malayalam"}
                >
                  (Translate)
                </button>
              );
              return malayalam ? (
                <p lang="ml" className="font-malayalam text-lg leading-relaxed text-ink/85 sm:text-xl sm:leading-relaxed">
                  &ldquo;{QURAN_VERSE.malayalam}&rdquo;{translate}
                </p>
              ) : (
                <p className="font-heading text-xl font-light italic leading-relaxed text-ink/85 sm:text-2xl sm:leading-relaxed">
                  &ldquo;{QURAN_VERSE.english}&rdquo;{translate}
                </p>
              );
            })()}
            <p className="eyebrow mt-8">
              — {malayalam ? QURAN_VERSE.referenceMalayalam : QURAN_VERSE.reference}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
