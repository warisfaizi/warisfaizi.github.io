/**
 * Builds the shared page chrome (top navigation + footer) so every page
 * stays in sync. Each page sets <body data-page="..."> to mark the current
 * nav item; the brand name and footer come from data/profile.json.
 */
const SiteNav = [
  { id: "home", label: "Home", href: "./index.html" },
  { id: "research", label: "Research", href: "./research.html" },
  { id: "cv", label: "Bio / C.V.", href: "./cv.html" },
  { id: "talks", label: "Talks", href: "./talks.html" },
  { id: "teaching", label: "Teaching", href: "./teaching.html" },
  { id: "contact", label: "Contact", href: "./contact.html" },
];

(function buildChrome() {
  const current = document.body.dataset.page || "";

  // --- Header -------------------------------------------------------------
  const header = document.querySelector(".site-header");
  if (header) {
    const inner = Site.el("div", "nav-inner");

    const brand = document.createElement("a");
    brand.className = "nav-brand";
    brand.href = "./index.html";
    brand.id = "nav-brand";
    brand.textContent = " "; // filled from profile.json
    inner.appendChild(brand);

    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Toggle navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "&#9776;";
    inner.appendChild(toggle);

    const list = Site.el("ul", "nav-links");
    SiteNav.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if (item.id === current) {
        a.classList.add("is-current");
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    inner.appendChild(list);
    header.appendChild(inner);

    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // --- Footer -------------------------------------------------------------
  const footer = document.querySelector(".site-footer");
  if (footer) {
    const inner = Site.el("div", "footer-inner");
    const copyright = Site.el("p");
    copyright.id = "footer-text";
    inner.appendChild(copyright);

    const links = Site.el("ul", "footer-links");
    SiteNav.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      links.appendChild(li);
    });
    inner.appendChild(links);
    footer.appendChild(inner);
  }
})();
