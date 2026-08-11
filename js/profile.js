/**
 * Renders data/profile.json wherever the current page asks for it:
 *   #hero-container      hero block (name, role, social row, photo)
 *   #bio-container       bio paragraphs
 *   #interests-container research-interest chips
 *   #contact-container   contact details
 * Also fills the nav brand and the footer copyright on every page.
 */
(async () => {
  const profile = await Site.fetchJSON("./data/profile.json");
  if (Site.isEmpty(profile)) return;

  const links = profile.links || [];

  /** Row of circular social icons; the C.V. link renders as a pill. */
  const socialRow = () => {
    const list = Site.el("ul", "social-row");
    links.forEach(({ label, url, icon }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("aria-label", label);
      a.title = label;
      if (/^https?:/i.test(url)) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      if (icon === "cv") {
        a.className = "social-cv";
        a.appendChild(Site.icon("cv"));
        a.appendChild(document.createTextNode("C.V."));
      } else {
        a.appendChild(Site.icon(icon || "university"));
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    return list;
  };

  // --- Nav brand + footer ---------------------------------------------------
  const brand = document.getElementById("nav-brand");
  if (brand && profile.name) brand.textContent = profile.name;

  const footer = document.getElementById("footer-text");
  if (footer && profile.name) {
    footer.textContent =
      `© ${new Date().getFullYear()} by ${profile.name}. ` +
      "All materials on this site are provided for personal use only.";
  }

  // --- Hero -----------------------------------------------------------------
  const hero = document.getElementById("hero-container");
  if (hero) {
    const wrap = Site.el("div", "hero");

    const text = Site.el("div", "hero-text");
    text.appendChild(Site.el("h1", "hero-name", profile.name || ""));
    if (profile.title) {
      text.appendChild(Site.el("p", "hero-role", profile.title));
    }
    if (profile.affiliation) {
      text.appendChild(Site.el("p", "hero-affiliation", profile.affiliation));
    }
    if (links.length) text.appendChild(socialRow());
    if (profile.tagline) {
      text.appendChild(Site.el("p", "hero-tagline", profile.tagline));
    }
    wrap.appendChild(text);

    if (profile.photoPath) {
      const figure = Site.el("div", "hero-photo-wrap");
      const img = Site.el("img", "hero-photo");
      img.src = profile.photoPath;
      img.alt = profile.name || "Profile photo";
      img.loading = "eager";
      // Fall back to the placeholder illustration if the photo is missing.
      if (profile.photoFallback) {
        img.addEventListener("error", () => {
          if (img.src.endsWith(profile.photoFallback.replace("./", ""))) return;
          img.src = profile.photoFallback;
        });
      }
      figure.appendChild(img);
      wrap.appendChild(figure);
    }

    hero.appendChild(wrap);
    Site.reveal(hero);
  }

  // --- Bio ------------------------------------------------------------------
  const bio = document.getElementById("bio-container");
  if (bio && profile.bio && profile.bio.length) {
    profile.bio.forEach((paragraph) => {
      bio.appendChild(Site.el("p", null, paragraph));
    });
    Site.reveal(bio);
  }

  // --- Research interests ---------------------------------------------------
  const interests = document.getElementById("interests-container");
  if (interests && profile.interests && profile.interests.length) {
    const list = Site.el("ul", "tags");
    profile.interests.forEach((topic) => {
      list.appendChild(Site.el("li", null, topic));
    });
    interests.appendChild(list);
    Site.reveal(interests);
  }

  // --- Contact --------------------------------------------------------------
  const contact = document.getElementById("contact-container");
  if (contact) {
    const grid = Site.el("div", "contact-grid");
    const c = profile.contact || {};

    if (c.email) {
      const block = Site.el("div", "contact-block");
      block.appendChild(Site.el("h3", null, "Email"));
      const p = document.createElement("p");
      p.appendChild(Site.link(`mailto:${c.email}`, c.email));
      block.appendChild(p);
      grid.appendChild(block);
    }

    if (c.office || c.address) {
      const block = Site.el("div", "contact-block");
      block.appendChild(Site.el("h3", null, "Office"));
      const p = document.createElement("p");
      [profile.affiliation, c.office, c.address]
        .filter(Boolean)
        .forEach((line, i) => {
          if (i) p.appendChild(document.createElement("br"));
          p.appendChild(document.createTextNode(line));
        });
      block.appendChild(p);
      grid.appendChild(block);
    }

    if (links.length) {
      const block = Site.el("div", "contact-block");
      block.appendChild(Site.el("h3", null, "Elsewhere"));
      block.appendChild(socialRow());
      grid.appendChild(block);
    }

    contact.appendChild(grid);
    Site.reveal(contact);
  }
})();
