"use client";

import { Botanicals } from "@/components/ui/DecorativeElements";
import FadeIn from "@/components/ui/FadeIn";
import GuestGreeting from "@/components/ui/GuestGreeting";
import ScriptName from "@/components/ui/ScriptName";
import { BISMILLAH, COUPLE, EVENT, HERO } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden px-6 pt-32 pb-16 sm:px-12 lg:min-h-[92dvh] lg:px-20 lg:pt-24"
    >
      <Botanicals className="botanicals--hero" />
      <div className="hero-glow" aria-hidden />

      <p className="side-text eyebrow hidden lg:block">
        {HERO.ceremony} &nbsp;·&nbsp; {EVENT.dateMonthYear}
      </p>

      <div
        id="invitation-card"
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
      >
        <div>
          <FadeIn duration={1.1}>
            <p className="bismillah gold-foil-text font-arabic text-left" dir="rtl" lang="ar">
              {BISMILLAH}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} duration={1}>
            <div className="mt-10 sm:mt-5">
              <GuestGreeting />
              <p className="eyebrow">{HERO.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35} duration={1.2}>
            <div className="mt-2">
              <h1 className="display-name gold-foil-text">
                <ScriptName name={COUPLE.bride} />
              </h1>
              <div className="my-1 flex items-center gap-6 sm:my-2">
                <span className="font-heading text-6xl italic leading-none text-gold sm:text-8xl">&amp;</span>
                <span className="ornamental-line w-24 sm:w-56" />
              </div>
              <h1 className="display-name gold-foil-text sm:ml-[6vw]">
                <ScriptName name={COUPLE.groom} />
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} duration={1}>
            <p className="mt-6 max-w-md font-heading text-2xl font-light italic text-ink/85 sm:text-3xl">
              {HERO.invitation}
            </p>
            <dl className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 border-t border-gold/30 pt-6">
              <div>
                <dt className="eyebrow">Date</dt>
                <dd className="mt-1 font-heading text-xl font-light text-ink">{EVENT.date}</dd>
              </div>
              <div>
                <dt className="eyebrow">Time</dt>
                <dd className="mt-1 font-heading text-xl font-light text-gold-soft">{EVENT.nikahTime}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow">Venue</dt>
                <dd className="mt-1 font-heading text-xl font-light text-ink">
                  {EVENT.venue}, {EVENT.address}
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <div className="relative hidden min-h-[55vh] lg:block">
          <div className="date-stamp absolute right-0 bottom-0">
            <p className="font-heading text-sm italic text-gold">{EVENT.dateDay}</p>
            <p className="font-heading text-6xl font-light leading-none text-ink">{EVENT.dateNumber}</p>
            <p className="eyebrow mt-2 text-xs">{EVENT.dateMonthYear}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
