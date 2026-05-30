/**
 * My List page renderer.
 */
(function () {
  function renderList() {
    const grid = document.getElementById("mylist-grid");
    const empty = document.getElementById("mylist-empty");
    if (!grid) return;

    const saved = MyList.getMovies();
    grid.innerHTML = "";

    if (!saved.length) {
      empty?.classList.remove("hidden");
      grid.classList.add("hidden");
      return;
    }

    empty?.classList.add("hidden");
    grid.classList.remove("hidden");

    saved.forEach((movie) => {
      const card = HoneyMovie.createMovieCard(movie);
      grid.appendChild(card);
    });

    HoneyMovie.bindSaveButtons(grid);

    grid.querySelectorAll(".btn-save").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(renderList, 50);
      });
    });
  }

  function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector(".nav-links");
    toggle?.addEventListener("click", () => {
      nav?.classList.toggle("open");
      toggle.classList.toggle("active");
    });
  }

  function initPage() {
    if (!document.body.classList.contains("page-mylist")) return;
    renderList();
    initNav();
    HoneyMovie?.updateMyListBadge?.();
    window.addEventListener("mylist-updated", renderList);
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
