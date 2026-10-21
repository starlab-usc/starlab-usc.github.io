# Recommended stack and architecture

Recommendation recorded on 2026-10-19. Design references and interaction preferences are in [00_overview.md](00_overview.md).

**Use Astro + TypeScript for the website, React Three Fiber for the interactive 3D logo, and HTML/CSS for the hanging member badges.** Build a static site with small interactive components. Add rope physics only if dragging and physically coupled motion become part of the intended design.

The repository currently contains design notes and assets, with no application or package manifest. The choices below are a proposed starting point, not an installed or tested stack.

## 1. Framework and packages

| Layer | Recommendation | Why it fits StarLab |
|---|---|---|
| Site framework | [`astro`](https://docs.astro.build/) | Pre-render the homepage, research, people, publications, and news as HTML. Most of the site is readable content; JavaScript can stay local to interactions. |
| Language | TypeScript, with strict checking | Give member records, publications, and component inputs explicit types. |
| Interactive components | [`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/), `react`, `react-dom` | Mount React only where it helps, especially the 3D scene. Ordinary layouts and content remain Astro components. |
| 3D rendering | [`three`](https://threejs.org/docs/), [`@react-three/fiber`](https://r3f.docs.pmnd.rs/) | Render the extruded SVG logo and control its pose through React. |
| 3D helpers | [`@react-three/drei`](https://drei.docs.pmnd.rs/) | Use focused helpers for lighting or environments where useful; it is optional if Three.js primitives suffice. |
| Styling and motion | Astro scoped CSS, shared CSS variables, native transitions | Enough for typography, responsive layouts, hanging-card styling, highlights, and restrained hover motion. No initial UI kit or animation package is needed. |
| Content | Astro content collections with schema validation | Keep research descriptions and news in Markdown, and structured people/publication records in local data files. Validate required fields at build time. |
| Development checks | `@astrojs/check`, `typescript`; React/Three type packages as required | Run `astro check` and `astro build` before deployment. Resolve compatible package versions together when scaffolding and commit the lockfile. |
| Deployment | Static `dist/` output on a lab-approved host | No application server or database is needed. Use a host with HTTPS, preview deployments, and rollback; confirm the lab's domain/hosting requirements before selecting the provider. |

Use **npm** initially, with a committed `package-lock.json` and `npm ci` in CI. Pin a supported Node version compatible with the selected Astro release. Exact package versions should be selected and checked during implementation rather than guessed in this design note.

### Why this framework

Astro matches a public academic website whose content should load independently of visual effects. Its React islands also leave room for a richer logo or robot demonstration without making every page a React application.

Next.js becomes worth reconsidering if the site later requires authenticated application workflows or substantial server-side behavior. A Vite React SPA would work, but would need additional routing and pre-rendering decisions for this content-focused site. Framer remains a useful visual reference; reproducing the preferred interactions does not require adopting Framer or buying its components.

## 2. Page and content architecture

Start with one shared layout and a small set of routes:

```text
src/
  pages/
    index.astro             # Mission, research preview, recent news
    research.astro
    people.astro
    publications.astro
    news.astro
  layouts/
    SiteLayout.astro        # Metadata, navigation, footer
  components/
    MemberBadge.astro       # Semantic profile content and CSS interaction
    PublicationList.astro
    LogoHero.astro         # Static SVG fallback and island boundary
    interactive/
      LogoScene.tsx         # Canvas, geometry, lighting, pointer response
  content/
    research/
    news/
    people/
    publications/
  content.config.ts         # Collection loaders and schemas
  styles/
    global.css              # Color, typography, spacing, motion tokens
  assets/                   # Processed portraits and research images
public/                     # Files that need stable, unprocessed URLs
```

This is a proposed layout; create files when their content or behavior is needed. Keep [the existing logo](../../assets/STARLab_logo.svg) as the source asset and derive any optimized or 3D representation from it.

- **One record per member or publication.** Generate cards and lists from the same records; avoid maintaining duplicate homepage and directory entries.
- **Build-time content.** Sort news and publications at build time. Start with Markdown and structured records in Git; add a CMS only if the editing workflow needs it.
- **Shared visual tokens.** Define the background, text, accent colors, type scale, and spacing centrally. The references suggest a warm academic layout with selective dimensional effects; the exact palette remains a design decision.
- **Semantic HTML first.** Titles, research summaries, names, roles, and profile links belong in HTML. Search engines and visitors should not need a canvas to read the site.

## 3. Interactive logo

Use one React Three Fiber canvas in the homepage logo area. Keep the ordinary SVG in navigation and as the hero fallback.

1. Inspect the SVG paths and produce shallow extruded geometry with small bevels. Three.js provides `SVGLoader` and `ExtrudeGeometry`; these do not require another package. Check overlapping shapes, holes, normals, and scale before deciding whether to pre-export a GLB asset.
2. Map pointer position within the logo region to a small, bounded rotation. Ease back to the resting pose on pointer exit. Keep continuous auto-rotation off.
3. Use restrained lighting and a simple material first. Test a metallic treatment before adding glass effects, which may increase rendering cost and reduce legibility.
4. Use demand-driven rendering while idle, invalidating frames only while the pose changes. Cap device pixel ratio and keep geometry and lighting modest.
5. Load the scene lazily through a React island, for example `client:visible`. Keep its imports within that island so unrelated routes do not load the 3D bundle.

**Fallback is part of the component contract:** preserve the SVG until the scene is ready, and retain it for reduced motion, devices without hover, unsupported WebGL, or scene failure. Check these conditions before initializing the canvas; an Astro hydration directive alone does not implement this policy. Reserve the same dimensions for both representations to avoid layout shifts. Treat the canvas as decorative, with the lab name available in HTML.

## 4. Hanging member badges

Start with **HTML cards, a CSS wire/lanyard, and CSS transforms**. The preferred layout needs readable portraits, subtle swing/tilt, and a profile reveal; it does not yet require a physics simulation.

- Keep the portrait, name, and role visible at rest. Use restrained hover and focus effects for depth and highlights.
- Use a native disclosure such as `<details>` for research interests and links. This supplies click/tap and keyboard behavior without a custom flip-card state machine.
- Keep links separate from the reveal control. Avoid wrapping a whole card in a link when it contains other interactive elements.
- On narrow screens, present a normal grid or list. Under `prefers-reduced-motion`, remove swinging and animated transforms.

If draggable badges with rope constraints become a firm requirement, add [`@react-three/rapier`](https://pmndrs.github.io/react-three-rapier/) within a dedicated React island. Follow the Vercel technical reference in the overview, use one shared canvas for the badge scene, and preserve an accessible HTML directory. This adds physics state, asset preparation, and drag-versus-click handling, so it should follow a deliberate interaction decision.

## 5. Implementation order and acceptance checks

1. **Build the static site.** Establish typography, responsive navigation, content schemas, and the five routes using real lab content. Verify that navigation and essential content work with JavaScript disabled.
2. **Add the logo scene.** Validate the existing SVG's extrusion and the pointer response. Check mobile/static behavior, reduced motion, WebGL failure, and layout stability.
3. **Add member badges.** Verify keyboard navigation, tap-to-reveal, readable resting states, and independently usable profile links. Decide whether the CSS version satisfies the visual reference before introducing physics.
4. **Validate and deploy a preview.** Run type/content checks and the production build. Inspect desktop and mobile layouts, broken links, image sizing, contrast, and the production network requests. Confirm that non-3D routes do not download the scene bundle and that loading the logo does not delay access to the main content.

The initial scope needs no database, authentication, global state library, physics engine, or custom backend. The main implementation uncertainty is how well the current SVG extrudes; resolve that with a small visual prototype before investing in advanced materials.
