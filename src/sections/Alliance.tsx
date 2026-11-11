import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { alliance } from "@/lib/content";

export function Alliance() {
  return (
    <section id="alianza" className="bg-nexum-graphite py-16 text-nexum-white md:py-20">
      <Container>
        <Reveal>
          <SectionLabel index="—" label={alliance.eyebrow} tone="light" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-3xl leading-tight text-nexum-white sm:text-4xl">
            {alliance.visual}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-nexum-white/80">
            {alliance.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
