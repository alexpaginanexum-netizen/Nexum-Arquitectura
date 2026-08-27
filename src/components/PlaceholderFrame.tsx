import { cn } from "@/lib/utils";

interface PlaceholderFrameProps {
  label?: string;
  className?: string;
  ratio?: "video" | "portrait" | "square";
}

const ratios: Record<NonNullable<PlaceholderFrameProps["ratio"]>, string> = {
  video: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

/**
 * Marcador visual elegante para imágenes/renders aún no disponibles.
 * Usa un patrón de líneas arquitectónicas en vez de una caja gris genérica.
 */
export function PlaceholderFrame({
  label = "Imagen pendiente",
  className,
  ratio = "video",
}: PlaceholderFrameProps) {
  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden bg-nexum-ivory",
        ratios[ratio],
        className,
      )}
    >
      <svg className="absolute inset-0 h-full w-full text-nexum-black/10" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
        <rect x="0.5" y="0.5" width="99%" height="99%" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="relative z-10 m-5 font-body text-[0.65rem] tracking-nexum uppercase text-nexum-graphite">
        {label}
      </span>
    </div>
  );
}
