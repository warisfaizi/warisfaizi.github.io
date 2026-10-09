/**
 * Home-page summary of the research pipeline: title + status only, drawn from
 * the same files the research page renders in full. Keeps the landing page
 * current without duplicating the detail.
 */
(async () => {
  const container = document.getElementById("pipeline-container");
  if (!container) return;

  const sources = [
    { path: "./data/revise_resubmit.json", fallback: "" },
    { path: "./data/working_papers.json", fallback: "" },
    { path: "./data/in_preparation.json", fallback: "" },
    { path: "./data/ongoing_projects.json", fallback: "Work in progress" },
  ];

  const loaded = await Promise.all(
    sources.map((s) => Site.fetchJSON(s.path))
  );

  const list = Site.el("ul", "pipeline-list");
  loaded.forEach((entries, i) => {
    (entries || []).forEach((entry) => {
      const li = document.createElement("li");
      li.appendChild(Site.el("span", "pipeline-title", entry.title));
      const status = entry.publication || sources[i].fallback;
      if (status) li.appendChild(Site.el("span", "pipeline-status", status));
      list.appendChild(li);
    });
  });

  if (!list.childNodes.length) return;
  container.appendChild(list);
  Site.reveal(container);
})();
