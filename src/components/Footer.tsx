import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { footer, instagram, navLinks, portfolio } from "@/lib/content";

const socials = [
  { label: "Instagram", href: instagram.href, external: true },
  { label: "Portafolio (PDF)", href: portfolio.href, external: true },
  { label: "LinkedIn", href: "#", external: false },
];

const legal = [
  { label: "Aviso de privacidad", href: "#" },
  { label: "Términos", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-nexum-black text-nexum-white">
      <Container className="grid grid-cols-1 gap-14 py-20 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-2">
          <Logo className="mb-6 h-14 rounded bg-white p-1.5" />
          <p className="max-w-xs font-body text-sm text-nexum-concrete">{footer.note}</p>
        </div>

        <div>
          <h3 className="mb-5 font-body text-xs tracking-nexum uppercase text-nexum-concrete">
            Menú
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-nexum-white/85 transition-colors hover:text-nexum-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-body text-xs tracking-nexum uppercase text-nexum-concrete">
            Redes
          </h3>
          <ul className="space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                {social.external ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-nexum-white/85 transition-colors hover:text-nexum-gold"
                  >
                    {social.label}
                  </a>
                ) : (
                  <Link
                    href={social.href}
                    className="font-body text-sm text-nexum-white/85 transition-colors hover:text-nexum-gold"
                  >
                    {social.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-nexum-white/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-nexum-concrete md:flex-row md:items-center">
          <p>
            © {year} NEXUM ARQUITECTURA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-nexum-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
