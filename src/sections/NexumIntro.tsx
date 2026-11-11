import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { brand, nexumSection } from "@/lib/content";

export function NexumIntro() {
  return (
    <section id="nexum" className="bg-nexum-white py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="—" label={nexumSection.eyebrow} className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
              {nexumSection.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-nexum-graphite">
              {nexumSection.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Lema de la tarjeta, enmarcado con las líneas punteadas doradas de la misma. */}
            <p className="mt-10 inline-block border-y-2 border-dotted border-nexum-gold py-3 font-display text-xl italic text-nexum-black sm:text-2xl">
              {brand.slogan}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
