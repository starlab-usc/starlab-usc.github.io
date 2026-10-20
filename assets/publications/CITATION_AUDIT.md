# Publication Citation Audit

Checked all 18 current entries on 2026-10-19. Titles and ordered author lists
were compared with the linked paper records. Published citations use publisher
metadata where available; IEEE metadata was checked through the publisher's
Crossref deposits. Only verified page ranges, volumes, issue numbers, and DOIs
were added. Existing citation keys and asset directory names are preserved.

## 1. Sources and Results

| Paper | Verification source | Result |
| --- | --- | --- |
| Sharp Rates in Dependent Learning Theory | [PMLR citation](https://proceedings.mlr.press/v235/ziemann24a.html) | Title, authors, and 2024 year match. Added full proceedings title, volume 235, pages 62779–62802, series, publisher, and publication URL. |
| Learning from many trajectories | [JMLR citation](https://jmlr.org/papers/v25/23-1145.bib) | Title, authors, year, volume 25, and article number 216 match. Added pages 1–109 and journal URL. |
| Learning Robust Output Control Barrier Functions | [IEEE Crossref deposit](https://api.crossref.org/works/10.1109/OJCSYS.2024.3385348) | Title and authors match apart from capitalization of “from.” Confirmed volume 3 and 2024; added pages 158–172 and DOI. |
| Revisiting Energy Based Models as Policies | [Indexed journal PDF](https://openreview.net/pdf?id=JmKAYb7I00), [arXiv](https://arxiv.org/abs/2309.05803) | Title and authors match; the indexed PDF identifies TMLR, September 2024. Changed the citation URL to the journal's OpenReview record. Direct OpenReview access returned a browser challenge during this audit. |
| Maestro | [arXiv](https://arxiv.org/abs/2511.06134) | Title, all six authors, identifier, and initial 2025 year match. Retained as a preprint. |
| Nearly Instance-Optimal Parameter Recovery | [arXiv](https://arxiv.org/abs/2510.06434) | Title, all five authors, identifier, and initial 2025 year match. Retained as a preprint. |
| Data-Driven Reachability | [IEEE Crossref deposit](https://api.crossref.org/works/10.1109/CDC57313.2025.11312065) | Title, authors, and CDC 2025 match. Added conference edition, publisher, pages 3925–3931, and DOI. |
| Incremental Composition of Learned Control Barrier Functions | [IEEE Crossref deposit](https://api.crossref.org/works/10.1109/CDC57313.2025.11312655) | Title, authors, and CDC 2025 match. Added conference edition, publisher, pages 5967–5972, and DOI. |
| Latent Representations for Control Design | [IEEE Crossref deposit](https://api.crossref.org/works/10.1109/CDC57313.2025.11312739) | Confirmed the four authors and CDC 2025 publication independently of the expanded arXiv version. Added conference edition, publisher, pages 2937–2944, and DOI. |
| Safely Learning Dynamical Systems | [Springer article](https://link.springer.com/article/10.1007/s10208-025-09689-8), [Crossref deposit](https://api.crossref.org/works/10.1007/s10208-025-09689-8) | Corrected year to 2026 for volume 26, issue 2; online-first publication was February 4, 2025. Added pages 999–1068 and DOI; synchronized display title and year. |
| Shallow diffusion networks provably learn hidden low-dimensional structure | [ICLR proceedings](https://proceedings.iclr.cc/paper_files/paper/2025/hash/837b396039248acb08c385bebb6291b4-Abstract-Conference.html), [arXiv](https://arxiv.org/abs/2410.11275) | Replaced the earlier “Single hidden layer…” title with the current proceedings title in both files. Added pages 52889–52923 and proceedings URL. Retained Nicholas M. Boffi's full name as listed on arXiv. |
| Integration Matters for Learning PDEs with Backward SDEs | [NeurIPS proceedings](https://proceedings.neurips.cc/paper_files/paper/2025/hash/4aab410455f9aab47c4e312dd855ee3a-Abstract-Conference.html) | Corrected “Backwards” to “Backward” in both files. BibTeX uses the proceedings title, Advances in Neural Information Processing Systems, volume 38, pages 52041–52087, publisher, and DOI. Kept 2025 as specified by the official BibTeX, despite the proceedings page's later posting date. |
| CLT-Optimal Parameter Error Bounds | [CDC 2026 program](https://css.paperplaza.net/conferences/conferences/CDC26/program/CDC26_ContentListWeb_5.html), [arXiv](https://arxiv.org/abs/2604.21270) | Title, authors, and acceptance match. Publication-status note removed at user request; no unverified DOI or page range added. |
| Forward Trajectory Steering | [CDC 2026 program](https://css.paperplaza.net/conferences/conferences/CDC26/program/CDC26_ContentListWeb_4.html), [arXiv](https://arxiv.org/abs/2608.11480) | Title, authors, and acceptance match. Publication-status note removed at user request; no unverified DOI or page range added. |
| On the Asymptotics of Self-Supervised Pre-training | [PMLR citation](https://proceedings.mlr.press/v336/tinati26a.html) | Title, authors, and 2026 year match. Added full proceedings title, volume 336, pages 6197–6309, series, publisher, and publication URL. |
| CrispEdit | [PMLR citation](https://proceedings.mlr.press/v306/ikram26a.html) | Title, authors, and ICML 2026 match. Added full proceedings title, volume 306, pages 49502–49525, series, publisher, and publication URL. |
| CLAM | [arXiv](https://arxiv.org/abs/2505.04999), [authors' project](https://clamrobot.github.io/), [author publication list](https://stephentu.github.io/) | Added missing author Jingzhen Wang and Matthew M. Hong's middle initial in both files. Used BibTeX-safe dotless-i commands for Erdem Bıyık. arXiv's journal reference identifies IROS 2026. Publication-status note removed at user request; equal-advising credit retained. No final publisher pagination or DOI verified. |
| Robometer | [RSS proceedings citation](https://www.roboticsproceedings.org/rss22/p140.html) | All 17 authors, title, and 2026 year match. Added the full proceedings title, location, DOI, and publication URL. |

## 2. Verification Limits

The two CDC 2026 papers and CLAM retain provisional proceedings citations:
acceptance or venue information is supported, but final publisher citation
details were not verified. The two preprints retain arXiv citations, consistent
with the author's publication list. Publication status should be rechecked
when these records are next updated.

Display annotations such as spotlight and equal advising are retained from the
author-maintained sources; they are not required publisher citation fields.

## 3. Local Validation

All 18 entries compiled together with BibTeX 0.99e and `plain.bst` without
warnings or errors. Citation keys are unique and unchanged. Display titles,
ordered author lists, and years match the BibTeX records. The Astro production
build and `git diff --check` passed. The build still reports a JavaScript chunk
larger than 500 kB; that warning is unrelated to citation data.
