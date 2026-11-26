# Publicar Storybook

**Estado: se publica en GitHub Pages** en <https://dmendozacruz.github.io/dime/>,
con el workflow `.github/workflows/storybook.yml`. Se despliega en cada push a `main` (y a
mano desde la pestaña *Actions* con *Run workflow*).

Decidido el 2026-11-26: GitHub Pages, porque el repositorio es público (en privado necesita
un plan de pago) y así todo queda en la misma plataforma. Vercel era la opción anterior.

## Activarlo (una vez)

1. En GitHub: *Settings* → *Pages* → *Build and deployment* → *Source*: **GitHub Actions**.
2. Hacer push a `main`. El workflow construye y publica; la URL sale en el resumen del job.

## La fuente

ABC Monument Grotesk no se publica (D-008): los `.woff2` no están en el repositorio. El
workflow quita las reglas `@font-face` antes de construir, así el sitio usa Helvetica Neue o
Arial y no pide archivos que no existen. En local, con los archivos en `public/fonts/`, se
ve con ABC Monument.

## Rutas

Pages sirve el sitio en una subcarpeta (`/dime/`). Por eso los recursos
(`logos/…`, `icons/…`) se escriben **sin barra inicial** en el código, para que se resuelvan
desde el sitio y no desde la raíz del dominio. Las URL de los CSS las reescribe el build.

## Comprobar antes de subir

```bash
npm ci
npm run build-storybook
```

- El build termina sin errores y genera `storybook-static/`.
- No se sube nada que no deba: ni `.env`, ni la fuente, ni `storybook-static/` (todo en `.gitignore`).
- Abrir el sitio publicado en una ventana privada y recorrer Introducción, Mapa del sistema,
  Foundations y los componentes; sin errores en la consola.

Para volver atrás: *Actions* → el despliegue anterior → *Re-run all jobs*.
