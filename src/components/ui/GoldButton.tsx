import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type GoldButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "outline" | "solid";
} & (
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | ButtonHTMLAttributes<HTMLButtonElement>
);

const base =
  "gold-shimmer inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 font-body text-xs font-medium tracking-[0.08em] transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:px-7";

const variants = {
  outline:
    "border-gold/50 bg-transparent text-gold-soft hover:border-gold hover:bg-gold/10 hover:shadow-[0_12px_32px_rgba(212,175,90,0.18)]",
  solid:
    "gold-metallic border-transparent text-ink shadow-[0_10px_30px_rgba(212,175,90,0.25)] hover:shadow-[0_16px_40px_rgba(212,175,90,0.4)]",
};

export default function GoldButton({
  children,
  className = "",
  variant = "outline",
  ...props
}: GoldButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
