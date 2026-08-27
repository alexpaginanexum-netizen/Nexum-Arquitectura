type ClassValue = string | number | false | null | undefined;

/** Combina clases condicionalmente sin depender de librerías externas. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
