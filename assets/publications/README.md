# Publication assets

Papers without a thumbnail reserve a transparent 132px square. The page or
highlighted row background shows through in both light and dark mode.
Non-square thumbnails show a 132px square crop and reveal the full figure over
the adjacent text when hovered or keyboard-focused (tap to focus on touchscreens).
The reveal preserves the image's aspect ratio and fits within the row width.

Keep each paper in its own `year_venue_short_title/` folder:

- `index.json`: plain-text display title, ordered authors, publication year,
  venue, resource links (`label` and `url`), and an optional `note` for awards,
  publication status, or author contributions.
- `citation.bib`: citation text shown in the site's expandable BibTeX section.
  Preserve BibTeX syntax here; do not put LaTeX formatting in display fields.
- An existing `thumbnail.png` is displayed when available; otherwise the page
  uses the transparent placeholder. Other supporting assets can live beside these files.

Keep shared title, author, and year information in both files consistent when editing.
Use full conference and journal names in `venue`, rather than venue acronyms.
BibTeX uses the full proceedings or journal title from the publisher; this can
differ from the display conference name. Unpublished papers use `Preprint`.
The publication year refers to the conference or journal, which may differ
from the year of an arXiv preprint. Preprints use their initial arXiv year.
`src/pages/publications.astro` automatically imports each folder's JSON and
BibTeX, groups papers by descending year, and sorts titles within each year.
BibTeX uses Vite's `?raw` import for the disclosure. Resource links use local
SVG icons with accessible labels for arXiv and PDF.

The collection was initially populated from https://stephentu.github.io/.
All 18 current records were audited on 2026-10-19 against paper metadata,
publisher proceedings, journal records, and publisher-deposited Crossref data.
See [the citation audit](CITATION_AUDIT.md) for per-paper sources and remaining
publication-status limits. BibTeX URLs prefer the published version; display
resource links can still point to the freely available arXiv version.

“Safely Learning Dynamical Systems” uses the final journal issue year, 2026,
rather than its online-first year, 2025. Existing folder names and citation
keys remain stable even when a paper's title or publication year is corrected.
