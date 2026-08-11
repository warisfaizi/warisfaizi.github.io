# Data File Schemas

Schemas and examples for every file under `data/`. Optional fields are marked; each file is
rendered by the matching `js/*.js` module. See `CLAUDE.md` for which page shows which section.

> **Note:** The live `data/*.json` files and `js/*.js` renderers are the ground truth. When they
> diverge from this file, follow the code and update this file to match.

## data/profile.json — name, bio, links, contact

Object. Rendered by `js/profile.js` into the home hero, the About/Biography blocks, the research
interest chips, and the contact page. Also fills the nav brand and footer on every page.

```json
{
  "name": "Waris Ahmad Faizi",
  "displayName": "Waris Faizi",
  "title": "Ph.D. Student in Sociology",
  "affiliation": "Department of Sociology, Virginia Tech",
  "tagline": "Economic Sociology · Digital Sociology · …",
  "photoPath": "./assets/images/headshot.jpg",
  "photoFallback": "./assets/images/headshot.svg",
  "bio": ["First paragraph.", "Second paragraph."],
  "interests": ["Economic Sociology", "Digital Sociology"],
  "contact": {
    "email": "warisahmad@vt.edu",
    "office": "555 McBryde Hall",
    "address": "225 Stanger Street, Blacksburg, VA 24061"
  },
  "links": [
    { "label": "Google Scholar", "icon": "scholar", "url": "https://scholar.google.com/..." },
    { "label": "C.V.", "icon": "cv", "url": "./docs/cv.pdf" }
  ]
}
```

- `bio` is an array of paragraphs; `interests` renders as chips.
- `links[].icon` selects an inline SVG from `Site.ICONS` in `js/utils.js`:
  `scholar`, `linkedin`, `github`, `university`, `email`, `cv`. Unknown names fall back to
  `university`. The `cv` icon renders as a labelled pill rather than a circle.
- Optional: `displayName` (the big name in the home hero; falls back to `name`, which is what the
  nav brand and footer always use), `tagline`, `photoPath`, `photoFallback` (shown if `photoPath`
  404s), `interests`, `contact`.

## data/publications.json — published work

Array, newest first. Rendered by `js/publications.js` (via `Site.paperCard`).

```json
{
  "title": "The Future of the CASA-1000 Electric Megaproject…",
  "authors": "Waris Ahmad Faizi",
  "publication": "Central Asia Program, George Washington University",
  "year": "2021",
  "url": "https://doi.org/10.0000/example",
  "pdfPath": "./docs/publications/2021_Faizi_CASA1000/2021_Faizi_CASA1000.pdf",
  "bibPath": "./docs/publications/2021_Faizi_CASA1000/cite.bib"
}
```

- `year` is a string and renders in the left-hand column.
- Optional: `pdfPath`, `bibPath` (links only render when present). `url` adds a "Link" item.
- The site owner's name is emphasized automatically (`Site.SELF`).

## data/working_papers.json — manuscripts under review

Array, newest first. Rendered by `js/working_papers.js` (same card as publications).

```json
{
  "title": "Mapping Workforce Reskilling Urgency in the Age of AI…",
  "authors": "Waris Ahmad Faizi, Dayoung Kim, Can Dogan",
  "publication": "Telematics and Informatics (Revise and Resubmit)",
  "year": "2026",
  "id": "modal_faizi_reskilling"
}
```

- `publication` carries the review status, e.g. `"Sociology Compass (Under Review)"`.
- `id` is a unique identifier: `modal_[lastname]_[keyword]`.
- Optional: `url`, `pdfPath`, `bibPath`.

## data/ongoing_projects.json — works in progress

Array. Rendered by `js/ongoing_projects.js`.

```json
{
  "title": "The Moral Economies of Influencer Culture…",
  "authors": "Waris Ahmad Faizi",
  "description": "One sentence on what the project asks."
}
```

- Optional: `authors`, `description`.

## data/cv.json — the C.V. page

Object with a `pdf` path and an ordered array of `sections`. Rendered by `js/cv.js`.

```json
{
  "pdf": "./docs/cv.pdf",
  "sections": [
    {
      "heading": "Education",
      "type": "timeline",
      "items": [
        { "period": "2024 – present", "title": "Ph.D., Sociology", "org": "Virginia Tech",
          "bullets": ["optional sub-items"] }
      ]
    },
    { "heading": "Statistical Software", "type": "tags", "items": ["R", "Python"] },
    { "heading": "Training", "type": "list",
      "items": [{ "period": "2026", "text": "Causal Inference, Columbia University" }] }
  ]
}
```

- `type` is one of:
  - `timeline` — items `{ period, title, org?, bullets?[] }`; two-column period/content rows.
  - `list` — items `{ period, text }`; `text` may contain HTML entities (e.g. `&amp;`).
  - `tags` — items are plain strings, rendered as chips.
- Section `heading`s become anchor ids (slugified), so they can be linked to directly.

## data/news.json — news items

Array of year groups, newest year first; items within a year newest first. Rendered by `js/news.js`.

```json
{
  "year": "2026",
  "items": [
    { "type": "Award", "htmltext": "Named a <strong>Dean's Graduate Scholar</strong>…" }
  ]
}
```

- `type` is one of: `Publication`, `Preprint`, `Talk`, `Award`, `Media`, `Tool`, `General`.
- `htmltext` conventions: single-quoted HTML attributes; links as `<a href='URL' target='_blank'>`;
  `<em>` for venues; `<code>` for software names. 1–2 sentences, professional tone.

## data/talks.json — talks and presentations

Array, newest first. Rendered by `js/talks.js`.

```json
{
  "title": "Social Capital and the Geography of Opportunity…",
  "location": "Southern Sociological Society 2026 Annual Meeting, Jacksonville, FL",
  "date": "April 8–11, 2026"
}
```

- `date` renders in the left column; a bare year works too.
- Optional: `link` (title renders as plain text without it).

## data/teaching.json — courses and teaching appointments

Array, newest first. Rendered by `js/teaching.js`, which groups consecutive entries by `group`
in the order the groups first appear.

```json
{
  "group": "Virginia Tech",
  "code": "SOC 1004",
  "title": "Introductory Sociology",
  "role": "Graduate Teaching Assistant",
  "institution": "Department of Sociology",
  "term": "2024 – present"
}
```

- Optional: `group` (ungrouped entries render with no subheading), `code`, `description`.

## data/software.json — software and tools

Array, rendered by `js/software.js`. Currently empty (`[]`) and not included on any page; to bring
it back, add a `<section>` with a `software-container` and the script tag to a page.

## docs/ conventions

- `docs/cv.pdf` — the downloadable C.V. linked from `data/cv.json` and `data/profile.json`.
- Each paper has a directory under `docs/publications/` containing its PDF and a `cite.bib`:
  - **Working papers (unpublished):** `0_LastName_ShortTitle/`
  - **Published papers:** `YYYY_LastName_ShortTitle/`
  - `ShortTitle` = first 2–3 significant title words, no spaces.
