"use client";

import { motion, useReducedMotion } from "framer-motion";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { RevealWords } from "@/components/ui/Motion";

export default function SectionHeading({ title }: { title: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4">
      <h2 className="font-display text-[1.375rem] font-medium tracking-[0.04em] whitespace-nowrap text-ink sm:text-4xl sm:tracking-[0.06em]">
        <RevealWords text={title} />
      </h2>
      {/* the ornament unfurls after the title has risen */}
      <motion.div
        style={{ transformOrigin: "left" }}
        initial={reduce ? false : { opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <OrnamentalDivider className="!my-0 [&>img]:w-14 sm:[&>img]:w-[120px]" />
      </motion.div>
    </div>
  );
}
