"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import { gsap, registerGsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { journeySteps } from "@/lib/content";

/** Pasos narrados durante el ensamblaje (el último, NEXUM, se reserva al gran final). */
const captions = journeySteps.slice(0, -1);

const buildings = [
  { id: "b1", x: [140, 230], roof: 400, gold: false },
  { id: "b2", x: [258, 328], roof: 470, gold: false },
  { id: "b3", x: [356, 456], roof: 260, gold: true },
  { id: "b4", x: [484, 554], roof: 510, gold: false },
  { id: "b5", x: [582, 672], roof: 340, gold: false },
];

const GROUND = 620;

function buildingPath(x: [number, number], roof: number) {
  const [x1, x2] = x;
  return `M${x1} ${GROUND} V${roof} H${x2} V${GROUND}`;
}

export function ArchitectureJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const captionRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;
    registerGsap();

    const svg = svgRef.current;
    const getPaths = (selector: string) => svg.querySelectorAll<SVGPathElement>(selector);

    const prepareDraw = (el: SVGGeometryElement) => {
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      return length;
    };

    if (reducedMotion) {
      gsap.set(svg.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, opacity: 1 });
      gsap.set(svg.querySelectorAll("[data-fade]"), { opacity: 1 });
      const last = captionRefs.current[captionRefs.current.length - 1];
      if (last) gsap.set(last, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      getPaths("[data-draw]").forEach((el) => prepareDraw(el));
      gsap.set(svg.querySelectorAll("[data-fade]"), { opacity: 0 });
      gsap.set(captionRefs.current, { opacity: 0 });
      if (captionRefs.current[0]) gsap.set(captionRefs.current[0], { opacity: 1 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: isDesktop ? "+=350%" : "+=180%",
              scrub: 1,
              pin: isDesktop,
              anticipatePin: 1,
            },
          });

          const setCaption = (index: number) => {
            captionRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, { opacity: i === index ? 1 : 0, duration: 0.3, overwrite: true });
            });
          };

          // 1. Ejes — IDEA
          tl.addLabel("idea")
            .to("[data-group='axes']", { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" })
            .call(() => setCaption(0), [], "idea");

          // 2. Columnas — LÍNEA
          tl.addLabel("linea", "+=0.1")
            .to("[data-group='columns']", { strokeDashoffset: 0, duration: 1, stagger: 0.08, ease: "power1.inOut" })
            .call(() => setCaption(1), [], "linea");

          // 3. Losas — ESTRUCTURA
          tl.addLabel("estructura", "+=0.1")
            .to("[data-group='slabs']", { strokeDashoffset: 0, duration: 1, stagger: 0.06, ease: "power1.inOut" })
            .call(() => setCaption(2), [], "estructura");

          // 4. Volúmenes de los edificios — ARQUITECTURA
          tl.addLabel("arquitectura", "+=0.1");
          buildings.forEach((b) => {
            tl.to(`[data-group='outline-${b.id}']`, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, "arquitectura+=" + buildings.indexOf(b) * 0.25);
          });
          tl.call(() => setCaption(3), [], "arquitectura");

          // 5. Fachadas / ventanas — ESPACIO
          tl.addLabel("espacio", "+=0.15")
            .to("[data-group='windows']", { opacity: 1, duration: 1, stagger: 0.03 }, "espacio")
            .call(() => setCaption(4), [], "espacio");

          // 6. Conexión — líneas doradas entre azoteas
          tl.addLabel("conexion", "+=0.15")
            .to("[data-group='connectors']", { strokeDashoffset: 0, duration: 1.3, stagger: 0.1, ease: "power1.inOut" }, "conexion")
            .to("[data-group='connector-dots']", { opacity: 1, duration: 0.6 }, "conexion+=0.6")
            .call(() => setCaption(5), [], "conexion");

          tl.to({}, { duration: 0.3 });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Proceso de ensamblaje arquitectónico de NEXUM"
      className="relative bg-nexum-ivory"
    >
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 md:py-0">
        <Container className="relative z-10">
          <svg
            ref={svgRef}
            viewBox="0 0 800 700"
            className="mx-auto h-auto w-full max-w-4xl text-nexum-black"
            aria-hidden="true"
          >
            <g data-group="axes" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1">
              <path data-draw d={`M60 ${GROUND} H740`} />
              <path data-draw d="M90 160 V620" strokeOpacity="0.18" />
            </g>

            <g data-group="columns" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1">
              {buildings.map((b) => (
                <g key={b.id}>
                  <path data-draw d={`M${b.x[0]} ${GROUND} V${GROUND - 70}`} />
                  <path data-draw d={`M${b.x[1]} ${GROUND} V${GROUND - 70}`} />
                </g>
              ))}
            </g>

            <g data-group="slabs" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1">
              {buildings.map((b) =>
                [GROUND - 20, GROUND - 45].map((y) => (
                  <path key={`${b.id}-${y}`} data-draw d={`M${b.x[0]} ${y} H${b.x[1]}`} />
                )),
              )}
            </g>

            {buildings.map((b) => (
              <path
                key={b.id}
                data-draw
                data-group={`outline-${b.id}`}
                d={buildingPath(b.x as [number, number], b.roof)}
                fill="none"
                stroke={b.gold ? "var(--nexum-gold)" : "var(--nexum-black)"}
                strokeWidth={b.gold ? 2 : 1.6}
                strokeLinejoin="round"
              />
            ))}

            <g data-group="windows" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1">
              {[buildings[0], buildings[2], buildings[4]].map((b) => {
                const rows: number[] = [];
                for (let y = b.roof + 30; y < GROUND - 15; y += 32) rows.push(y);
                return rows.map((y) => (
                  <path key={`${b.id}-w-${y}`} data-fade d={`M${b.x[0] + 10} ${y} H${b.x[1] - 10}`} />
                ));
              })}
            </g>

            <g data-group="connectors" fill="none" stroke="var(--nexum-gold)" strokeWidth="1.4">
              {buildings.slice(0, -1).map((b, i) => {
                const next = buildings[i + 1];
                const x1 = (b.x[0] + b.x[1]) / 2;
                const x2 = (next.x[0] + next.x[1]) / 2;
                return (
                  <path
                    key={`conn-${b.id}`}
                    data-draw
                    d={`M${x1} ${b.roof - 18} L${x2} ${next.roof - 18}`}
                  />
                );
              })}
            </g>
            <g data-group="connector-dots" fill="var(--nexum-gold)" opacity="0">
              {buildings.map((b) => {
                const cx = (b.x[0] + b.x[1]) / 2;
                return <circle key={`dot-${b.id}`} cx={cx} cy={b.roof - 18} r="3.5" />;
              })}
            </g>
          </svg>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center md:bottom-20">
          <div className="relative flex h-8 items-center">
            {captions.map((step, i) => (
              <span
                key={step}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute font-body text-xs tracking-nexum uppercase text-nexum-bronze"
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
