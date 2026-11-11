import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { services, type ServiceIcon } from "@/lib/content";

/** Íconos lineales sencillos, inspirados en los de la tarjeta de presentación. */
const iconPaths: Record<ServiceIcon, ReactNode> = {
  house: (
    <>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  crane: (
    <>
      <path d="M8 21V4" />
      <path d="M11 21V4" />
      <path d="M8 4h3" />
      <path d="M8 8l3 3M11 8l-3 3M8 14l3 3M11 14l-3 3" />
      <path d="M4 6h17" />
      <path d="M18 6v4" />
      <path d="M6 21h7" />
    </>
  ),
  plans: (
    <>
      <path d="M6 6h13v12H6" />
      <path d="M6 6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2" />
      <path d="M6 6a2 2 0 0 1 2 2v10" />
      <path d="M11 10h5v5" />
    </>
  ),
  pencil: (
    <>
      <path d="M15.5 4.5 19.5 8.5 9 19H5v-4z" />
      <path d="M13 7l4 4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4 3 8.5l9 4.5 9-4.5z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
};

export function Services() {
  return (
    <section id="servicios" className="bg-nexum-ivory py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionLabel index="—" label="Servicios" className="mb-10" />
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, i) => (
            <li key={service.index} className="border-t border-nexum-black/10 py-6 lg:py-8">
              <Reveal delay={i * 0.05}>
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-9 w-9 shrink-0 text-nexum-bronze-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {iconPaths[service.icon]}
                  </svg>
                  <h3 className="font-body text-sm tracking-nexum uppercase text-nexum-black">
                    {service.title}
                  </h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
