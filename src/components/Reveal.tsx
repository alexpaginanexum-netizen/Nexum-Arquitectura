"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Retraso en segundos antes de iniciar la animación. */
  delay?: number;
  /** Desplazamiento inicial en px sobre el eje Y. */
  y?: number;
  /** Anima como bloque (fade + translate) o como texto por palabras. */
  variant?: "block" | "lines";
}

/**
 * Microinteracción base del sitio: revela contenido con fade + translateY
 * al entrar en el viewport. Se desactiva si el usuario prefiere menos movimiento.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
  variant = "block",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    registerGsap();

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    const targets =
      variant === "lines"
        ? ref.current.querySelectorAll("[data-reveal-line]")
        : ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: variant === "lines" ? 0.09 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, delay, y, variant]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
