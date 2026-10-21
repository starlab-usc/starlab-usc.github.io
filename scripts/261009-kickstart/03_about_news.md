# About + News: content proposal for StarLab

Draft for discussion · October 21, 2026

## Recommended direction

Keep **About and News together on the homepage**, under the existing About navigation item. Open with a concise introduction that explains who we are and what connects our research, then show a dated list of recent activity. People and Publications already have their own pages; the homepage should help visitors understand the group and decide where to explore next.

The central message I would propose is **statistical foundations and algorithms for learning and autonomous decision-making**. This accommodates the lab's work in learning theory, generative modeling, control, and robotics without making the introduction a list of individual projects.

Start with three main sections:

1. **About:** roughly 120–180 words, including a short research overview and links to People and Publications.
2. **News:** the latest 5–8 announcements, newest first, with older entries available below on the same page.
3. **Prospective Students:** a short introduction for students interested in the group, followed by confirmed application and contact instructions.

A group photo would add warmth, but the page can launch with text alone. The existing interactive logo already provides a distinctive visual element.

## What to borrow from other labs

These are content references from established academic groups, not a ranking or a claim that their websites have measured higher engagement. Pages reviewed on October 21, 2026.

| Reference | What the page does | Adaptation for StarLab |
|---|---|---|
| [Princeton Robot Planning & Learning (PRPL)](https://prpl-group.com/) | Opens with a one-sentence mission, includes a group collage, and follows with dated news. Many announcements name the researchers who led the work. | **Closest reference for the combined page.** Use a short introduction and compact news entries; give students visible credit. |
| [Princeton Intelligent Robot Motion Lab (iRoM)](https://irom-lab.princeton.edu/) | Puts a concise research goal and links to Research, Publications, People, and Join Us before a News section with a “Show more news” control. | Make the main research direction immediately legible. Keep recent news visible and older entries expandable. |
| [Berkeley Robotic AI & Learning Lab (RAIL)](https://rail.eecs.berkeley.edu/) | Explains its research through a broad capability it wants machines to acquire, then identifies the fields used to pursue it. | Lead with the scientific question or goal, then explain the methods. This is a useful model for the About paragraph rather than the news layout. |
| [Stanford ILIAD](https://iliad.stanford.edu/) | Connects a mission to both theoretical foundations and practical algorithms, alongside dated group photos. | Explain the relationship between theory and applications. A real group photo can convey lab identity without adding a long culture statement. |

My recommendation is **PRPL's introduction-and-news structure, with the explicit connection between theory and applications seen in ILIAD's description**. Use StarLab's own research scope and existing visual identity.

## Proposed About copy

The following is proposed public-facing wording, not an already approved lab mission statement.

### About StarLab

**Statistical foundations for learning and autonomous decision-making.**

We study **Statistics & Learning Theory▎**

StarLab—Statistical Techniques for Autonomous Reasoning—is a research group at the University of Southern California, led by [Stephen Tu](https://stephentu.github.io/) in the Department of Electrical and Computer Engineering.

We study how learning systems can use data to model the world and make reliable decisions. Our research connects statistical learning, generative modeling, and control, spanning mathematical foundations and algorithms for robotics and other autonomous systems.

Questions that motivate our work include: How much data is needed to learn a dynamical system? What makes a learned representation useful for control? How can robots learn useful behavior from demonstrations and feedback? Across these questions, we seek to understand both what an algorithm can do and the conditions under which it works.

**Meet the people behind the work →** `/people`  
**Explore our publications →** `/publications`

### Cycling research keywords

Place the **We study …** line directly below the About headline and above the introductory paragraph, as illustrated above. Keep “We study” fixed while the keyword phrase types, pauses, erases, and advances through this sequence:

1. Statistics & Learning Theory
2. Conformal Prediction
3. Control Theory
4. Physics-Informed Neural Networks
5. World Models
6. Robot Learning

Use a subtle cursor that blinks **twice over 2.2 seconds** on each completed phrase, then erase at **20 milliseconds per character** before typing the next. Repeat after Robot Learning. Reserve enough space for the longest phrase, including wrapping on mobile, so the introduction does not shift during the animation. Keep the shared StarLab header static; this animation belongs only to the homepage About section.

For reduced-motion preferences or when JavaScript is unavailable, show the full keyword list as static text without a blinking cursor. Screen readers should receive that stable list, with the animated text and cursor hidden from assistive technology; do not announce individual typing updates.

Use this line in place of the optional research-theme table, keeping the introductory paragraphs and motivating questions. The six keywords are the requested editorial scope; confirm their wording alongside the About copy before publication.

### Why this wording fits

The full lab name comes from the [current site header](../../src/layouts/SiteLayout.astro). Leadership is recorded in the [People content](../../src/pages/_people.md); the affiliation and broad research areas also agree with [Stephen Tu's public profile](https://stephentu.github.io/). The [publication collection](../../src/pages/_publications.md) includes learning from trajectories, generative models, representation learning, control guarantees, and robot learning.

The proposed umbrella and research questions are a synthesis of that material. They should be reviewed as positioning, rather than read as claims that every method provides reliability or safety guarantees. Keeping the opening broad also leaves room for the collection's work on language models.

## Proposed News section

Use the simple heading **News**. Each entry should have a month/year, one short sentence, and a relevant link. Aim for 20–40 words. Announcements should describe a specific event: a paper release or acceptance, a student milestone, a talk, an award, or a useful public resource.

The list can mix research and people news. It should feel like a record of the group's activity, rather than a second bibliography.

### Candidate entries from existing material

These are drafting examples, **not ready-to-publish dated announcements**. Paper titles and venue associations are present in the repository; announcement dates are not. Replace each date placeholder with the verified month of the event being announced, and link the title to the existing paper or project URL.

| Date to confirm | Candidate wording |
|---|---|
| `[Month YYYY]` | **CLAM at IROS 2026.** Anthony Liang, Pavel Czempin, Matthew Hong, Yutai Zhou, Erdem Bıyık, and Stephen Tu's work studies latent action models for robot learning from unlabeled demonstrations. |
| `[Month YYYY]` | **Robometer at RSS 2026.** New work with collaborators on scaling robotic reward models through trajectory comparisons. Read the paper. |
| `[Month YYYY]` | **Learning representations for control.** Paul Lutkus, Kaiyuan Wang, Lars Lindemann, and Stephen Tu's CDC 2025 paper studies latent representations with stability and safety guarantees. |

Use a publication's actual title in its link. Retain complete authorship and advising credit on the publication page; an abbreviated news sentence should not imply that a large collaboration was solely StarLab's work. Select the genuinely recent items for launch rather than filling the list with older papers.

### Templates for future announcements

- **People:** `[Month YYYY]` — Welcome **[Name]**, who joins StarLab as a **[role]** and will work on **[topic]**. Link to their profile.
- **Talk or tutorial:** `[Month YYYY]` — **[Name]** presented **[title]** at **[event]**. Link to the recording or slides, if public.
- **Award or milestone:** `[Month YYYY]` — Congratulations to **[Name]** on **[specific award, defense, or fellowship]**. Link to the announcement.
- **Resource release:** `[Month YYYY]` — We released **[code, dataset, or tutorial]** for **[purpose]**. Link directly to the resource.

Prefer concrete wording such as “accepted at,” “released,” or “presented,” according to the verified event. A preprint release and a conference acceptance are different announcements. A venue year alone does not establish an announcement month.

### News assets

Store news assets in `assets/news/`. Reference images and other media from this directory when adding announcements.

### Keeping News useful

Show the latest 5–8 entries and offer **Older news** below, grouped by year on the same page. If there are only three verified announcements, show three. Avoid an empty carousel, invented launch history, or placeholder news in the published page.

Update when there is something worth announcing; there is no need for an artificial weekly cadence. A short, accurate list is sufficient.

## Proposed Prospective Students section

Place this section after News on the homepage, with the heading **Prospective Students**. Keep it concise and link to official admissions information for requirements and deadlines.

### Proposed copy

Interested in statistical learning, generative modeling, control, or robot learning? Explore our recent publications and student projects to learn more about the questions we study and how they connect to your interests.

**Prospective PhD students:** consult USC's official graduate admissions information for current program requirements and application deadlines.

**Explore our research →** `/publications`  
**Meet the group →** `/people`

### Details to confirm before publication

Add the relevant PhD program name and official application link, along with Stephen Tu's preferred instructions for expressing interest in the group. Confirm whether prospective applicants should contact him before applying and what information, if any, to include. Add guidance for current USC master's and undergraduate students only once their research inquiry route is established.

State any recruiting cycle, available projects, or funding only when confirmed. The draft above describes research fit without announcing openings.

## Optional content and what to defer

| Idea | Recommendation |
|---|---|
| **Group photo with a short caption** | The most useful optional addition. Use an approved photo and an informative caption such as the occasion and year. |
| **Lab culture** | Add one concrete sentence if the group wants to describe an actual practice, such as shared reading groups. Avoid generic claims about excellence or collaboration. |
| **Featured demos or papers** | Defer until there is a strong visual example and a clear reason to highlight it. Publications already has its own page. |
| **Sponsors, statistics, and long lab history** | Defer. These add maintenance and factual commitments without being necessary to explain the lab. |

## First-version outline

```text
Existing StarLab header and navigation

About StarLab
  One-line research direction
  We study [cycling research keyword]
  Static keyword list for reduced motion, screen readers, and no JavaScript
  Who we are + research overview + motivating questions
  People / Publications links
  Optional group photo

News
  Recent dated announcements
  Older news, when needed

Prospective Students
  Research interests + People / Publications links
  Confirmed PhD application and contact instructions
```

Before implementation, settle the About wording, select the first verified announcements, confirm the prospective-student application and contact instructions, and decide whether a group photo is available. This proposal changes no website behavior and introduces no new navigation pages.
