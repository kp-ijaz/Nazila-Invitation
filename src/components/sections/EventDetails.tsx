import CalendarActions from "@/components/ui/CalendarActions";
import FadeIn from "@/components/ui/FadeIn";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT } from "@/lib/constants";

const ROWS = [
  { label: "Occasion", value: "Nikah Ceremony" },
  { label: "Date", value: EVENT.date },
  { label: "Time", value: EVENT.nikahTime },
  { label: "Venue", value: EVENT.venue },
];

// sm: definition-list rows separated by hairlines; lg: one row of centred cells split by vertical hairlines
const rowClass =
  "sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6 sm:border-t sm:border-gold/20 sm:py-9 lg:flex lg:flex-col lg:items-center lg:gap-0 lg:border-t-0 lg:border-l lg:px-5 lg:py-10 lg:text-center";
const valueClass = "mt-2 font-heading text-2xl font-light text-ink sm:mt-0 sm:text-4xl lg:mt-3 lg:text-[1.65rem] lg:leading-snug";

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`${rowClass} ${className}`}>
      <dt className="eyebrow sm:pt-3 lg:pt-0">{label}</dt>
      <dd className={valueClass}>{value}</dd>
    </div>
  );
}

export default function EventDetails() {
  return (
    <section id="details" className="section-alt px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="The Ceremony" />
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <dl className="lg:grid lg:grid-cols-5 lg:border-y lg:border-gold/25">
            {/* mobile: two columns split only by an ornamental centre line */}
            <div className="relative grid grid-cols-2 gap-y-7 sm:contents">
              <span className="ornamental-vline sm:hidden" aria-hidden />
              <OrnamentalDivider className="absolute top-1/2 left-1/2 !my-0 -translate-x-1/2 -translate-y-1/2 sm:hidden" />
              {ROWS.map(({ label, value }, i) => (
                <Row key={label} label={label} value={value} className={`${i % 2 === 0 ? "pr-5 sm:pr-0" : "pl-6 sm:pl-0"} ${i === 0 ? "lg:border-l-0" : ""}`} />
              ))}
            </div>

            <OrnamentalDivider className="my-7 sm:hidden" />

            <div className={`${rowClass} sm:border-b lg:border-b-0`}>
              <dt className="eyebrow sm:pt-3 lg:pt-0">Address</dt>
              <dd className={valueClass}>
                {EVENT.address}
                <a
                  href="#location"
                  className="ml-4 align-middle font-body text-xs lg:mt-2 lg:ml-0 lg:block tracking-[0.08em] text-gold underline-offset-4 hover:underline"
                >
                  View map &darr;
                </a>
              </dd>
            </div>
          </dl>
        </FadeIn>

        <FadeIn delay={0.35} duration={1}>
          <div className="mt-10">
            <CalendarActions />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
