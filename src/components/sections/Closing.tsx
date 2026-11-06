import FadeIn from "@/components/ui/FadeIn";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import ScriptName from "@/components/ui/ScriptName";
import { RevealWords, WipeIn } from "@/components/ui/Motion";
import { CLOSING_MESSAGE, COUPLE, FOOTER } from "@/lib/constants";

export default function Closing() {
  return (
    <section className="border-t border-gold/20 px-6 py-10 text-center sm:px-12 sm:py-12 lg:px-20">
      <FadeIn duration={1.1} className="relative mx-auto max-w-2xl">
        <p className="mx-auto max-w-[15rem] font-heading text-lg font-medium leading-snug text-ink sm:max-w-none sm:text-xl">
          <RevealWords text={CLOSING_MESSAGE} />
        </p>
        <OrnamentalDivider className="!my-1" />
        <WipeIn delay={0.5} className="block">
          <span className="display-name gold-foil-text mx-auto block !text-4xl sm:!text-5xl">
            <ScriptName name={COUPLE.bride} /> &amp; <ScriptName name={COUPLE.groom} />
          </span>
        </WipeIn>
        <p className="mt-1 font-heading text-base font-medium italic text-ink">{FOOTER.family}</p>
      </FadeIn>
    </section>
  );
}
