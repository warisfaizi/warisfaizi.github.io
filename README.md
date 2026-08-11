# warisfaizi.github.io

Personal academic website of **Waris Ahmad Faizi** — Ph.D. student in Sociology, Virginia Tech.
Live at [warisfaizi.github.io](https://warisfaizi.github.io).

Vanilla HTML/CSS/JS, no build step, no framework. All content lives in `data/*.json` and is
rendered client-side, so updating the site means editing a JSON file (or asking
[Claude Code](https://claude.com/claude-code) to do it).

## Structure

```
index.html         # home: hero, about, news
research.html      # publications, manuscripts under review, works in progress
cv.html            # biography + full C.V.
talks.html         # conference presentations
teaching.html      # courses
contact.html       # contact details
css/styles.css     # the whole design system
js/                # chrome.js (nav/footer) + one renderer per section + utils.js
data/              # all site content, one JSON file per section
docs/cv.pdf        # downloadable C.V.
assets/images/     # headshot + favicon
```

## Updating content

| To change… | Edit… |
| --- | --- |
| Name, bio, links, contact, research interests | `data/profile.json` |
| Published papers | `data/publications.json` |
| Papers under review | `data/working_papers.json` |
| Works in progress | `data/ongoing_projects.json` |
| Education, appointments, awards, training | `data/cv.json` |
| News items on the home page | `data/news.json` |
| Conference presentations | `data/talks.json` |
| Courses | `data/teaching.json` |
| Nav items | the `SiteNav` array in `js/chrome.js` |

Field-by-field schemas are in
[`.claude/skills/update-site-data/references/schemas.md`](.claude/skills/update-site-data/references/schemas.md).
After editing a data file, validate it:

```bash
python3 -m json.tool data/publications.json
```

Inside Claude Code, `/update-site-data` does all of this conversationally — paste a DOI, an arXiv
link, or "add a news item about X".

## Replacing the headshot

Save the photo as `assets/images/headshot.jpg` (square crops look best). If that file is missing,
the site automatically falls back to the placeholder illustration `assets/images/headshot.svg`.

## Updating the C.V. PDF

Replace `docs/cv.pdf`. The download button on the C.V. page and the C.V. link in the header row
both point at it.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`. Opening the HTML files directly via `file://` will not work —
the pages fetch their JSON over HTTP.

## Deploy

Push to `main`; GitHub Pages serves the repository root at `https://warisfaizi.github.io`.

---

Built from the [academic website template](https://github.com/mr-devs/academic-website-template)
by Matthew DeVerna, restyled after [chrisbail.net](https://www.chrisbail.net/).
