/** Renders data/talks.json (array of talks, newest first). */
Site.load("./data/talks.json", "talks-container", (container, talks) => {
  talks.forEach(({ title, location, date, link }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("div", "item-date", date || ""));

    const body = document.createElement("div");
    const heading = Site.el("h3", "item-title");
    if (link) heading.appendChild(Site.link(link, title));
    else heading.textContent = title;
    body.appendChild(heading);

    if (location) body.appendChild(Site.el("p", "item-meta", location));
    item.appendChild(body);
    container.appendChild(item);
  });
});
