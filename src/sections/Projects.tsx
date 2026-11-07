"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PlaceholderFrame } from "@/components/PlaceholderFrame";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { portfolio, projectCategories, projects, type ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "Todos">("Todos");

  const visible = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="proyectos" className="bg-nexum-white py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="—" label="Proyectos seleccionados" className="mb-6" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-2xl font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
                Un archivo en construcción.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-nexum-graphite">
                Estamos preparando la documentación fotográfica y técnica de nuestros proyectos.
                Estos espacios están reservados para incorporarlos próximamente.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8">
                <Button href={portfolio.href} variant="secondary">
                  {portfolio.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {(["Todos", ...projectCategories] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={cn(
                  "font-body text-xs tracking-nexum uppercase transition-colors",
                  filter === category
                    ? "text-nexum-black underline decoration-nexum-gold decoration-2 underline-offset-4"
                    : "text-nexum-graphite hover:text-nexum-bronze-deep",
                )}
                aria-pressed={filter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.06}>
              <article>
                <PlaceholderFrame label={`${project.name} — imagen pendiente`} />
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-nexum-black/10 pb-4">
                  <h3 className="font-display text-xl text-nexum-black">{project.name}</h3>
                  <span className="shrink-0 font-body text-xs tracking-nexum uppercase text-nexum-bronze-deep">
                    {project.category}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 font-body text-xs sm:grid-cols-4">
                  <div>
                    <dt className="tracking-nexum uppercase text-nexum-graphite/80">Ubicación</dt>
                    <dd className="text-nexum-black">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="tracking-nexum uppercase text-nexum-graphite/80">Año</dt>
                    <dd className="text-nexum-black">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="tracking-nexum uppercase text-nexum-graphite/80">Tipología</dt>
                    <dd className="text-nexum-black">{project.typology}</dd>
                  </div>
                  <div>
                    <dt className="tracking-nexum uppercase text-nexum-graphite/80">Estado</dt>
                    <dd className="text-nexum-black">{project.status}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
