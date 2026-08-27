import { forwardRef } from "react";
import type { SVGProps } from "react";

/**
 * Isotipo provisional de NEXUM — monograma "N" arquitectónico.
 * Sustituir el contenido de este archivo por el SVG oficial del isotipo
 * cuando esté disponible; el resto del sitio (incluida la animación del
 * "gran final") sigue funcionando sin cambios porque solo referencia
 * este componente.
 */
export const NexumMark = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function NexumMark(
  props,
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 180 200" fill="none" {...props}>
      <path
        data-mark-segment
        data-mark-left
        d="M40 180 V40"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        data-mark-segment
        data-mark-diagonal
        d="M40 40 L140 180"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        data-mark-segment
        data-mark-right
        d="M140 180 V40"
        stroke="var(--nexum-gold)"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
});
