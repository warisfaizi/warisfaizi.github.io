# Slide format catalog

The canonical markup for every format lives in `talks/templates/index.html` — each format is a `<section>` with an HTML comment header documenting its classes and variants. Copy sections from there; this file explains **which format to choose** and the composition conventions. `talks/templates/README.md` has the same catalog table for humans.

## Choosing a format

| If the slide's job is... | Use | Notes |
|---|---|---|
| Open the talk | **1 — Title** (`title-slide`) | Long paper titles: `h3` instead of `h2`; add a co-author block under the author line when the talk covers joint work |
| Pose a question, divide sections, state a takeaway | **2 — Checkpoint** (`checkpoint`) | The workhorse between-content slide: one big centered line. Default to the question/statement alone; a `followup-questions` list is styled if supporting lines are truly needed |
| Enumerate a few short items | **3 — Bullets** | Use sparingly — if the items have structure (numbers, sub-lines), prefer Numbered cards. **Every `<li>` gets `fragment fade-in`** — see the bullet-build rule below |
| Show one figure | **4 — Figure** (`figure-slide`) | One format, markup always `h3` → `slide-body` → `fig-frame` [→ `fig-caption`]. The headline states *the finding*, not the figure name ("Curated context helps a lot", not "Figure 2"). Variants: figure only; full-width caption below; `split` (caption left of figure); `split flip` (figure left, caption right). Images shrink to fit the body — never resize the body to fit an image |
| Show results step-by-step | **4 — Figure build-up** | Vertical sub-sections, one per step, same figure progressively extended; headline text changes to narrate |
| Present tabular data | **5 — Table** (`booktabs`) | `grouped` variant for grouped rows with merged left cells and capability check columns |
| Quote someone | **6 — Quote** (`quote-slide`) | `with-image` puts a portrait/cover/first-page beside it (`grayscale` class for the archival look) |
| Anchor the talk to a paper (yours or others') | **7 — Paper card** (`paper-card`) | First-page screenshot + title/authors/venue/DOI; lead author gets `lead-author` |
| Study design, research questions, caveats | **8 — Numbered cards** (`card-list`) | Number + headline + sub-line, accent rule below each card. Stacked rows by default; A/B `card-conditions` boxes inside a card; `grid` variant for compact 3-up sets |
| Close | **9 — Thanks** (`thanks-slide`) | Keep the tagged contact links current |

## Composition conventions

- **Headline slides share one skeleton:** `h3` (or `h4`) followed by a `<div class="slide-body">` holding the content. The slide-body's fixed height keeps every headline at the same vertical position deck-wide (PowerPoint-style); content centers vertically in the remaining space, and figures scale down to fit it. Exceptions: list slides use `slide-body top` so the bullets hug the headline, and the caveat `card-list grid` centers horizontally while other tables/cards left-align under the headline.
- **Structure:** horizontal slides move between topics; vertical sub-slides (`<section>` nested in `<section>`) carry one topic's build-up. Navigation is linear (`navigationMode: 'linear'`), so the audience experiences one sequence either way — nesting is for organization.
- **Typical arc** (research talk): title → motivating checkpoint → background figures/quotes → paper card → research questions (numbered cards) → study design (numbered cards) → results (checkpoint per result + figure build-ups) → takeaway checkpoints → caveats (card grid) → thanks. Appendix figures go in a final vertical stack after the thanks slide.
- **Emphasis:** `<em>` renders in the accent color — reserve it for the one phrase per slide that matters. `<strong>` is bold dark ink. A slide where everything is emphasized emphasizes nothing.
- **Bullet lists always build.** On a list slide (format 3), give *every* `<li>` `class="fragment fade-in"` — including the first and any nested sub-items — so points land one at a time and the audience can't read ahead of the speaker. A static wall of bullets is never the right default.
  - When a list ends with an `hr-half` set-off item, the rule must not cost its own click: give the `<hr>` and the `<li>` that follows it the *same* `data-fragment-index`, so they appear together. Numbering one index per item from `0` is the simplest way to do this.
  - Exceptions — leave these unfragmented: `followup-questions` under a checkpoint (they're part of the one statement), and `thanks-links` on the closing slide.
- **Fragments elsewhere:** `class="fragment fade-in"` steps any element in. Use on follow-up lines, second-and-later cards, and condition boxes — not on everything.
- **Slide budget:** ~1 slide or build-up step per minute. A 12-minute conference talk is ~12–15 sections; a 45-minute seminar can afford background and appendix depth.
- **Chrome:** keep the `site-credit` div. Enable `site-qr` only when there's a paper link worth scanning.
- **HTML entities:** the existing decks use `&mdash;`, `&ldquo;`/`&rdquo;`, `&middot;`, `&bullet;` rather than raw characters — match that.
