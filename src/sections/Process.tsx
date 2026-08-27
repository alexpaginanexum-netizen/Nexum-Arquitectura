"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { process } from "@/lib/content";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    registerGsap();

    if (reducedMotion) {
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.4,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="proceso" ref={sectionRef} className="bg-nexum-ivory py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionLabel index="—" label="Proceso NEXUM" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
            Un proceso conectado, de la escucha a la conexión con el espacio.
          </h2>
        </Reveal>

        <div className="relative mt-20 max-w-3xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-nexum-black/10 sm:left-[11px]" />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-nexum-gold sm:left-[11px]"
          />

          <ol className="space-y-14">
            {process.map((step) => (
              <li key={step.index} className="relative pl-10 sm:pl-14">
                <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-nexum-gold bg-nexum-ivory sm:h-[1.375rem] sm:w-[1.375rem]" />
                <Reveal>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-body text-xs tracking-nexum text-nexum-bronze">
                      {step.index}
                    </span>
                    <h3 className="font-display text-2xl text-nexum-black">{step.title}</h3>
                  </div>
                  <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-nexum-graphite">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
