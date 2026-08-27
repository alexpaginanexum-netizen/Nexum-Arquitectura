import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Logotipo oficial de NEXUM (public/logos/nexum-logo.jpg).
 * El archivo original tiene fondo claro: se muestra dentro de un
 * contenedor con esquinas suaves para integrarse en fondos oscuros.
 */
export function Logo({ className, priority = false, width = 176, height = 136 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logos/nexum-logo.jpg"
        alt="NEXUM Arquitectura"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full object-contain"
      />
    </span>
  );
}
