import { COUPLE } from "@/lib/constants";

export default function Monogram({ size = "11rem" }: { size?: string }) {
  const [a, b] = COUPLE.monogram;

  return (
    <div className="monogram-ring" style={{ "--ring-size": size } as React.CSSProperties} aria-hidden>
      <span className="monogram gold-foil-text">
        {a}
        <span className="monogram-amp">&amp;</span>
        {b}
      </span>
    </div>
  );
}
