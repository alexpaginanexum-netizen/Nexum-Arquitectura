"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { NexumMark } from "@/components/NexumMark";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brand } from "@/lib/content";

/** Fragmentos dispersos que convergen para formar el isotipo. */
const fragments = [
  { x: -220, y: -140, rotate: -35 },
  { x: 210, y: -160, rotate: 42 },
  { x: -260, y: 90, rotate: 18 },
  { x: 240, y: 120, rotate: -24 },
  { x: -120, y: -220, rotate: 60 },
  { x: 140, y: 200, rotate: -48 },
];

export function NexumFinale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !markRef.current || !fragmentsRef.current || !textRef.current) return;
    registerGsap();

    const segments = markRef.current.querySelectorAll<SVGPathElement>("[data-mark-segment]");
    const fragmentEls = fragmentsRef.current.querySelectorAll<HTMLElement>("[data-fragment]");

    if (reducedMotion) {
      gsap.set(segments, { strokeDashoffset: 0 });
      gsap.set(fragmentEls, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      segments.forEach((seg) => {
        const length = seg.getTotalLength();
        gsap.set(seg, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(textRef.current, { opacity: 0, y: 24 });

      const mm = gsap.matchMedia();

      mm.add({ isDesktop: "(min-width: 768px)" }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isDesktop ? "+=220%" : "+=110%",
            scrub: 1,
            pin: isDesktop,
            anticipatePin: 1,
          },
        });

        tl.to(fragmentEls, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power2.inOut",
        })
          .to(
            segments,
            { strokeDashoffset: 0, duration: 1, stagger: 0.15, ease: "power1.inOut" },
            "-=0.6",
          )
          .to(fragmentEls, { opacity: 0, duration: 0.4 }, "-=0.4")
          .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="NEXUM — conexión final"
      className="relative flex min-h-screen items-center overflow-hidden bg-nexum-black text-nexum-white"
    >
      <div
        ref={fragmentsRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        {fragments.map((f, i) => (
          <span
            key={i}
            data-fragment
            className="absolute h-px w-16 bg-nexum-white/25"
            style={{ transform: `translate(${f.x}px, ${f.y}px) rotate(${f.rotate}deg)` }}
          />
        ))}
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <NexumMark ref={markRef} className="h-28 w-auto text-nexum-white sm:h-36" aria-hidden="true" />

        <div ref={textRef} className="mt-10">
          <p className="font-display text-4xl tracking-[0.05em] text-nexum-white sm:text-5xl">
            {brand.name}
          </p>
          <p className="mt-2 font-body text-xs tracking-nexum uppercase text-nexum-concrete">
            Arquitectura
          </p>
          <p className="mt-8 font-body text-base italic text-nexum-gold sm:text-lg">
            “{brand.tagline}”
          </p>
        </div>
      </Container>
    </section>
  );
}
