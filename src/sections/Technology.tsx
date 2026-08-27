import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { technology } from "@/lib/content";

export function Technology() {
  return (
    <section id="tecnologia" className="bg-nexum-white py-28 md:py-36">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel index="—" label={technology.eyebrow} className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-tight text-nexum-black sm:text-5xl">
              {technology.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-nexum-graphite">
              La tecnología es un medio, no el mensaje: cada herramienta está al servicio de una
              mejor decisión arquitectónica.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
          {technology.items.map((item, i) => (
            <Reveal key={item} delay={(i % 2) * 0.05}>
              <li className="flex items-center gap-4 border-b border-nexum-black/10 py-6">
                <span className="font-body text-xs text-nexum-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-body text-sm text-nexum-black">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
