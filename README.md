# StarLab website

## 1. Edit content

Edit the content below to update [the lab website](https://starlab-usc.github.io/).

| Page | What to change | Where to edit |
| --- | --- | --- |
| About | About text, headline, and research keywords | [src/pages/_index.md](src/pages/_index.md) |
| About | News | Add or edit `assets/news/<event-folder>/index.md`; copy [this example](assets/news/20261020_invited_talk_leo_toso/index.md) with a new title, quoted `YYYY-MM-DD` date, and summary. The body appears under **Read more**. |
| About | Prospective Students | [src/pages/_prospective_students.md](src/pages/_prospective_students.md) |
| Publications | Publication thumbnail | Add or replace `thumbnail.png` in the paper's folder under [assets/publications/](assets/publications/). The folder name matches the paper's `id` in [_publications.md](src/pages/_publications.md). |
| Publications | Add or edit a publication | Edit [src/pages/_publications.md](src/pages/_publications.md). For a new item, copy an existing record, choose a unique `id`, and add a matching folder in [assets/publications/](assets/publications/) with `citation.bib` and an optional `thumbnail.png`. Keep authors in credit order and citation metadata consistent. |
| People | Member names, roles, interests, links, and photos | Edit [src/pages/_people.md](src/pages/_people.md). Store photos in [assets/](assets/) and set `profile_photo` to the file path, or `null` for a placeholder. |

People and publication records live in the YAML block between `---` markers.
Keep the existing field structure and indentation when copying an item.

## 2. Local development

### 2.1. Set up the environment

Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed, then run these commands from the repository root. `nvm install` installs the Node.js version specified in [.nvmrc](.nvmrc) (24.21.0), including npm.

```sh
nvm install
nvm use
npm ci
```

### 2.2. Serve locally

After environment setup, start the development server:

```sh
npm run dev
```

Open the URL printed by Astro (normally http://localhost:4321). Stop the server with `Ctrl+C`.

### 2.3. Check and build

After environment setup, run these checks before submitting changes:

```sh
npm run check
npm run build
```

## 3. Publish

Pushes to `main` automatically publish through [GitHub Actions](.github/workflows/deploy.yml).
The repository's **Settings → Pages → Source** must be **GitHub Actions**.
