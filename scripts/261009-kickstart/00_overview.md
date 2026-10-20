

| Site | Visual style | What I’d borrow for STARLab |
|---|---|---|
| **[Princeton Robot Planning & Learning (PRPL)](https://prpl-group.com/)** | Warm off-white background, large serif headings, purple accents, playful mascot, lab-photo collage. | **Best overall reference.** Strong personality while still feeling academic. The short introduction, compact news list, and people section would suit a new lab well. |
| **[Stanford Causal AI Lab](https://scail.stanford.edu/)** | Oversized typography, deep red opening section, restrained gold accents, illustrated research topics. | **Best fit for a theory-oriented lab.** Separates applications from foundations and lets visitors browse publications by year or theme. Its palette also offers a useful starting point for USC colors. |
| **[MIT Improbable AI](https://improbableai.com/)** | Dark background, subtle grid, oversized translucent logo, large clean typography. | **Best bold visual identity.** A memorable STAR symbol could anchor the opening section, with direct links to People, Research, and Publications. |
| **[Princeton Intelligent Robot Motion Lab](https://irom-lab.princeton.edu/)** | Large robot-video banner, bold white headline, warm red accents, clear navigation. | **Best for showcasing experiments.** Useful if you have compelling demonstrations; the concise mission statement and prominent research links work especially well. |
| **[Stanford Physical and Spatial Intelligence Lab](https://psai.stanford.edu/)** | Quiet off-white layout, small geometric logo, minimal navigation, large research illustrations. | **Best understated option.** Shows how diagrams can communicate research areas and provide visual interest without a video-heavy homepage. |


## Preferred lab-logo direction: interactive 3D hover tilt

Preference recorded on 2026-10-19: **[Interactive 3D Logo — Component for Framer](https://www.framer.com/marketplace/components/interactive-3d-logo/)** is the preferred format for STARLab's logo. Click **Show Preview** on the component page to explore it.

The component turns an SVG into an extruded, beveled 3D logo with cursor-driven hover rotation and metallic/glass material options. The preference is for the visual and interaction design; implementation tooling remains open.

### Proposed adaptation for STARLab

- Give the lab logo visible depth and restrained highlights.
- Apply a slight 3D tilt as the mouse moves over the logo, with the same tangible feel as the hanging profile badges below.
- Gently return to the resting pose when the mouse leaves; keep continuous auto-rotation off.
- Provide a static resting pose for reduced-motion preferences and devices without hover.

## Preferred members-page direction: hanging profile badges

Preference recorded on 2026-10-19: **Hanging Team** and **Hologram Lanyards** are the preferred visual references for STARLab's team/members page.

| Reference | What to borrow |
|---|---|
| **[Hanging Team — live demo](https://diverse-unicorn-464220.framer.app/)** · [Component details](https://www.framer.com/marketplace/components/hanging-team/) | A row of member cards suspended from a shared wire, with portraits, names, roles, subtle swinging motion, and front-to-back profile reveals. Use as the primary layout reference. |
| **[Hologram Lanyards — live demo](https://yuzuyyy.framer.website/hologram-cards)** · [Component details](https://www.framer.com/marketplace/components/hologram-lanyards/) | The same hanging-card concept with photographic portraits, restrained styling, and holographic highlights. Useful for imagining actual lab headshots and expanded member information. |

These are Framer component demos, not verified examples of deployed lab/company member directories. Their use of the same Three.js/Rapier implementation as Vercel has not been verified; the preference is for the visual and interaction design, not a commitment to Framer or a particular library.

### Proposed adaptation for STARLab

- Keep each member's portrait, name, and role readable while the badge is at rest.
- Add gentle swing/tilt on interaction; use restrained highlights that fit the lab's visual identity.
- Provide a click/tap profile reveal for research interests, Scholar, website, GitHub, and optional affiliations. The reveal could be a card flip or a normal profile panel; this remains an implementation choice.
- Keep profile links easy to activate independently of dragging. Support keyboard navigation, reduced motion, and a readable static/mobile layout.
- Include only member-approved public information, including any email address.

For a more physically manipulable version, retain [Vercel's interactive 3D event badge tutorial](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber) as a technical reference: React Three Fiber, Drei, and Rapier. Full rope physics is optional; it is not required to reproduce the preferred team-page layout.
