import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { WhatsAppPicker } from "@/components/WhatsAppPicker";
import { contact, portfolio } from "@/lib/content";

export function Contact() {
  return (
    <section id="contacto" className="bg-nexum-black py-16 text-nexum-white md:py-20">
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
            <div className="mt-12 flex flex-wrap items-start gap-4">
              <WhatsAppPicker variant="cta">{contact.cta}</WhatsAppPicker>
              <Button href={portfolio.href} variant="outline-light">
                {portfolio.label}
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
                {channel.links ? (
                  <dd className="mt-2 space-y-2">
                    {channel.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-body text-sm text-nexum-gold underline decoration-nexum-gold/40 underline-offset-4 transition-colors hover:text-nexum-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </dd>
                ) : channel.href ? (
                  <dd className="mt-2">
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-nexum-gold underline decoration-nexum-gold/40 underline-offset-4 transition-colors hover:text-nexum-white"
                    >
                      {channel.value}
                    </a>
                  </dd>
                ) : (
                  <dd className="mt-2 font-body text-sm text-nexum-white/70">{channel.value}</dd>
                )}
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
