/**
 * Renders data/teaching.json (array of courses/appointments, newest first).
 * Entries sharing a `group` value are listed under one subheading, in the
 * order the groups first appear in the file.
 */
Site.load("./data/teaching.json", "teaching-container", (container, courses) => {
  const groups = [];
  courses.forEach((course) => {
    const name = course.group || "";
    let group = groups.find((g) => g.name === name);
    if (!group) {
      group = { name, items: [] };
      groups.push(group);
    }
    group.items.push(course);
  });

  groups.forEach(({ name, items }) => {
    if (name) container.appendChild(Site.el("h3", "group-heading", name));

    items.forEach(({ code, title, role, institution, term, description }) => {
      const item = Site.el("div", "item");
      item.appendChild(Site.el("div", "item-date", term || ""));

      const body = document.createElement("div");
      const heading = Site.el("h3", "item-title");
      if (code) heading.appendChild(Site.el("span", "item-code", code));
      heading.appendChild(document.createTextNode(title));
      body.appendChild(heading);

      const meta = [role, institution].filter(Boolean).join(" · ");
      if (meta) body.appendChild(Site.el("p", "item-meta", meta));
      if (description) {
        body.appendChild(Site.el("p", "item-description", description));
      }

      item.appendChild(body);
      container.appendChild(item);
    });
  });
});
