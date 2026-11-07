/**
 * Contenido editorial de NEXUM ARQUITECTURA.
 * Centralizado para facilitar edición futura sin tocar los componentes.
 * Ningún dato aquí es inventado: cifras, clientes y estadísticas quedan
 * fuera hasta contar con información confirmada.
 */

export const brand = {
  name: "NEXUM",
  full: "NEXUM ARQUITECTURA",
  meaning: "Unión, conexión o vínculo sólido.",
  conceptPrimary: "Arquitectura que conecta ideas, espacios y personas.",
  conceptSecondary:
    "Conectamos ideas, espacios y personas para construir algo que permanezca.",
  tagline: "Todo comienza con una conexión.",
};

export const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nexum" },
  { label: "Alianza", href: "#alianza" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "NEXUM ARQUITECTURA",
  headline: ["Arquitectura que conecta", "ideas, espacios y personas."],
  subheadline:
    "Diseñamos, visualizamos y construimos espacios donde arquitectura, funcionalidad y tecnología convergen.",
  ctaPrimary: { label: "Conoce nuestros proyectos", href: "#proyectos" },
  ctaSecondary: { label: "Inicia tu proyecto", href: "#contacto" },
  explore: "Explora",
};

export const nexumSection = {
  eyebrow: "El nombre",
  headline: "NEXUM significa conexión.",
  body: "Nuestro nombre proviene del latín y representa unión, conexión y vínculo sólido. Esa misma idea define nuestra forma de entender la arquitectura: conectar necesidades, diseño, tecnología, materiales y personas para transformar una idea en un espacio construido.",
  nodes: ["IDEA", "DISEÑO", "ESPACIO", "MATERIAL", "PERSONA", "CONEXIÓN"],
};

export const journeySteps = [
  "IDEA",
  "LÍNEA",
  "ESTRUCTURA",
  "ARQUITECTURA",
  "ESPACIO",
  "CONEXIÓN",
  "NEXUM",
];

export const services = [
  {
    index: "01",
    title: "Arquitectura residencial",
    description:
      "Casas, residencias, remodelaciones, ampliaciones y proyectos habitacionales.",
    line: "Espacios diseñados alrededor de quienes los habitan.",
  },
  {
    index: "02",
    title: "Desarrollo habitacional",
    description:
      "Edificios de departamentos, conjuntos habitacionales y desarrollos residenciales.",
    line: "Diseñamos espacios que conectan arquitectura, comunidad y ciudad.",
  },
  {
    index: "03",
    title: "Diseño de interiores",
    description:
      "Diseño residencial y comercial, materiales, mobiliario e iluminación.",
    line: "El espacio continúa después de la arquitectura.",
  },
  {
    index: "04",
    title: "Visualización arquitectónica",
    description:
      "Renders fotorrealistas, modelado 3D, recorridos virtuales, interiores y exteriores.",
    line: "Visualizamos el proyecto antes de construirlo.",
  },
  {
    index: "05",
    title: "Proyecto ejecutivo",
    description: "Planos, documentación, detalles, coordinación y especificaciones.",
    line: "Convertimos una idea en información capaz de construirse.",
  },
  {
    index: "06",
    title: "Construcción",
    description: "Desarrollo y ejecución de proyectos.",
    line: "Del concepto al espacio construido.",
  },
];

export const process = [
  {
    index: "01",
    title: "Escuchamos",
    description: "Entendemos necesidades, contexto, presupuesto y aspiraciones.",
  },
  {
    index: "02",
    title: "Conceptualizamos",
    description: "Transformamos necesidades en una idea arquitectónica.",
  },
  {
    index: "03",
    title: "Diseñamos",
    description: "Desarrollamos espacio, forma, materialidad y funcionalidad.",
  },
  {
    index: "04",
    title: "Visualizamos",
    description:
      "Creamos renders y modelos que permiten experimentar el proyecto antes de construirlo.",
  },
  {
    index: "05",
    title: "Documentamos",
    description: "Generamos la información necesaria para materializar el proyecto.",
  },
  {
    index: "06",
    title: "Construimos",
    description: "Convertimos el diseño en arquitectura.",
  },
  {
    index: "07",
    title: "Conectamos",
    description:
      "Creamos espacios capaces de generar vínculos entre las personas y su entorno.",
  },
];

export type ProjectCategory =
  | "Residencial"
  | "Departamentos"
  | "Interiores"
  | "Remodelaciones"
  | "Visualización"
  | "Construcción";

export const projectCategories: ProjectCategory[] = [
  "Residencial",
  "Departamentos",
  "Interiores",
  "Remodelaciones",
  "Visualización",
  "Construcción",
];

export interface ProjectPlaceholder {
  id: string;
  name: string;
  category: ProjectCategory;
  location: string;
  year: string;
  typology: string;
  area: string;
  status: string;
}

