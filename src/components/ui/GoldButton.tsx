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
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 font-body text-xs font-medium tracking-[0.08em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:px-7";

const variants = {
  outline:
    "border-gold/40 bg-transparent text-gold hover:border-gold hover:bg-gold/5",
  solid:
    "border-gold bg-gold text-paper hover:border-gold-deep hover:bg-gold-deep",
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
