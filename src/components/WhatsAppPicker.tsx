"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { teamContacts, whatsappHrefFor } from "@/lib/content";
import { cn } from "@/lib/utils";

interface WhatsAppPickerProps {
  /** "floating": botón redondo fijo en la esquina. "cta": botón de texto para secciones. */
  variant: "floating" | "cta";
  /** Texto del botón en la variante "cta". */
  children?: ReactNode;
  className?: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 448 512" className={cn("fill-current", className)}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

/**
 * Selector de WhatsApp: al hacer clic muestra a los integrantes del equipo y
 * cada opción abre un chat con su mensaje predeterminado. Se usa tanto en el
 * botón flotante como en la sección de contacto.
 *
 * Accesibilidad: aria-expanded/aria-controls, cierre con Esc o clic fuera,
 * foco al primer contacto al abrir y de vuelta al botón al cerrar con Esc.
 * La animación respeta prefers-reduced-motion (regla global en globals.css).
 */
export function WhatsAppPicker({ variant, children, className }: WhatsAppPickerProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(variant !== "floating");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Aparición suave del botón flotante.
  useEffect(() => {
    if (variant !== "floating") return;
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, [variant]);

  // Cierre con Esc y clic fuera; foco al primer contacto al abrir.
  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isFloating = variant === "floating";

  return (
    <div
      ref={rootRef}
      className={cn(
        isFloating
          ? cn(
              "fixed bottom-6 right-6 z-40 transition-all duration-500 ease-[var(--ease-nexum)] sm:bottom-8 sm:right-8",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )
          : "relative inline-block",
        className,
      )}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={isFloating ? "Contactar por WhatsApp" : undefined}
        className={
          isFloating
            ? "flex h-14 w-14 items-center justify-center rounded-full bg-nexum-black text-nexum-gold shadow-lg shadow-nexum-black/30 transition-all duration-500 ease-[var(--ease-nexum)] hover:scale-105 hover:bg-nexum-gold hover:text-nexum-black focus-visible:scale-105"
            : "group inline-flex items-center gap-3 bg-nexum-white px-8 py-4 font-body text-xs uppercase tracking-nexum text-nexum-black transition-colors duration-300 hover:bg-nexum-ivory"
        }
      >
        {isFloating ? (
          <WhatsAppIcon className="h-6 w-6" />
        ) : (
          <>
            <span>{children}</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label="Elige con quién escribir por WhatsApp"
          className={cn(
            "absolute z-50 w-[min(20rem,calc(100vw-3rem))] border border-nexum-black/10 bg-nexum-white p-5 text-nexum-black shadow-2xl shadow-nexum-black/30",
            isFloating ? "bottom-full right-0 mb-3" : "left-0 top-full mt-3",
          )}
        >
          <p className="font-body text-xs uppercase tracking-nexum text-nexum-bronze-deep">
            ¿Con quién quieres hablar?
          </p>
          <ul className="mt-4 divide-y divide-nexum-black/10">
            {teamContacts.map((member) => (
              <li key={member.whatsapp}>
                <a
                  href={whatsappHrefFor(member)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-nexum-bronze-deep"
                >
                  <span>
                    <span className="block font-body text-[0.7rem] uppercase tracking-nexum text-nexum-graphite">
                      {member.title}
                    </span>
                    <span className="block font-display text-lg leading-tight">{member.name}</span>
                    <span className="block font-body text-xs text-nexum-graphite">
                      {member.display}
                    </span>
                  </span>
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-nexum-bronze-deep" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
