# NEXUM ARQUITECTURA

Sitio web de NEXUM ARQUITECTURA — "Arquitectura que conecta ideas, espacios y personas."

Construido con Next.js (App Router), React, TypeScript, Tailwind CSS y GSAP + ScrollTrigger
para una experiencia editorial, cinematográfica y guiada por scroll.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) 4
- [GSAP](https://gsap.com) + ScrollTrigger para animaciones ligadas al scroll (SVG, `clip-path`, transformaciones — sin Three.js)
- Fuentes: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) y [Manrope](https://fonts.google.com/specimen/Manrope) (cuerpo/UI), vía `next/font/google`

## Estructura del proyecto

```
src/
  app/            App Router: layout, page, metadata, estilos globales
  components/     Componentes reutilizables (Navbar, Footer, Button, Reveal…)
  sections/       Secciones de la Home (Hero, Servicios, Proceso, Contacto…)
  animations/     Configuración y registro de GSAP/ScrollTrigger
  hooks/          Hooks (reduced motion, layout effect isomórfico)
  lib/            Contenido editorial (src/lib/content.ts) y utilidades

public/
  logos/          Logotipo oficial de NEXUM (nexum-logo.jpg)
  images/         Imágenes generales (pendiente de contenido real)
  projects/       Imágenes de proyectos (pendiente de contenido real)
  textures/       Texturas/materiales (pendiente de contenido real)
```

Todo el contenido editorial (textos, servicios, proceso, proyectos placeholder, alianza,
contacto) vive centralizado en `src/lib/content.ts` para poder actualizarlo sin tocar
componentes.

## Contenido pendiente

Este sitio se entregó sin inventar información de negocio. Antes de publicar en producción,
sustituye lo siguiente:

- **Proyectos** (`src/lib/content.ts` → `projects`): nombre, ubicación, año, superficie,
  estado e imágenes reales de cada proyecto (`src/sections/Projects.tsx` usa
  `PlaceholderFrame` hasta entonces).
- **Isotipo del gran final** (`src/components/NexumMark.tsx`): monograma provisional que se
  arma en la sección final del scroll. Sustituye el contenido del SVG por el isotipo oficial
  cuando esté disponible; el resto de la animación (`src/sections/NexumFinale.tsx`) sigue
  funcionando sin cambios.
- **Datos de contacto** (`src/lib/content.ts` → `contact`): WhatsApp, correo, teléfono,
  Instagram y ubicación reales.
- **Logotipo de GARCYM** (`src/sections/Alliance.tsx`): reemplaza el recuadro
  "Logo GARCYM pendiente" por el logotipo real cuando se proporcione.
- **Favicon**: actualmente usa el logotipo (`public/logos/nexum-logo.jpg`); se recomienda
  sustituirlo por una versión cuadrada (PNG/SVG) del isotipo para una miniatura de pestaña
  más nítida.

## Desarrollo local

Requiere Node.js 18.18+ (recomendado 20 LTS).

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
npm run lint    # ESLint
npm run build   # build de producción
npm run start   # sirve el build de producción
```

## Subir el proyecto a GitHub

1. Crea un repositorio vacío en GitHub (sin README, sin .gitignore — ya existen en este
   proyecto).
2. Desde esta carpeta:

   ```bash
   git init            # si aún no es un repositorio git
   git add .
   git commit -m "Initial commit: NEXUM Arquitectura"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```

## Desplegar en Netlify

Este proyecto incluye `netlify.toml` con el plugin oficial `@netlify/plugin-nextjs`, que
permite desplegar Next.js (App Router, imágenes optimizadas, rutas dinámicas, etc.) en el
runtime de Netlify.

1. En [app.netlify.com](https://app.netlify.com), elige **Add new site → Import an existing
   project** y selecciona el repositorio de GitHub que acabas de crear.
2. Netlify detectará `netlify.toml` automáticamente:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs`
3. Confirma el despliegue. Cada `push` a la rama principal generará un nuevo despliegue
   (continuous deployment); los *pull requests* generan *deploy previews* automáticamente.
4. No se requiere configuración de Vercel: no hay `vercel.json` ni Edge Functions de Vercel
   en este proyecto.

## Notas de accesibilidad y rendimiento

- Todas las animaciones respetan `prefers-reduced-motion`: si el usuario lo activa, el
  contenido aparece directamente en su estado final sin desplazamientos ni escalados.
- Las secciones con animaciones "pinned" (scroll del ensamblaje arquitectónico y el gran
  final) se simplifican en móvil (sin *pin*, recorridos más cortos) para mantener fluidez.
- Imágenes servidas con `next/image`; iconografía y diagramas en SVG en vez de imágenes
  rasterizadas cuando es posible.
