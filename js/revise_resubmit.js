/** Renders data/revise_resubmit.json (manuscripts invited to revise and resubmit). */
Site.load(
  "./data/revise_resubmit.json",
  "revise-resubmit-container",
  (container, papers) => {
    papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));
  }
);
