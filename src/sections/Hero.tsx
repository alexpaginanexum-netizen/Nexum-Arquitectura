"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";

const HERO_VIDEO_SRC = "/videos/nexum-hero-scroll.mp4";
const HERO_VIDEO_POSTER = "/images/nexum-hero-poster.jpg";

/**
 * Los últimos ~0.2s del archivo son una transición vacía (fade a una línea de
 * luz) después de que el logo completo ya se armó. Cortamos la reproducción
 * ahí para que el video quede congelado mostrando el logo, no ese hueco.
 * Ajusta este valor si el punto de corte no cae exactamente sobre el logo.
 */
const HERO_VIDEO_END_MARGIN = 0.2;

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
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Reproduce el video desde el frame 0 cada vez que el Hero entra en el
  // viewport (carga inicial o al volver a subir hasta él). Se pausa al salir
  // de vista para no gastar CPU/batería de fondo. Se corta un poco antes del
  // final real (ver HERO_VIDEO_END_MARGIN) para quedar congelado sobre el
  // logo armado, no sobre la transición vacía de los últimos frames.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reducedMotion) return;

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration)) return;
      const cutoff = video.duration - HERO_VIDEO_END_MARGIN;
      if (video.currentTime >= cutoff) {
        video.currentTime = cutoff;
        video.pause();
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Red de seguridad por si el navegador llega a 'ended' antes de que
    // dispare el timeupdate de corte (p. ej. video muy corto).
    const handleEnded = () => video.pause();
    video.addEventListener("ended", handleEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
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
          preload="auto"
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
