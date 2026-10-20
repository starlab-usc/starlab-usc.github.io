# Publication assets

Use `placeholder.svg` for papers without a thumbnail. It is a square, neutral
document illustration sized for the site's 132px publication thumbnails.
Import it with `?url` and use an empty `alt` when the adjacent paper title
already identifies the item.

Keep each paper in its own `year_venue_short_title/` folder:

- `index.json`: plain-text display title, ordered authors, conference year,
  venue, and resource links (`label` and `url`).
- `citation.bib`: citation text shown in the site's expandable BibTeX section.
  Preserve BibTeX syntax here; do not put LaTeX formatting in display fields.
- Optional images or other supporting assets belong beside these files.

Keep shared title and author information in both files consistent when editing.
The publication year refers to the conference, which may differ from the year
of a revised arXiv preprint. Import the JSON and BibTeX in
`src/pages/publications.astro` to present an item. BibTeX uses Vite's `?raw`
import for the disclosure. Resource links use local SVG icons with accessible
labels for arXiv and PDF.

For `2025_cdc_latent_representation`, the title and author order were checked
against https://arxiv.org/abs/2505.23210. The site owner supplied CDC 2025 as
the venue. The conference citation was assembled from those details, rather
than copied from the current arXiv export (which cites the 2026 revision).
Publisher DOI and page numbers have not been verified and are omitted.
