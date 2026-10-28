import { COUPLE } from "@/lib/constants";

export default function SiteNav() {
  const [a, b] = COUPLE.monogram;

  return (
    <header className="absolute inset-x-0 top-0 z-30 print:hidden">
      <div className="topline" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-12 lg:px-20">
        <a href="#hero" className="font-heading text-2xl italic text-ink" aria-label={`${COUPLE.shortName} home`}>
          {a} <span className="text-gold">&amp;</span> {b}
        </a>
        <div className="flex items-center gap-7 font-body text-sm tracking-[0.08em] text-ink-muted">
          <a href="#invitation" className="hidden transition-colors hover:text-gold sm:inline">
            Invitation
          </a>
          <a href="#details" className="hidden transition-colors hover:text-gold sm:inline">
            Details
          </a>
        </div>
      </nav>
    </header>
  );
}
