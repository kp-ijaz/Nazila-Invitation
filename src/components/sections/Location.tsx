"use client";

import QRCode from "react-qr-code";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import GoldButton from "@/components/ui/GoldButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT, LOCATION } from "@/lib/constants";

export default function Location() {
  const reduce = useReducedMotion();

  return (
    <section id="location" className="px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="Find Your Way" />
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="relative">
            <motion.div
              className="map-frame overflow-hidden rounded-sm border border-gold/25"
              initial={reduce ? false : { clipPath: "inset(14% 18% 14% 18% round 12px)", scale: 1.04 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <iframe
                src={EVENT.mapsEmbedUrl}
                title={`Map to ${EVENT.venue}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 sm:h-[30rem]"
              />
            </motion.div>

            {/* overlaps the map's bottom-left edge on large screens */}
            <motion.div
              className="glass-card mt-6 flex max-w-xl flex-col gap-6 p-6 sm:flex-row sm:items-center lg:absolute lg:-bottom-20 lg:left-10 lg:mt-0 lg:p-8"
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="shrink-0 self-start rounded-sm bg-white p-2">
                <QRCode value={EVENT.mapsUrl} size={104} fgColor="#2a211a" bgColor="#ffffff" level="M" />
              </div>
              <div>
                <p className="font-heading text-2xl font-light text-ink">{EVENT.venue}</p>
                <p className="mt-1 font-body text-sm font-light text-ink-muted">{LOCATION.qrCaption}</p>
                <GoldButton
                  href={EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="solid"
                  className="mt-5"
                >
                  <ExternalLink className="h-4 w-4" />
                  {LOCATION.mapsButton}
                </GoldButton>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
