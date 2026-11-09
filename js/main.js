const DEFAULT_LANG = "el";

function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) {
    return;
  }

  document.documentElement.lang = lang;
  document.title = dict.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = dict[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = dict[element.dataset.i18nAlt];
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  try {
    localStorage.setItem("lang", lang);
  } catch (error) {
  }
}

function getStartLanguage() {
  let saved = null;
  try {
    saved = localStorage.getItem("lang");
  } catch (error) {}
  if (saved && translations[saved]) {
    return saved;
  }
  return navigator.language.startsWith("el") ? "el" : "en";
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

setLanguage(getStartLanguage() || DEFAULT_LANG);

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll("section, .service-card, .fleet-card, .contact-container");

  targets.forEach(el => el.classList.add("scroll-reveal"));

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach(el => observer.observe(el));
});
