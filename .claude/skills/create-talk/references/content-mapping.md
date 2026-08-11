# Mapping source material to an outline

How to mine each input type the user may provide, and how to turn what you find into the slide-by-slide outline (step 2 of the workflow).

## By input type

**LaTeX source (.tex)**
The richest input. Pull, in priority order:
- Title, author block, abstract → title slide + framing.
- `\section` structure → the talk's candidate arc.
- `\includegraphics` paths + the surrounding prose and `\caption` text → figure slides; the caption's *claim* becomes the slide headline.
- Tables (`tabular`/`booktabs`) → table slides; trim to the columns that carry the point (a paper table is usually 2–3× too dense for a slide).
- Contributions / RQ paragraphs → numbered-card slides.
- Limitations section → caveats card grid.
Resolve figure paths relative to the .tex file; ask the user where the figure files live if they aren't alongside it.

**Paper PDF**
Use the `pdf-extraction` skill (pdftotext) for the text. Figures can't be cleanly extracted from a PDF — ask the user for the original figure files or a directory of exports rather than screenshotting pages. Exception: a screenshot of page 1 *is* the right asset for a paper-card slide.

**Figure directory**
List it and match filenames against the results being presented. Copy only what the outline uses, renamed descriptively, into the new deck's `assets/`. PNG and SVG work directly; PDF figures need conversion (ask before converting; `sips`/ImageMagick availability varies).

**Abstract or notes only**
Build the arc from the abstract's own structure (motivation → gap → method → finding → implication) and mark every slide that needs a figure as `[NEEDS FIGURE: description]` in the outline so the user can supply assets before filling.

**Prior deck**
If the user points at an earlier talk under `talks/`, reuse its narrative arc and copy still-relevant assets, but rebuild slides on the new template's markup — don't copy markup from old decks, whose CSS classes may differ from the template's.

## Building the outline

1. Fix the time budget → slide count (~1 slide/build-up step per minute).
2. Draft the arc (see "Typical arc" in [slide-formats.md](slide-formats.md)), then cut from the middle, not the ends: background and appendix material flexes; the motivating question, headline result, and takeaway never get cut.
3. One claim per slide. If a figure supports two claims, that's a build-up sequence (two vertical sub-slides, headline text narrating each).
4. Present the outline as a numbered list: `N. [Format] — content one-liner (asset: filename or NEEDS FIGURE)`. This makes it cheap for the user to reorder, cut, and approve.
