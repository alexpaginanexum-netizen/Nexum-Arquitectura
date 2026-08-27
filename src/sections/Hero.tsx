"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ArchitecturalLines } from "@/components/ArchitecturalLines";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    registerGsap();

    if (reducedMotion) {
      gsap.set(rootRef.current.querySelectorAll("[data-hero-in]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-eyebrow]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          "[data-hero-line]",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-nexum-white pt-[var(--nav-height)]"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center text-nexum-black/70 lg:flex">
        <ArchitecturalLines className="opacity-80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p
            data-hero-eyebrow
            className="mb-8 font-body text-xs tracking-nexum uppercase text-nexum-bronze-deep"
          >
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-[2.75rem] leading-[1.08] text-nexum-black sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
            {hero.headline.map((line) => (
              <span key={line} data-hero-line className="block text-balance">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-xl font-body text-base leading-relaxed text-nexum-graphite sm:text-lg"
          >
            {hero.subheadline}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <span data-hero-cta>
              <Button href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label}
              </Button>
            </span>
            <span data-hero-cta>
              <Button href={hero.ctaSecondary.href} variant="secondary">
                {hero.ctaSecondary.label}
              </Button>
            </span>
          </div>
        </div>
      </Container>

      <div
        data-hero-cta
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-nexum-graphite/70"
      >
        <span className="font-body text-[0.65rem] tracking-nexum uppercase">{hero.explore}</span>
        <span className="h-10 w-px animate-pulse bg-nexum-graphite/40" aria-hidden />
      </div>
    </section>
  );
}
