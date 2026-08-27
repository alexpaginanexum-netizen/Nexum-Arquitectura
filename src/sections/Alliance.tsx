import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { alliance } from "@/lib/content";

export function Alliance() {
  return (
    <section id="alianza" className="bg-nexum-graphite py-28 text-nexum-white md:py-36">
      <Container>
        <Reveal>
          <SectionLabel index="—" label={alliance.eyebrow} tone="light" className="mb-10" />
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="rounded bg-nexum-white p-3">
                <Logo width={88} height={68} />
              </div>
              <span className="font-display text-2xl text-nexum-white/40" aria-hidden>
                ×
              </span>
              <div className="flex h-[68px] w-[120px] items-center justify-center rounded border border-dashed border-nexum-white/30 px-3 text-center">
                <span className="font-body text-[0.6rem] tracking-nexum uppercase text-nexum-white/50">
                  Logo GARCYM pendiente
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-nexum-white sm:text-4xl">
                {alliance.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-nexum-white/75">
                {alliance.body}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