/**
 * Placeholders — sustituir por proyectos reales cuando estén disponibles.
 * No representan proyectos existentes.
 */
export const projects: ProjectPlaceholder[] = [
  {
    id: "proyecto-01",
    name: "PROYECTO PENDIENTE 01",
    category: "Residencial",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Vivienda unifamiliar",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
  {
    id: "proyecto-02",
    name: "PROYECTO PENDIENTE 02",
    category: "Departamentos",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Desarrollo habitacional",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
  {
    id: "proyecto-03",
    name: "PROYECTO PENDIENTE 03",
    category: "Interiores",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Interiorismo residencial",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
  {
    id: "proyecto-04",
    name: "PROYECTO PENDIENTE 04",
    category: "Remodelaciones",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Remodelación / ampliación",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
  {
    id: "proyecto-05",
    name: "PROYECTO PENDIENTE 05",
    category: "Visualización",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Visualización arquitectónica",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
  {
    id: "proyecto-06",
    name: "PROYECTO PENDIENTE 06",
    category: "Construcción",
    location: "Ubicación pendiente",
    year: "Año pendiente",
    typology: "Obra en ejecución",
    area: "Superficie pendiente",
    status: "Estado pendiente",
  },
];

export const technology = {
  eyebrow: "Tecnología",
  headline: "Arquitectura diseñada con herramientas del presente.",
  items: [
    "Modelado 3D",
    "Visualización arquitectónica",
    "Documentación digital",
    "Coordinación de proyecto",
    "Renders fotorrealistas",
    "Recorridos virtuales",
  ],
};

export const alliance = {
  eyebrow: "Alianza estratégica",
  visual: "NEXUM × GARCYM",
  headline: "Diseño conectado con experiencia y ejecución.",
  body: "NEXUM Arquitectura mantiene una alianza estratégica con GARCYM, empresa con presencia en Chimalhuacán, Estado de México. Esta colaboración fortalece nuestra capacidad para conectar diseño, desarrollo y ejecución dentro de los proyectos.",
};

export interface TeamContact {
  /** Nombre que se muestra, sin título. */
  name: string;
  /** Nombre corto para el saludo del mensaje de WhatsApp. */
  shortName: string;
  /** Título profesional tal como se muestra. */
  title: "Arquitecto" | "Arquitecta";
  /** Teléfono tal como se muestra. */
  display: string;
  /** Número de WhatsApp en formato internacional, solo dígitos (sin '+' ni espacios). */
  whatsapp: string;
}

/** Integrantes del equipo NEXUM con WhatsApp directo. */
export const teamContacts: TeamContact[] = [
  {
    name: "Eduardo Castro",
    shortName: "Eduardo",
    title: "Arquitecto",
    display: "55 1393 6807",
    whatsapp: "525513936807",
  },
  {
    name: "Estrella De Santiago",
    shortName: "Estrella",
    title: "Arquitecta",
    display: "55 4286 9939",
    whatsapp: "525542869939",
  },
  {
    name: "Alejandro R. Solano",
    shortName: "Alejandro",
    title: "Arquitecto",
    display: "55 3558 8226",
    whatsapp: "525535588226",
  },
];

/** Mensaje predeterminado de WhatsApp, personalizado con el nombre de quien recibe. */
export function whatsappMessageFor(member: TeamContact): string {
  return `Hola Arq. ${member.shortName}, me interesa iniciar un proyecto con NEXUM Arquitectura.`;
}

/** Enlace "click to chat" de WhatsApp con el mensaje predeterminado codificado. */
export function whatsappHrefFor(member: TeamContact): string {
  return `https://wa.me/${member.whatsapp}?text=${encodeURIComponent(whatsappMessageFor(member))}`;
}

export const instagram = {
  handle: "@nexum.arquitectos",
  href: "https://www.instagram.com/nexum.arquitectos",
};

/** Portafolio arquitectónico en PDF (archivo en public/). */
export const portfolio = {
  label: "Ver portafolio (PDF)",
  href: "/portafolio-nexum.pdf",
};

export interface ContactChannel {
  label: string;
  value?: string;
  href?: string;
  links?: { label: string; href: string }[];
}

export const contact = {
  kicker: "Todo comienza con una conexión.",
  headline: "Hablemos de tu próximo proyecto.",
  cta: "Iniciar proyecto",
  channels: [
    {
      label: "WhatsApp",
      links: teamContacts.map((member) => ({
        label: `${member.title} ${member.name} · ${member.display}`,
        href: whatsappHrefFor(member),
      })),
    },
    { label: "Correo", value: "Pendiente" },
    { label: "Teléfono", value: "Pendiente" },
    { label: "Instagram", value: instagram.handle, href: instagram.href },
    { label: "Ubicación", value: "Pendiente" },
  ] as ContactChannel[],
};

export const footer = {
  note: "NEXUM — Unión. Conexión. Arquitectura.",
};
