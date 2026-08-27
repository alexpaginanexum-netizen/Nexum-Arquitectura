import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
}

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 font-body text-xs tracking-nexum uppercase transition-colors duration-300 focus-visible:outline-2";

  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-nexum-black text-nexum-white px-8 py-4 hover:bg-nexum-graphite",
    secondary:
      "border border-nexum-black/30 text-nexum-black px-8 py-4 hover:border-nexum-gold hover:text-nexum-bronze",
    ghost: "text-nexum-black px-0 py-2 hover:text-nexum-bronze",
    light: "bg-nexum-white text-nexum-black px-8 py-4 hover:bg-nexum-ivory",
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
