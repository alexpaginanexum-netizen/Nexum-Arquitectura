"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { gsap, registerGsap } from "@/animations/gsap";
import { brand, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!menuRef.current) return;
    registerGsap();

    if (open) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" },
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("[data-menu-link]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.25, stagger: 0.06, ease: "power3.out" },
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // Fondo blanco sólido (igual al fondo del logo), sin transparencia ni blur.
    <header className="fixed inset-x-0 top-0 z-50 border-b border-nexum-black/[0.06] bg-white">
      <Container
        as="nav"
        className="flex h-[var(--nav-height)] items-center justify-between gap-4"
        aria-label="Navegación principal"
      >
        <Link href="#top" className="flex min-w-0 items-center gap-3" aria-label="Ir al inicio, NEXUM Arquitectura">
          <Logo className="h-12 md:h-16" sizes="(min-width: 768px) 90px, 68px" priority />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-body text-sm font-semibold tracking-nexum text-nexum-black">
              NEXUM
            </span>
            <span className="mt-1.5 hidden whitespace-nowrap font-body text-[0.6rem] tracking-[0.18em] uppercase text-nexum-graphite min-[400px]:block md:text-[0.65rem]">
              {brand.motto}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-xs tracking-nexum uppercase text-nexum-black transition-colors hover:text-nexum-bronze-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 font-body text-xs tracking-nexum uppercase text-nexum-black md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </Container>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "fixed inset-0 top-[var(--nav-height)] bg-white",
          open ? "pointer-events-auto" : "pointer-events-none invisible",
        )}
        style={{ clipPath: open ? undefined : "inset(0 0 100% 0)" }}
      >
        <Container as="ul" className="flex flex-col gap-6 pt-14">
          {navLinks.map((link) => (
            <li key={link.href} data-menu-link>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-nexum-black"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </Container>
      </div>
    </header>
  );
}
