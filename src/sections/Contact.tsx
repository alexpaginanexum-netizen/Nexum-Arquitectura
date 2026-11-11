import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { WhatsAppPicker } from "@/components/WhatsAppPicker";
import { contact, portfolio } from "@/lib/content";

export function Contact() {
  return (
    <section id="contacto" className="bg-nexum-black py-16 text-nexum-white md:py-20">
      <Container>
        <Reveal>
          <p className="font-body text-sm italic text-nexum-gold">“{contact.kicker}”</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-nexum-white sm:text-5xl">
            {contact.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-start gap-4">
            <WhatsAppPicker variant="cta">{contact.cta}</WhatsAppPicker>
            <Button href={portfolio.href} download={portfolio.downloadName} variant="outline-light">
              {portfolio.downloadLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <dl
            id="contacto-canales"
            className="mt-12 grid grid-cols-1 gap-8 border-t border-nexum-white/10 pt-8 sm:grid-cols-3"
          >
            {contact.channels.map((channel) => (
              <div key={channel.label}>
                <dt className="font-body text-xs tracking-nexum uppercase text-nexum-concrete">
                  {channel.label}
                </dt>
                <dd className="mt-2 space-y-1.5">
                  {channel.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block break-words font-body text-sm text-nexum-gold underline decoration-nexum-gold/40 underline-offset-4 transition-colors hover:text-nexum-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
