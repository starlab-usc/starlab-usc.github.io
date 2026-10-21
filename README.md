# StarLab website

Astro + TypeScript, with a React Three Fiber logo derived from
`assets/STARLab_logo.svg`. The homepage contains About, News, and Prospective
Students sections, with separate People and Publications pages.

## About page content

Edit `src/pages/_index.md` for the introduction. Its frontmatter owns the
headline, page description, cycling keywords, and People/Publications links.
Edit `src/pages/_prospective_students.md` for the Prospective Students heading
and copy. Keep at least one non-empty keyword in the list.

Page Markdown lives beside its Astro page. The `_` prefix prevents Astro from
creating separate routes for these imported content files.

`src/pages/index.astro` handles layout; `ResearchKeywords.astro` handles the
animation. `scripts/261009-kickstart/03_about_news.md` remains the planning document.

## People and Publications content

Edit `src/pages/_people.md` for the page title, section headings, and member
records. Member fields include names, roles, research interests, profile links,
photo paths, and additional information. Keep photos in `assets/`; a null
`profile_photo` uses the existing placeholder.

Publication authors matching a member's name are bolded automatically, excluding
members with `group: affiliated`. If a paper
uses another spelling, add it to that member's optional `publication_aliases`
list; the published author text stays unchanged.

Edit `src/pages/_publications.md` for the page title and publication records.
Each record's `id` must match its folder under `assets/publications/`, which
contains the required `citation.bib` and optional `thumbnail.png`. Keep authors
in credit order. The page groups publications by year and sorts titles within
each year automatically.

Both files use YAML frontmatter for structured records. Add ordinary Markdown
below the closing `---` for introductory prose above the cards or publication
list. Their adjacent `.astro` files handle layout and interactions. Metadata is
validated at build time; the Markdown files replace the former JSON records.

## News

Add each announcement as `assets/news/<event-folder>/index.md` with `title`,
`date` (quoted `YYYY-MM-DD`), and `summary` frontmatter. The Markdown body appears
under **Read more**; the title is rendered from frontmatter. Keep any associated
media in the event folder and use relative Markdown links. The homepage shows
the eight latest entries, with older entries grouped by year under **Older news**.

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

## GitHub Pages

The deployment target is https://starlab-usc.github.io/.
In the GitHub repository's **Settings → Pages**, the publishing source must
be **GitHub Actions**.
GitHub Pages must be enabled before deployment. Private organization
repositories require a GitHub plan that supports Pages for private repositories.

Pushes to `main` run `.github/workflows/deploy.yml`, which checks and builds
the site with Node.js 24.21.0, then deploys `dist/` to GitHub Pages. The workflow
can also be run manually from the Actions tab. No deployment token or committed
build output is needed.
