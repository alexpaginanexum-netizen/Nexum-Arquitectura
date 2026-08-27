"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { registerGsap, ScrollTrigger } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Services() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!listRef.current) return;
    registerGsap();

    const rows = listRef.current.querySelectorAll<HTMLElement>("[data-service-row]");
    const triggers: ScrollTrigger[] = [];

    const mm = window.matchMedia("(min-width: 1024px)");
    if (mm.matches) {
      rows.forEach((row, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: row,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          }),
        );
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="servicios" className="bg-nexum-white py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionLabel index="—" label="Servicios" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
            Una firma integral, del concepto a la obra construida.
          </h2>
        </Reveal>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-4 lg:mt-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-height)+2rem)]">
            <span className="block font-display text-[7rem] leading-none text-nexum-black/10">
              {services[active].index}
            </span>
            <h3 className="mt-4 font-display text-3xl text-nexum-black">
              {services[active].title}
            </h3>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-nexum-graphite">
              {services[active].description}
            </p>
            <p className="mt-6 font-body text-sm italic text-nexum-bronze">
              “{services[active].line}”
            </p>
          </div>
        </div>

        <div ref={listRef}>
          {services.map((service, i) => (
            <div
              key={service.index}
              data-service-row
              onMouseEnter={() => setActive(i)}
              className={cn(
                "group border-b border-nexum-black/10 py-8 transition-opacity duration-300 lg:py-14",
                active === i ? "lg:opacity-100" : "lg:opacity-40",
              )}
            >
              <Reveal>
                <div className="flex items-baseline gap-5">
                  <span className="font-body text-sm text-nexum-gold">{service.index}</span>
                  <h3 className="font-display text-2xl text-nexum-black transition-colors group-hover:text-nexum-bronze sm:text-3xl">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 pl-10 font-body text-sm leading-relaxed text-nexum-graphite lg:hidden">
                  {service.description}
                </p>
                <p className="mt-2 pl-10 font-body text-sm italic text-nexum-bronze lg:hidden">
                  “{service.line}”
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
