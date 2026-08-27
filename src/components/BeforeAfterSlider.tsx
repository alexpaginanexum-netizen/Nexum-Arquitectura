"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc?: string;
  afterSrc?: string;
  className?: string;
}

/**
 * Comparador render / resultado construido. Reutilizable por proyecto:
 * pásale beforeSrc / afterSrc cuando existan renders y fotografías reales.
 */
export function BeforeAfterSlider({
  beforeLabel = "Render",
  afterLabel = "Resultado construido",
  beforeSrc,
  afterSrc,
  className,
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <div className={cn("relative aspect-[16/10] w-full select-none overflow-hidden bg-nexum-graphite", className)}>
      {/* Capa "después" — resultado construido, ocupa todo el marco */}
      <Layer label={afterLabel} src={afterSrc} tone="after" />

      {/* Capa "antes" — render, recortada por el slider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Layer label={beforeLabel} src={beforeSrc} tone="before" />
      </div>

      {/* Línea + manija visual */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-nexum-white/90"
        style={{ left: `${value}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-nexum-white/80 bg-nexum-black/60 text-nexum-white backdrop-blur-sm">
          <span aria-hidden className="text-xs tracking-widest">
            ⇆
          </span>
        </span>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 font-body text-[0.65rem] tracking-nexum uppercase text-nexum-white/90">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 font-body text-[0.65rem] tracking-nexum uppercase text-nexum-white/90">
        {afterLabel}
      </div>

      <label htmlFor={id} className="sr-only">
        Comparar {beforeLabel} con {afterLabel}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="slider-compare absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent"
      />
    </div>
  );
}

function Layer({ label, src, tone }: { label: string; src?: string; tone: "before" | "after" }) {
  if (src) {
    return <Image src={src} alt={label} fill className="object-cover" />;
  }

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        tone === "before" ? "bg-nexum-graphite" : "bg-nexum-black",
      )}
    >
      <svg className="absolute inset-0 h-full w-full text-nexum-white/10" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="relative font-body text-[0.65rem] tracking-nexum uppercase text-nexum-white/50">
        {label} — imagen pendiente
      </span>
    </div>
  );
}
