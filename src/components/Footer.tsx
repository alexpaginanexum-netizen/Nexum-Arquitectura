import Image from "next/image";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { brand, instagram, portfolio } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-nexum-black text-nexum-white">
      <Container className="flex flex-col items-center gap-10 py-14 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="rounded bg-white p-2">
            <Logo className="h-12" sizes="68px" />
          </span>
          <p className="mt-5 max-w-xs font-display text-lg italic text-nexum-white">{brand.slogan}</p>
          <p className="mt-2 font-body text-[0.65rem] tracking-nexum uppercase text-nexum-concrete">
            {brand.motto}
          </p>
          <a
            href={portfolio.href}
            download={portfolio.downloadName}
            className="mt-6 font-body text-sm text-nexum-gold underline decoration-nexum-gold/40 underline-offset-4 transition-colors hover:text-nexum-white"
          >
            {portfolio.downloadLabel}
          </a>
        </div>

        <a
          href={instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de NEXUM Arquitectura"
          className="group flex flex-col items-center gap-3"
        >
          <span className="block rounded-2xl bg-white p-3 transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src="/images/qr-instagram-web.jpg"
              alt="Código QR de Instagram de NEXUM Arquitectura"
              width={600}
              height={600}
              sizes="148px"
              className="h-[148px] w-[148px] sm:h-[156px] sm:w-[156px]"
            />
          </span>
          <span className="font-body text-sm text-nexum-gold transition-colors group-hover:text-nexum-white">
            {instagram.handle}
          </span>
        </a>
      </Container>

      <div className="border-t border-nexum-white/10">
        {/* pr-20 en móvil: deja espacio al botón flotante de WhatsApp (esquina inferior derecha). */}
        <Container className="py-5 pr-20 text-xs text-nexum-concrete md:pr-8">
          <p>© {year} NEXUM ARQUITECTURA. Todos los derechos reservados.</p>
        </Container>
      </div>
    </footer>
  );
}
