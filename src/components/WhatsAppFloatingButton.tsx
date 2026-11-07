"use client";

import { WhatsAppPicker } from "@/components/WhatsAppPicker";

/**
 * Botón flotante fijo de contacto por WhatsApp, visible en todo el recorrido
 * del sitio. Abre el selector con los integrantes del equipo.
 */
export function WhatsAppFloatingButton() {
  return <WhatsAppPicker variant="floating" />;
}
