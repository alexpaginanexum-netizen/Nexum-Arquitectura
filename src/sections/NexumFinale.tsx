"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { NexumMark } from "@/components/NexumMark";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brand } from "@/lib/content";

/**
 * Detalle arquitectónico (ventanas, remates de azotea, líneas de piso,
 * tensores del conector) superpuesto sobre el isotipo. Usa el mismo
 * viewBox "0 0 180 200" que NexumMark, por lo que sus piezas coinciden
 * exactamente con los tres trazos del isotipo (edificio izquierdo,
 * conector diagonal, edificio derecho). Cada pieza nace desplazada y
 * rotada (data-from-*) y GSAP la lleva a su posición real durante el
 * scroll — como si llegara volando a integrarse al edificio — para
 * luego desvanecerse y dejar solo la geometría esencial del isotipo.
 */
const details: Array<{ id: string; from: { x: number; y: number; rotate: number } }> = [
  { id: "roof-left", from: { x: -60, y: -70, rotate: -30 } },
  { id: "window-left-1", from: { x: -80, y: 10, rotate: 20 } },
  { id: "window-left-2", from: { x: -70, y: 60, rotate: -15 } },
  { id: "window-left-3", from: { x: -90, y: -20, rotate: 35 } },
  { id: "ground-left", from: { x: -50, y: 90, rotate: -10 } },
  { id: "roof-right", from: { x: 60, y: -75, rotate: 28 } },
  { id: "window-right-1", from: { x: 85, y: 5, rotate: -25 } },
  { id: "window-right-2", from: { x: 75, y: 55, rotate: 18 } },
  { id: "window-right-3", from: { x: 95, y: -25, rotate: -32 } },
  { id: "ground-right", from: { x: 55, y: 95, rotate: 12 } },
  { id: "rung-1", from: { x: -40, y: 40, rotate: 45 } },
  { id: "rung-2", from: { x: 40, y: -40, rotate: -45 } },
];

const detailFrom = (id: string) => details.find((d) => d.id === id)!.from;

const toTransform = ({ x, y, rotate }: { x: number; y: number; rotate: number }) =>
  `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

export function NexumFinale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const detailSvgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !markRef.current || !detailSvgRef.current || !textRef.current) return;
    registerGsap();

    const segments = markRef.current.querySelectorAll<SVGPathElement>("[data-mark-segment]");
    const detailEls = detailSvgRef.current.querySelectorAll<SVGElement>("[data-detail]");

    if (reducedMotion) {
      gsap.set(segments, { strokeDashoffset: 0 });
      gsap.set(detailEls, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      segments.forEach((seg) => {
        const length = seg.getTotalLength();
        gsap.set(seg, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(detailEls, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 24 });

      const mm = gsap.matchMedia();

      mm.add({ isDesktop: "(min-width: 768px)" }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isDesktop ? "+=280%" : "+=150%",
            scrub: 1,
            pin: isDesktop,
            anticipatePin: 1,
          },
        });

        // Fase 1 — la estructura esencial emerge (ejes del isotipo)
        tl.to(segments, { strokeDashoffset: 0, duration: 1, stagger: 0.15, ease: "power1.inOut" });

        // Fase 2 — el detalle arquitectónico llega y arma edificios reconocibles
        tl.to(
          detailEls,
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: "power2.out" },
          "+=0.05",
        );

        // Fase 3 — pausa breve: se lee como arquitectura real
        tl.to({}, { duration: 0.4 });

        // Fase 4 — el detalle se simplifica hasta dejar solo el isotipo
        tl.to(detailEls, { opacity: 0, duration: 0.9, stagger: 0.03, ease: "power1.in" }, "+=0.05");

        // Fase 5 — texto de marca
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.25");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="NEXUM — de la arquitectura al isotipo"
      className="relative flex min-h-screen items-center overflow-hidden bg-nexum-black text-nexum-white"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="relative aspect-[180/200] h-40 sm:h-52" aria-hidden="true">
          <NexumMark ref={markRef} className="absolute inset-0 h-full w-full text-nexum-white" />

          {/* Detalle: ventanas, remates de azotea, líneas de piso, tensores del conector */}
          <svg
            ref={detailSvgRef}
            viewBox="0 0 180 200"
            className="absolute inset-0 h-full w-full text-nexum-white/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {/* Edificio izquierdo */}
            <line data-detail data-id="roof-left" style={{ transform: toTransform(detailFrom("roof-left")) }} x1="25" y1="40" x2="55" y2="40" />
            <line data-detail data-id="window-left-1" style={{ transform: toTransform(detailFrom("window-left-1")) }} x1="32" y1="70" x2="48" y2="70" />
            <line data-detail data-id="window-left-2" style={{ transform: toTransform(detailFrom("window-left-2")) }} x1="32" y1="100" x2="48" y2="100" />
            <line data-detail data-id="window-left-3" style={{ transform: toTransform(detailFrom("window-left-3")) }} x1="32" y1="130" x2="48" y2="130" />
            <line data-detail data-id="ground-left" style={{ transform: toTransform(detailFrom("ground-left")) }} x1="18" y1="180" x2="62" y2="180" />

            {/* Edificio derecho */}
            <line data-detail data-id="roof-right" style={{ transform: toTransform(detailFrom("roof-right")) }} x1="125" y1="40" x2="155" y2="40" />
            <line data-detail data-id="window-right-1" style={{ transform: toTransform(detailFrom("window-right-1")) }} x1="132" y1="70" x2="148" y2="70" />
            <line data-detail data-id="window-right-2" style={{ transform: toTransform(detailFrom("window-right-2")) }} x1="132" y1="100" x2="148" y2="100" />
            <line data-detail data-id="window-right-3" style={{ transform: toTransform(detailFrom("window-right-3")) }} x1="132" y1="130" x2="148" y2="130" />
            <line data-detail data-id="ground-right" style={{ transform: toTransform(detailFrom("ground-right")) }} x1="118" y1="180" x2="162" y2="180" />

            {/* Tensores del conector diagonal (el "nexo" entre ambos volúmenes) */}
            <line data-detail data-id="rung-1" style={{ transform: toTransform(detailFrom("rung-1")) }} x1="65" y1="92" x2="81" y2="80" />
            <line data-detail data-id="rung-2" style={{ transform: toTransform(detailFrom("rung-2")) }} x1="99" y1="140" x2="115" y2="128" />
          </svg>
        </div>

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
