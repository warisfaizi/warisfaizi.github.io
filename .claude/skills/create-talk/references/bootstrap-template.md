# Bootstrapping the template deck

Run this when `talks/templates/` does not exist (step 0 of the workflow). The
output is a real, viewable reveal.js deck that doubles as the format catalog:
every later talk is a copy of it, so it is worth building deliberately once.

Do this **with** the user, not for them — the template encodes their visual
identity and the formats they actually present with. Two decisions need their
input before you write files; everything else you can infer from the site.

## 1. Confirm the two decisions

Use AskUserQuestion:

- **Visual identity** — default to inheriting the site: read `css/style.css` at
  the repo root and reuse its CSS variables (background, ink, accent, hover) and
  its Google Font. Offer "match the site" vs. "different palette for slides" and
  take their colors if they pick the latter.
- **Format catalog** — which slide formats they need. Propose the nine below as
  the default set (it covers most academic talks) and let them trim or add. A
  smaller catalog is fine; formats are cheap to add later, and an unused format
  is dead weight in every copied deck.

## 2. Scaffold the directory

```
talks/templates/
  index.html          one <section> per format, filled with {{PLACEHOLDER}} sentinels
  css/theme.css       palette + typography tokens only (mirrors css/style.css)
  css/base.css        reveal chrome + slide-canvas sizing tokens
  css/components.css  the slide formats, one commented block each
  js/main.js          reveal config
  assets/             placeholder SVGs (figure, paper page, portrait)
  README.md           the format catalog table + conventions
```

reveal.js 5.1 comes from CDN — no build step, no package manager. Set a fixed
canvas in `js/main.js` (1280×760 works well), fade transitions, and linear
navigation.

Mark the template unlisted: `<meta name="robots" content="noindex">`, and do not
add it to `data/talks.json`.

## 3. Default format catalog

| # | Format | Class | Use for |
|---|--------|-------|---------|
| 1 | Title | `title-slide` | Title, author/affiliation, venue byline |
| 2 | Checkpoint | `checkpoint` | Section dividers, motivating questions, takeaways — one big centered line |
| 3 | Bullets | `h3` + `ul` in `slide-body top` | Short lists; used sparingly |
| 4 | Figure | `figure-slide` | One figure under a headline that states the finding; variants for caption below, caption beside (`split` / `split flip`), source attribution |
| 5 | Table | `booktabs` | Top/mid/bottom-rule tables, numeric/muted/percent cell modifiers |
| 6 | Quote | `quote-slide` | Pull-quotes with attribution; `with-image` variant |
| 7 | Paper card | `paper-card` | Anchoring the talk to a paper, or citing others' work |
| 8 | Numbered cards | `card-list` | Study-design steps, RQs, caveats; `grid` variant for compact 3-up |
| 9 | Thanks | `thanks-slide` | Closing slide: headline + contact links |

Plus persistent chrome: a bottom-right site-credit link, and an optional
top-right QR code (commented out by default).

## 4. Conventions to bake in

These are what keep every derived deck consistent — write them into
`README.md` and into comments in the CSS:

- **Never use vh/vw inside slides.** reveal scales a fixed canvas; viewport
  units fight that scaling and break at other window sizes. Put this in the
  `base.css` header comment.
- The figure headline sits in the same spot on every variant — images shrink to
  fit the body so the headline never moves between slides.
- Vertical sub-slides group one topic's build-up; horizontal moves between
  topics.
- `fragment fade-in` for step-through reveals; every bullet on a list slide
  gets one.
- `<em>` renders in the accent color (one phrase per slide); `<strong>` is bold
  dark ink.
- Colors and fonts change in `theme.css` only.
- A layout that doesn't exist yet goes in the *talk's* `components.css`, with a
  note that it's a candidate to upstream here.

## 5. Verify before continuing

Serve the site (the `preview-site` skill does this), have the user open
`/talks/templates/`, and flip through every slide. Fix what looks wrong now —
from here on, every talk inherits it. Then return to step 1 of the main workflow
and build the requested deck.
