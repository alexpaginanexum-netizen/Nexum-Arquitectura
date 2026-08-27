"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { nexumSection } from "@/lib/content";

const RADIUS = 168;
const CENTER = 200;

const nodePositions = nexumSection.nodes.map((label, i) => {
  const angle = (Math.PI * 2 * i) / nexumSection.nodes.length - Math.PI / 2;
  return {
    label,
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
});

export function NexumIntro() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!diagramRef.current) return;
    registerGsap();

    const lines = diagramRef.current.querySelectorAll<SVGLineElement>("[data-connector]");
    const nodes = diagramRef.current.querySelectorAll("[data-node]");

    if (reducedMotion) {
      gsap.set(lines, { strokeDashoffset: 0 });
      gsap.set(nodes, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: diagramRef.current, start: "top 75%", once: true },
      });

      tl.to(lines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: "power2.inOut" }).fromTo(
        nodes,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "back.out(1.7)" },
        "-=0.7",
      );
    }, diagramRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="nexum" className="bg-nexum-white py-28 md:py-36">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel index="—" label={nexumSection.eyebrow} className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
              {nexumSection.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-nexum-graphite">
              {nexumSection.body}
            </p>
          </Reveal>
        </div>

        <div ref={diagramRef} className="relative mx-auto aspect-square w-full max-w-[420px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {nodePositions.map((node, i) => (
              <line
                key={`c-${node.label}`}
                data-connector
                x1={CENTER}
                y1={CENTER}
                x2={node.x}
                y2={node.y}
                stroke={i === nodePositions.length - 1 ? "var(--nexum-gold)" : "var(--nexum-graphite)"}
                strokeOpacity={i === nodePositions.length - 1 ? 0.9 : 0.28}
                strokeWidth="1"
              />
            ))}
          </svg>

          <div
            data-node
            className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-nexum-gold/60 bg-nexum-black text-center"
            style={{ left: CENTER, top: CENTER }}
          >
            <span className="font-display text-sm tracking-nexum text-nexum-white">NEXUM</span>
          </div>

          {nodePositions.map((node) => (
            <div
              key={node.label}
              data-node
              className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-nexum-black/15 bg-nexum-ivory text-center shadow-[0_1px_0_0_rgba(22,22,22,0.04)]"
              style={{ left: node.x, top: node.y }}
            >
              <span className="px-1 font-body text-[0.6rem] tracking-nexum text-nexum-graphite">
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
