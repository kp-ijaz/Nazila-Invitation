import { COUPLE, EVENT } from "@/lib/constants";

const ITEMS = [COUPLE.shortName, EVENT.date, EVENT.nikahTime, `${EVENT.venue}, ${EVENT.address}`];

/** Scrolling gold ribbon; content is doubled so the loop is seamless. */
export default function Marquee() {
  return (
    <div className="marquee print:hidden" aria-hidden>
      <div className="marquee-track font-display text-xs tracking-[0.12em] text-gold">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i}>
            {item} <span className="ml-8 text-gold-soft">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
