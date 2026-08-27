"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { gsap, registerGsap } from "@/animations/gsap";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "bg-nexum-white/90 backdrop-blur-md border-b border-nexum-black/10"
          : "bg-transparent",
      )}
    >
      <Container
        as="nav"
        className="flex h-[var(--nav-height)] items-center justify-between"
        aria-label="Navegación principal"
      >
        <Link href="#top" className="flex items-center gap-3" aria-label="Ir al inicio, NEXUM Arquitectura">
          <Logo width={44} height={34} priority />
          <span className="hidden font-body text-sm tracking-nexum text-nexum-black sm:inline">
            NEXUM
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-xs tracking-nexum uppercase text-nexum-black/80 transition-colors hover:text-nexum-bronze-deep"
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
          "fixed inset-0 top-[var(--nav-height)] bg-nexum-white",
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
