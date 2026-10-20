# STARLab website

Astro + TypeScript, with a React Three Fiber logo derived from
`assets/STARLab_logo.svg`. The initial page contains only a top banner.

## Local development

Use Node.js 24.21.0 (`nvm use` if you use nvm), then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro (normally http://localhost:4321).
Move the pointer over the logo to tilt it; leaving the logo returns it to rest.
The logo is a single glass block cropped to the black artwork’s outer bounds.
An SVG-derived material mask makes the black parts opaque and the gaps clear,
with flush faces, neutral studio reflections, and no surrounding plate or rim.
Interior black/clear boundaries have opaque walls through the block's depth,
so tilting reveals the black shapes' sides through the clear fill.
The original SVG remains unchanged.
Touch devices, reduced-motion preferences, disabled JavaScript, and WebGL
failures retain the static SVG.

## Validation and production

```sh
npm run check
npm run build
npm run preview
```

The production site is generated in `dist/`. No backend or environment
variables are required.
