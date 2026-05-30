/**
 * Dark / light theme with localStorage persistence.
 */
const Theme = {
  STORAGE_KEY: "honeyMovie_theme",

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    this.set(theme, false);
    this.bindToggle();
  },

  get() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  },

  set(theme, persist = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    this.updateToggleIcon(theme);
  },

  toggle() {
    const next = this.get() === "dark" ? "light" : "dark";
    this.set(next);
  },

  bindToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => this.toggle());
    });
  },

  updateToggleIcon(theme) {
    document.querySelectorAll("[data-theme-icon]").forEach((el) => {
      el.textContent = theme === "dark" ? "☀️" : "🌙";
    });
    document.querySelectorAll("[data-theme-label]").forEach((el) => {
      el.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }
};

document.addEventListener("DOMContentLoaded", () => Theme.init());
