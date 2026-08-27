import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index?: string;
  label: string;
  className?: string;
  tone?: "dark" | "light";
}

/** Etiqueta editorial numerada usada como encabezado de sección. */
export function SectionLabel({ index, label, className, tone = "dark" }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-body text-xs tracking-nexum uppercase",
        tone === "dark" ? "text-nexum-graphite" : "text-nexum-concrete",
        className,
      )}
    >
      {index && (
        <span className={tone === "dark" ? "text-nexum-gold" : "text-nexum-gold"}>{index}</span>
      )}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
