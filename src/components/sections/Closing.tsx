import { Botanicals } from "@/components/ui/DecorativeElements";
import FadeIn from "@/components/ui/FadeIn";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import ScriptName from "@/components/ui/ScriptName";
import { CLOSING_MESSAGE, COUPLE, FOOTER } from "@/lib/constants";

export default function Closing() {
  return (
    <section className="closing-band relative overflow-hidden px-6 py-7 text-center sm:px-12 sm:py-9 lg:px-20">
      <Botanicals className="botanicals--band" />
      <FadeIn duration={1.1} className="relative mx-auto max-w-2xl">
        <p className="font-heading text-lg font-medium leading-snug text-ink sm:text-xl">
          {CLOSING_MESSAGE}
        </p>
        <OrnamentalDivider className="!my-1" />
        <p className="display-name gold-foil-text mx-auto !text-4xl sm:!text-5xl">
          <ScriptName name={COUPLE.bride} /> &amp; <ScriptName name={COUPLE.groom} />
        </p>
        <p className="mt-1 font-heading text-base font-medium italic text-ink">{FOOTER.family}</p>
      </FadeIn>
    </section>
  );
}
