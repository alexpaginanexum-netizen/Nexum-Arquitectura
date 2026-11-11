import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { portfolio } from "@/lib/content";

export function Projects() {
  return (
    <section id="proyectos" className="bg-nexum-white py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="—" label="Proyectos" className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
              Conoce nuestro trabajo
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 font-body text-base leading-relaxed text-nexum-graphite">
              Revisa nuestro portafolio arquitectónico o descárgalo en PDF.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={portfolio.href} variant="primary">
                {portfolio.viewLabel}
              </Button>
              <Button href={portfolio.href} download={portfolio.downloadName} variant="secondary">
                {portfolio.downloadLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
