# warisfaizi.github.io

The personal academic website of Waris Ahmad Faizi (Ph.D. student in Sociology, Virginia Tech).
JSON-driven, vanilla HTML/CSS/JS, no build step, deployed to GitHub Pages as-is.

## Architecture (the one rule that matters)

**Content lives in `data/*.json`, never in HTML.** Each section of each page is rendered
client-side by a matching `js/*.js` module via the `Site.load` helper in `js/utils.js`.
A section whose data file is missing, empty, or malformed hides itself silently.

### Pages

| Page | Sections | Data files |
| --- | --- | --- |
| `index.html` | Hero, About, News | `profile.json`, `news.json` |
| `research.html` | Publications, Manuscripts Under Review, Works in Progress | `publications.json`, `working_papers.json`, `ongoing_projects.json` |
| `cv.html` | Biography, full C.V. | `profile.json`, `cv.json` |
| `talks.html` | Conference presentations | `talks.json` |
| `teaching.html` | Courses (grouped) | `teaching.json` |
| `contact.html` | Contact details | `profile.json` |

Every page has the same skeleton: `<body data-page="…">`, an empty `<header class="site-header">`
and `<footer class="site-footer">` that `js/chrome.js` fills, then `js/utils.js` → `js/chrome.js`
→ `js/profile.js` → the page's own renderers. To add a nav item, edit the `SiteNav` array in
`js/chrome.js` (one place, all pages).

### Renderers

| Section | Data file | Renderer |
| --- | --- | --- |
| Hero / bio / interests / contact | `data/profile.json` | `js/profile.js` |
| News | `data/news.json` | `js/news.js` |
| Publications | `data/publications.json` | `js/publications.js` |
| Manuscripts under review | `data/working_papers.json` | `js/working_papers.js` |
| Works in progress | `data/ongoing_projects.json` | `js/ongoing_projects.js` |
| C.V. | `data/cv.json` | `js/cv.js` |
| Talks | `data/talks.json` | `js/talks.js` |
| Teaching | `data/teaching.json` | `js/teaching.js` |

`data/software.json` and `js/software.js` ship with the template but no page renders them;
add a section back if there is ever software to list.

Schemas are documented in `.claude/skills/update-site-data/references/schemas.md`. If you change
a schema or renderer, update that file in the same session.

## Design

- Palette: Virginia Tech Chicago Maroon `#861f41` (links, section titles) + Burnt Orange `#e5751f`
  (accent rules, eyebrows). Near-black text on white; a dark-mode variant inverts the same tokens.
- Type: system sans throughout. Uppercase, wide-tracked treatment for the name, nav, and section
  titles; regular sentence case for body copy.
- Layout: sticky top nav, generous whitespace, thin hairline rules, two-column grids
  (date/period on the left, content on the right) that collapse to one column at 640px.
- Reference: modeled on [chrisbail.net](https://www.chrisbail.net/).

## Conventions

- Entries in data files go newest-first; match each file's existing indentation.
- Local paths in data files use a `./` prefix (e.g., `./docs/publications/...`).
- Per-paper assets live in `docs/publications/0_LastName_ShortTitle/` (working papers) or
  `docs/publications/YYYY_LastName_ShortTitle/` (published), each with a `cite.bib` and the PDF.
- The C.V. PDF lives at `docs/cv.pdf`; the headshot at `assets/images/headshot.jpg`
  (`headshot.svg` is the fallback used automatically if the JPG is missing).
- Author lists render with "Waris Ahmad Faizi" emphasized — see `Site.SELF` in `js/utils.js`.
- After editing any `data/*.json`, validate it: `python3 -m json.tool data/<file>.json`.

## Skills

- `/setup-site` — design/build the site from reference URLs, screenshots, or design notes.
- `/update-site-data` — add/convert papers, news, talks, projects, teaching, or profile edits.
- `/preview-site` — validate data files, serve locally (`python3 -m http.server`), verify sections.

## Preview

`python3 -m http.server 8000` from the repo root, then open `http://127.0.0.1:8000/`.
Opening the HTML via `file://` will NOT work — `fetch` needs HTTP.
