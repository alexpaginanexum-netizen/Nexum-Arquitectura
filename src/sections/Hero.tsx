"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";

const HERO_VIDEO_SRC = "/videos/nexum-hero-scroll.mp4";
const HERO_VIDEO_POSTER = "/images/nexum-hero-poster.jpg";

/** Distancia de scroll (relativa a la altura del viewport) durante la que el Hero
 *  permanece "pinned" mientras el video avanza cuadro a cuadro. */
const SCRUB_SCROLL_DISTANCE = "+=200%";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();

    if (reducedMotion) {
      gsap.set(sectionRef.current.querySelectorAll("[data-hero-in]"), { opacity: 1, y: 0 });
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

      const video = videoRef.current;
      if (!video) return;

      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // Mobile: el scrubbing atado al touch-scroll se siente entrecortado en
          // muchos navegadores móviles — degradamos a un loop silencioso simple.
          if (!isDesktop) {
            video.loop = true;
            video.muted = true;
            video.play().catch(() => {});
            return;
          }

          let st: ScrollTrigger | undefined;
          let rafId: number | null = null;
          let pendingTime = 0;

          const applyTime = () => {
            video.currentTime = pendingTime;
            rafId = null;
          };

          const setupScrub = () => {
            if (!video.duration || !isFinite(video.duration)) return;

            st = ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: SCRUB_SCROLL_DISTANCE,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                pendingTime = self.progress * video.duration;
                if (rafId === null) {
                  rafId = window.requestAnimationFrame(applyTime);
                }
              },
            });
          };

          if (video.readyState >= 1) {
            setupScrub();
          } else {
            video.addEventListener("loadedmetadata", setupScrub, { once: true });
          }

          return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            video.removeEventListener("loadedmetadata", setupScrub);
            st?.kill();
          };
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-nexum-black pt-[var(--nav-height)]"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          muted
          playsInline
          preload="metadata"
          role="img"
          aria-label="Animación arquitectónica de NEXUM"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-nexum-black/85 via-nexum-black/35 to-nexum-black/55"
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p
            data-hero-eyebrow
            className="mb-8 font-body text-xs tracking-nexum uppercase text-nexum-gold"
          >
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-[2.75rem] leading-[1.08] text-nexum-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
            {hero.headline.map((line) => (
              <span key={line} data-hero-line className="block text-balance">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-xl font-body text-base leading-relaxed text-nexum-white/80 sm:text-lg"
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
              <Button href={hero.ctaSecondary.href} variant="outline-light">
                {hero.ctaSecondary.label}
              </Button>
            </span>
          </div>
        </div>
      </Container>

      <div
        data-hero-cta
        className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-nexum-white/70"
      >
        <span className="font-body text-[0.65rem] tracking-nexum uppercase">{hero.explore}</span>
        <span className="h-10 w-px animate-pulse bg-nexum-white/40" aria-hidden />
      </div>
    </section>
  );
}
