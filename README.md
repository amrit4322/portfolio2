# Amritjot Singh portfolio (React)

A single-page portfolio built with React and Vite. The published preview and this source share the same content and visual design.

## Run locally

Install Node.js 20.19+ or 22.12+, then:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Customise

- `src/App.jsx`: profile links, project/repository lists, timeline, skills and all page sections.
- `src/styles.css`: layout and colours. Theme variables are at the top.
- `public/amritjot-portrait.webp`: portrait displayed in the hero.
- `public/Amritjot_Singh_Resume.pdf`: downloadable résumé.
- `index.html`: page title, description, favicon and theme colour.

## Build and publish

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`. A static host such as Vercel can import your GitHub repository using the Vite preset (`npm run build`, output directory `dist`). You can connect your domain after checking its preview. Never put secret keys in `src/`, `public/`, or variables prefixed with `VITE_`; those are included in the browser build.
