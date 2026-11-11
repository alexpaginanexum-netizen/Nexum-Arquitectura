import Image from "next/image";
import { cn } from "@/lib/utils";

/** Dimensiones intrínsecas de public/logos/nexum-logo-web.png. */
const LOGO_WIDTH = 724;
const LOGO_HEIGHT = 519;

interface LogoProps {
  /** Controla el tamaño con clases de alto (p. ej. "h-12 md:h-16"); el ancho se ajusta solo. */
  className?: string;
  priority?: boolean;
  /** Valor de `sizes` para next/image (ancho aproximado en pantalla). */
  sizes?: string;
}

/**
 * Logotipo oficial de NEXUM.
 * public/logos/nexum-logo-web.png es una versión recortada (sin el margen
 * blanco) y reducida de public/logos/nexum-logo-grande.png. Tiene fondo
 * blanco: úsalo sobre blanco o dentro de un recuadro blanco.
 */
export function Logo({ className, priority = false, sizes = "120px" }: LogoProps) {
  return (
    <Image
      src="/logos/nexum-logo-web.png"
      alt="NEXUM Arquitectura"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      sizes={sizes}
      className={cn("h-12 w-auto object-contain", className)}
    />
  );
}
