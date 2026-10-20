# Publication assets

Papers without a thumbnail reserve a transparent 132px square. The page or
highlighted row background shows through in both light and dark mode.

Keep each paper in its own `year_venue_short_title/` folder:

- `index.json`: plain-text display title, ordered authors, publication year,
  venue, resource links (`label` and `url`), and an optional `note` for awards,
  publication status, or author contributions.
- `citation.bib`: citation text shown in the site's expandable BibTeX section.
  Preserve BibTeX syntax here; do not put LaTeX formatting in display fields.
- An existing `thumbnail.png` is displayed when available; otherwise the page
  uses the transparent placeholder. Other supporting assets can live beside these files.

Keep shared title and author information in both files consistent when editing.
Use full conference and journal names in `venue` and the corresponding BibTeX
field, rather than venue acronyms. Unpublished papers use `Preprint`.
The publication year refers to the conference or journal, which may differ
from the year of an arXiv preprint. Preprints use their initial arXiv year.
`src/pages/publications.astro` automatically imports each folder's JSON and
BibTeX, groups papers by descending year, and sorts titles within each year.
BibTeX uses Vite's `?raw` import for the disclosure. Resource links use local
SVG icons with accessible labels for arXiv and PDF.

The 67 paper records were populated from https://stephentu.github.io/ on
2026-10-19: current and old preprints, journal articles, and conference
proceedings. The thesis and informal writings are outside this collection.
Distinct conference and journal versions remain separate entries.
Titles, author order, venues, years, and annotations follow that page;
arXiv abstract links are normalized and paired with their PDF URLs.
Other paper, slides, and code links are retained when listed.
No new thumbnails were created or downloaded.

New BibTeX records are assembled from the listed metadata, not publisher
exports. Unlisted DOIs and page ranges are omitted. Journal volumes and
numbers are retained when provided. “Learning Robust Hybrid Control Barrier
Functions for Uncertain Systems” has no venue or year listed on the source
page, so it is represented as a 2021 arXiv preprint without an inferred venue.
Source years are preserved, including the 2025 journal entry for “Safely
learning dynamical systems” and the 2014 VLDB entry for “Anti-Caching.”

For `2025_cdc_latent_representation`, the title and author order were checked
against https://arxiv.org/abs/2505.23210. The site owner supplied CDC 2025 as
the venue. The conference citation was assembled from those details, rather
than copied from the current arXiv export (which cites the 2026 revision).
Publisher DOI and page numbers have not been verified and are omitted.
