import { COUPLE } from "@/lib/constants";

// ring geometry in the 300×300 viewBox; the ring is open on the lower left, where the sprig grows
const CX = 165;
const CY = 150;
const R = 105;
const RING_START = 240; // degrees, clockwise from 3 o'clock
const RING_SWEEP = 230;

// sprig stem: quadratic curve from the end of the ring up to the left
const ringEnd = ((RING_START + RING_SWEEP) * Math.PI) / 180;
const P0 = [CX + R * Math.cos(ringEnd), CY + R * Math.sin(ringEnd)];
const P1 = [72, 236];
const P2 = [50, 166];

/** Point and heading (degrees) on the stem at t ∈ [0, 1]. */
function onStem(t: number) {
  const u = 1 - t;
  const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
  const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
  const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return { x, y, heading: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** Outline leaf with a centre vein, from the origin along +x. */
function leafPath(len: number) {
  const w = len * 0.3;
  return `M0 0 C${len * 0.28} ${-w} ${len * 0.7} ${-w * 0.95} ${len} 0 C${len * 0.7} ${w * 0.95} ${len * 0.28} ${w} 0 0 Z M1 0 L${len * 0.82} 0`;
}

// alternate leaves up the stem, shorter toward the tip; the last one continues the stem
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const { x, y, heading } = onStem(0.12 + i * 0.1);
  const side = i % 2 ? 1 : -1;
  return { x, y, len: 23 - i * 1.1, rotate: heading + side * (46 + (i % 3) * 5), delay: 1.9 + i * 0.07 };
});
const TIP = onStem(1);
const BERRIES = [0.34, 0.54, 0.74].map((t, i) => {
  const { x, y, heading } = onStem(t);
  const a = ((heading + (i % 2 ? -62 : 62)) * Math.PI) / 180;
  return { x, y, bx: x + 11 * Math.cos(a), by: y + 11 * Math.sin(a) };
});

/**
 * Wedding monogram: two serif capitals set on a diagonal, joined by a tall calligraphic ampersand,
 * on a fine open ring that ends in a leaf sprig. With `entering`, it grows past the viewer.
 */
export default function CoverMark({ entering }: { entering: boolean }) {
  const [a, b] = COUPLE.monogram;

  return (
    <div className={`cover ${entering ? "is-entering" : ""}`}>
      <svg className="cover-mark" viewBox="0 0 300 300" role="img" aria-label={COUPLE.shortName}>
        <circle
          className="cover-line cover-ring"
          cx={CX}
          cy={CY}
          r={R}
          pathLength="360"
          strokeDasharray={`${RING_SWEEP} 360`}
          transform={`rotate(${RING_START} ${CX} ${CY})`}
        />

        <g className="cover-sprig" style={{ transformOrigin: `${P0[0]}px ${P0[1]}px` }}>
          <path
            className="cover-line cover-stem"
            pathLength="1"
            d={`M${P0[0].toFixed(1)} ${P0[1].toFixed(1)} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`}
          />
          {LEAVES.map(({ x, y, len, rotate, delay }) => (
            <path
              key={delay}
              className="cover-line cover-leaf"
              d={leafPath(len)}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotate.toFixed(1)})`}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
          <path
            className="cover-line cover-leaf"
            d={leafPath(13)}
            transform={`translate(${TIP.x.toFixed(1)} ${TIP.y.toFixed(1)}) rotate(${TIP.heading.toFixed(1)})`}
            style={{ animationDelay: "2.6s" }}
          />
          {BERRIES.map(({ x, y, bx, by }) => (
            <g key={bx} className="cover-line cover-leaf" style={{ animationDelay: "2.7s" }}>
              <path d={`M${x.toFixed(1)} ${y.toFixed(1)} L${bx.toFixed(1)} ${by.toFixed(1)}`} />
              <circle cx={bx.toFixed(1)} cy={by.toFixed(1)} r="1.7" />
            </g>
          ))}
        </g>

        <text className="cover-letter cover-rise" x="60" y="146" style={{ animationDelay: "0.6s" }}>
          {a}
        </text>
        <text className="cover-letter cover-rise" x="158" y="246" style={{ animationDelay: "0.9s" }}>
          {b}
        </text>
        <text className="cover-amp" x="144" y="199" textAnchor="middle">
          &amp;
        </text>
      </svg>
    </div>
  );
}
