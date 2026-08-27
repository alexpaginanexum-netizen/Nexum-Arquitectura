import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section id="contacto" className="bg-nexum-black py-28 text-nexum-white md:py-36">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-body text-sm italic text-nexum-gold">“{contact.kicker}”</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-display text-4xl leading-tight text-nexum-white sm:text-5xl lg:text-6xl">
              {contact.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12">
              <Button href="#contacto-canales" variant="light">
                {contact.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <dl
            id="contacto-canales"
            className="mt-20 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-nexum-white/10 pt-12 sm:grid-cols-3 lg:grid-cols-5"
          >
            {contact.channels.map((channel) => (
              <div key={channel.label}>
                <dt className="font-body text-xs tracking-nexum uppercase text-nexum-concrete">
                  {channel.label}
                </dt>
                <dd className="mt-2 font-body text-sm text-nexum-white/70">{channel.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
