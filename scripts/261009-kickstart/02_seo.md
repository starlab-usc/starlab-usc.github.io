# SEO for StarLab

Planning note, 2026-10-20. This assessment is based on the repository source; live indexing, search rankings, and performance have not been checked. The items below are proposed work.

## 1. Current baseline

Astro produces static HTML, and the publications page exposes paper titles, authors, venues, and resource links in ordinary HTML. This is a useful foundation for search engines.

The largest gap is the homepage: `src/pages/index.astro` currently renders only the shared layout. It needs substantive text explaining the lab, its affiliation, and its research.

| Area | Current source | Recommended change |
|---|---|---|
| Homepage content | Shared header with no introductory body content | Add the full lab name, USC affiliation, faculty lead, research overview, and links to people and selected publications. |
| Page titles | Homepage title is `StarLab`; other pages use `<page> \| StarLab` | Include USC in the site identity and give each page a descriptive title. |
| Descriptions | Every page uses `StarLab` | Write a distinct description for each page. |
| Canonical URLs | No canonical link in the shared layout | Generate an absolute canonical URL for each page from the production site URL. |
| Crawl discovery | No sitemap integration or robots.txt in the source | Generate a sitemap and reference it from robots.txt. |
| Sharing previews | No Open Graph or Twitter card metadata | Add page titles, descriptions, URLs, and a suitable preview image. |
| Organization identity | No structured data | Add factual `ResearchOrganization` JSON-LD with the lab name, URL, and USC affiliation. |

## 2. First implementation pass

1. **Write the homepage.** State what the lab studies in a short, readable introduction. Include a meaningful H1, the expanded name “Statistical Techniques for Autonomous Reasoning,” University of Southern California, and confirmed research areas. Link to People, Publications, and any substantive project pages. Use terminology researchers and prospective students would search for naturally.
2. **Extend `SiteLayout.astro`.** Accept page-specific SEO titles and descriptions independently of the visible heading. Add canonical URLs and sharing metadata. A proposed homepage title is `StarLab at USC — Statistical Techniques for Autonomous Reasoning`. Descriptions should summarize visible page content; Google may choose a different search snippet.
3. **Generate the sitemap.** Add `@astrojs/sitemap` to `astro.config.mjs`; the production `site` is already set to `https://starlab-usc.github.io`. Add `public/robots.txt` pointing to the generated sitemap index. Verify the output path after building. A sitemap helps discovery but does not guarantee indexing.
4. **Describe the organization.** Add JSON-LD using confirmed public facts and official profile links. Keep the structured data consistent with visible content. It does not guarantee a rich search result.
5. **Validate the output.** Run `npm run check` and `npm run build`. Inspect generated HTML for unique titles and descriptions, absolute canonical URLs, valid structured data, and readable content without JavaScript. Check the generated sitemap and robots.txt.

Keep the implementation in the existing shared layout and content structure. An SEO service or CMS is not needed for this pass.

## 3. Deployment and discovery

- Verify `https://starlab-usc.github.io/` as a URL-prefix property in Google Search Console using an available ownership-verification method. A DNS-based property for `github.io` is not appropriate because the lab does not control that domain.
- Submit the generated sitemap, inspect the homepage URL, and request indexing after substantive updates. Confirm that public pages return successful responses and do not contain accidental `noindex` directives or crawl blocks.
- Obtain relevant links from the faculty's official USC profile, department directory, members' websites, and project repositories. Keep the lab name and destination URL consistent.
- If a custom domain is adopted later, follow the [USC domain checklist](04_usc_domain.md), update canonicals, the sitemap, sharing URLs, and Search Console configuration, and verify redirects from the previous address.

## 4. Research and paper discovery

Create dedicated pages for selected projects when there is useful content to publish. Each page should have a stable URL, exact paper title, authors, publication details, a readable abstract or research summary, a figure, and paper/code links. Link to these pages from the publications list and relevant homepage content.

For scholarly indexing, individual paper pages can include `citation_title`, repeated `citation_author`, publication date, and `citation_pdf_url` metadata that accurately describe the paper. Review [Google Scholar's inclusion guidelines](https://scholar.google.com/intl/en/scholar/inclusion.html) before implementation; metadata alone does not guarantee inclusion. Do not attach metadata for multiple papers to the publications listing as though it described one article.

Maintain existing paper and project URLs when titles or presentation change. Add redirects when a URL must move.

## 5. Performance and measurement

Measure the deployed site with PageSpeed Insights, especially on mobile. The shared layout currently hydrates the interactive React/Three.js logo with `client:load` on every page. Check its network and main-thread cost before choosing whether to defer initialization. Preserve the static SVG fallback and keep essential content in HTML.

Monitor Search Console for:

- Whether intended public pages are indexed.
- Impressions and clicks for the lab name, faculty name, paper titles, and relevant research topics.
- Unexpected canonical selections, missing pages, and crawl errors.

Evaluate trends over several weeks after deployment rather than expecting immediate ranking changes. Use the results to improve missing or unclear content. Keyword stuffing, meta-keyword tags, and purchased backlinks are not part of this plan.

**Recommended order:** homepage content → shared metadata and crawl discovery → deployment and Search Console → authoritative links → substantive project pages.
