/**
 * Renders data/cv.json into the C.V. page.
 *
 * Shape: { pdf, sections: [ { heading, type, items } ] } where `type` is
 *   "timeline" — items: { period, title, org, bullets[] }
 *   "list"     — items: { period, text }   (text may contain HTML entities)
 *   "tags"     — items: ["chip", ...]
 */
Site.load("./data/cv.json", "cv-container", (container, cv) => {
  if (cv.pdf) {
    const download = Site.link(cv.pdf, "Download full C.V. (PDF)");
    download.className = "cv-download";
    container.appendChild(download);
  }

  (cv.sections || []).forEach((section) => {
    const block = Site.el("section", "cv-section");
    block.id = section.heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    block.appendChild(Site.el("h2", "section-title", section.heading));

    if (section.type === "tags") {
      const list = Site.el("ul", "tags");
      (section.items || []).forEach((label) => {
        list.appendChild(Site.el("li", null, label));
      });
      block.appendChild(list);
    } else if (section.type === "list") {
      (section.items || []).forEach(({ period, text }) => {
        const entry = Site.el("div", "cv-entry");
        entry.appendChild(Site.el("div", "cv-period", period || ""));
        const body = document.createElement("div");
        const p = Site.el("p", "cv-title");
        // Site-owner content from data/cv.json; entities only.
        p.innerHTML = text;
        body.appendChild(p);
        entry.appendChild(body);
        block.appendChild(entry);
      });
    } else {
      (section.items || []).forEach(({ period, title, org, bullets }) => {
        const entry = Site.el("div", "cv-entry");
        entry.appendChild(Site.el("div", "cv-period", period || ""));

        const body = document.createElement("div");
        body.appendChild(Site.el("p", "cv-title", title || ""));
        if (org) body.appendChild(Site.el("p", "cv-org", org));
        if (bullets && bullets.length) {
          const ul = Site.el("ul", "cv-bullets");
          bullets.forEach((b) => ul.appendChild(Site.el("li", null, b)));
          body.appendChild(ul);
        }

        entry.appendChild(body);
        block.appendChild(entry);
      });
    }

    container.appendChild(block);
  });
});
