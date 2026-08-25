/** Renders data/in_preparation.json (manuscripts ready for submission). */
Site.load(
  "./data/in_preparation.json",
  "in-preparation-container",
  (container, papers) => {
    papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));
  }
);
