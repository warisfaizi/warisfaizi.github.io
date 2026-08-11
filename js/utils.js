/**
 * Shared helpers for the JSON-driven sections.
 *
 * Every section module follows the same pattern:
 *   Site.load("./data/foo.json", "container-id", renderFn)
 * The section stays hidden unless its JSON file loads and contains data,
 * so removing/emptying a data file cleanly removes the section.
 */
const Site = {
  /** Name highlighted in author lists (see Site.authorLine). */
  SELF: "Waris Ahmad Faizi",

  /**
   * Fetch a JSON data file. Returns null (instead of throwing) when the
   * file is missing or malformed so a broken file hides its section
   * rather than breaking the page. Errors are logged to the console.
   */
  async fetchJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Failed to load ${path}:`, err);
      return null;
    }
  },

  /**
   * Load a data file and render it into a container. Reveals the parent
   * <section> only when there is data to show.
   */
  async load(dataPath, containerId, render) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await this.fetchJSON(dataPath);
    if (this.isEmpty(data)) return;

    render(container, data);
    this.reveal(container);
  },

  isEmpty(data) {
    return (
      data == null ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "object" &&
        !Array.isArray(data) &&
        Object.keys(data).length === 0)
    );
  },

  /** Un-hide the <section> wrapping a container, if any. */
  reveal(container) {
    const section = container.closest("section");
    if (section) section.hidden = false;
  },

  /** Create an element with a class and optional text content. */
  el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  },

  /** Author list with the site owner's name emphasized. */
  authorLine(authors) {
    const p = this.el("p", "paper-authors");
    const parts = String(authors).split(this.SELF);
    parts.forEach((part, i) => {
      if (i > 0) p.appendChild(this.el("span", "self", this.SELF));
      if (part) p.appendChild(document.createTextNode(part));
    });
    return p;
  },

  /**
   * Render one paper row (shared by publications and working papers).
   * Fields used: title, url, authors, publication, year, pdfPath, bibPath.
   */
  paperCard(paper) {
    const row = this.el("article", "paper");

    row.appendChild(this.el("div", "paper-year", paper.year || ""));

    const body = this.el("div", "paper-body");

    const title = this.el("h3", "paper-title");
    if (paper.url) title.appendChild(this.link(paper.url, paper.title));
    else title.textContent = paper.title;
    body.appendChild(title);

    if (paper.authors) body.appendChild(this.authorLine(paper.authors));
    if (paper.publication) {
      body.appendChild(this.el("p", "paper-venue", paper.publication));
    }

    const links = this.el("ul", "paper-links");
    const add = (href, label) => {
      const li = document.createElement("li");
      li.appendChild(this.link(href, label));
      links.appendChild(li);
    };
    if (paper.url) add(paper.url, "Link");
    if (paper.pdfPath) add(paper.pdfPath, "PDF");
    if (paper.bibPath) add(paper.bibPath, "BibTeX");
    if (links.childNodes.length) body.appendChild(links);

    row.appendChild(body);
    return row;
  },

  /** Create a link (external ones open in a new tab). */
  link(href, text) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (/^https?:/i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  },

  /** Inline SVG icons used by the social row (24x24 viewBox). */
  ICONS: {
    scholar:
      "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z",
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    github:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    university:
      "M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z",
    email:
      "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
    cv: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  },

  icon(name) {
    const path = this.ICONS[name] || this.ICONS.university;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  },
};
