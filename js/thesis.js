/** Renders data/thesis.json (graduate theses). */
Site.load("./data/thesis.json", "thesis-container", (container, theses) => {
  theses.forEach((t) => container.appendChild(Site.paperCard(t)));
});
