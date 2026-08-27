import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function RenderVsReality() {
  return (
    <section id="render-realidad" className="bg-nexum-ivory py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionLabel index="—" label="Render ↔ Resultado construido" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
            De la visualización a la realidad.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-nexum-graphite">
            Arrastra el control para comparar la visualización arquitectónica con el espacio
            construido. Componente reutilizable para cada proyecto conforme se documente.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <BeforeAfterSlider />
        </Reveal>
      </Container>
    </section>
  );
}
