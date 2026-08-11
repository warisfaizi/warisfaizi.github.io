/** Renders data/ongoing_projects.json (works in progress). */
Site.load(
  "./data/ongoing_projects.json",
  "projects-container",
  (container, projects) => {
    projects.forEach(({ title, authors, description }) => {
      const item = Site.el("div", "item no-date");
      const body = document.createElement("div");
      body.appendChild(Site.el("h3", "item-title", title));
      if (authors) body.appendChild(Site.authorLine(authors));
      if (description) {
        body.appendChild(Site.el("p", "item-description", description));
      }
      item.appendChild(body);
      container.appendChild(item);
    });
  }
);
