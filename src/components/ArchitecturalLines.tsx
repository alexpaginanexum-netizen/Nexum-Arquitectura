"use client";

import { useRef } from "react";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ArchitecturalLinesProps {
  className?: string;
  delay?: number;
}

/**
 * Boceto lineal de un pequeño perfil urbano (ejes, columnas, volúmenes).
 * Se dibuja progresivamente al montar mediante stroke-dashoffset.
 * Puramente decorativo — aria-hidden.
 */
export function ArchitecturalLines({ className, delay = 0.2 }: ArchitecturalLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!svgRef.current) return;
    registerGsap();

    const paths = svgRef.current.querySelectorAll<SVGPathElement>("[data-draw]");

    if (reducedMotion) {
      paths.forEach((p) => p.setAttribute("stroke-dashoffset", "0"));
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.8,
        delay,
        ease: "power2.inOut",
        stagger: 0.12,
      });
    }, svgRef);

    return () => ctx.revert();
  }, [reducedMotion, delay]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 640 480"
      fill="none"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
    >
      {/* eje horizontal */}
      <path data-draw d="M20 440 H620" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {/* eje vertical */}
      <path data-draw d="M40 60 V440" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

      {/* volumen 1 */}
      <path
        data-draw
        d="M90 440 V220 L170 150 V440"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* volumen 2, más alto */}
      <path
        data-draw
        d="M210 440 V120 L300 60 V440"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* diagonal de conexión (nexo) */}
      <path
        data-draw
        d="M170 260 L300 400"
        stroke="var(--nexum-gold)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* volumen 3, acento dorado */}
      <path
        data-draw
        d="M330 440 V180 L410 110 V440"
        stroke="var(--nexum-gold)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* ventanas / losas volumen 2 */}
      {[150, 200, 250, 300, 350].map((y) => (
        <path
          key={y}
          data-draw
          d={`M220 ${y} H290`}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
