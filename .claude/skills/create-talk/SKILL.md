---
name: create-talk
description: Scaffolds a new reveal.js talk deck under talks/ from the canonical template at talks/templates/, turning a paper (LaTeX/PDF), figures, or notes into styled slides. Use whenever the user wants to create a talk, presentation, slides, or deck — for a conference, workshop, seminar, job talk, or lecture — even if they don't mention reveal.js or the template.
argument-hint: [talk name / venue, plus paths to paper .tex/.pdf, figure dirs, notes]
---

# Create Talk

Build a new talk deck by copying `talks/templates/` and filling it with real content. If that template doesn't exist yet, build it with the user first (step 0). The template is a viewable reveal.js deck whose slide formats are the design system — the job is composition (which format carries which idea), not visual design.

## Input

$ARGUMENTS

## Workflow

### 0. Check that the template exists

Everything below assumes `talks/templates/` is present. Check first:

```bash
ls talks/templates/index.html
```

If it's missing, the template has to be built before any talk can be scaffolded. Say so, then follow [references/bootstrap-template.md](references/bootstrap-template.md) to develop it *with* the user — it inherits the site's palette and typography, and the format catalog is theirs to choose. Build and verify the template first, then come back to step 1 for the talk they actually asked for.

### 1. Gather inputs

Collect before outlining (use AskUserQuestion for anything important that's missing — these decisions shape the whole deck):

- **Venue, date, and talk title** — needed for the title slide and directory name.
- **Talk length and audience** — drives the slide budget (~1 slide or build-up step per minute) and how much background to include.
- **Source material paths** — LaTeX source, paper PDF, figure directories, an abstract, or a prior deck to adapt. Read what's provided; see [references/content-mapping.md](references/content-mapping.md) for how to mine each input type.
- **Directory name** — `talks/YYYY_shortname/` (year of the talk + a short lowercase tag, e.g. `2026_sicss`), matching any decks already under `talks/`.

### 2. Outline first — get approval before writing any HTML

Propose a slide-by-slide outline: for each slide, the format name (from the catalog) and one line of content. Group build-up sequences explicitly ("Figure build-up ×3: baseline → add condition → highlight result"). Getting the outline right is where the user can cheaply redirect; rewriting finished HTML is expensive. Show the outline and wait for approval, adjusting until it fits the time budget and the story the user wants to tell.

### 3. Scaffold

```bash
cp -r talks/templates talks/YYYY_shortname
rm talks/YYYY_shortname/README.md
```

Then copy the figures the outline needs into `talks/YYYY_shortname/assets/` with descriptive names, and delete the placeholder SVGs once they're no longer referenced.

### 4. Fill the slides

Instantiate each outlined slide by copying the matching `<section>` from the template's `index.html` and replacing the `{{PLACEHOLDER}}` sentinels. Consult [references/slide-formats.md](references/slide-formats.md) for format selection and composition conventions.

Rules that keep decks consistent:

- **Bullet lists always build.** Every `<li>` on a list slide gets `class="fragment fade-in"` so the audience sees one point at a time instead of reading ahead. See the bullet-build rule in [references/slide-formats.md](references/slide-formats.md) for the `hr-half` pairing and the exceptions.
- **Don't read or modify the template CSS.** The formats are designed to be used via markup alone; copying sections and swapping content is the whole job. Never use vh/vw units inside slides (see the header comment in `css/base.css` for why).
- **Don't invent new CSS for a layout that almost fits.** Stretch an existing format first (size modifiers, `style=""` nudges like the existing decks use). If a genuinely new layout is needed, add it to the new deck's `css/components.css` with a comment, and tell the user it's a candidate to upstream into `talks/templates/`.
- Verify no `{{` sentinel remains: `grep -n '{{' talks/YYYY_shortname/index.html` should return nothing.

### 5. Wire up and hand off

- Ask the user (with AskUserQuestion) whether to add the talk to the talks listing page now. If yes, add it to `data/talks.json` via the `update-site-data` skill (don't edit that file directly from here); if no, remind them the deck is live-but-unlinked until it's added.
- Remind the user to review the deck locally at `/talks/YYYY_shortname/` (the `preview-site` skill serves the site) — and that pushing to the deployed branch publishes it immediately.
