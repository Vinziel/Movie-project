/**
 * Home page — hero, carousels, search & filter.
 */
(function () {
  const HERO_INTERVAL = 6000;
  let heroIndex = 0;
  let heroTimer = null;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function posterFallback(title) {
    const hues = [220, 260, 200, 180, 300];
    const h = hues[title.length % hues.length];
    return `linear-gradient(145deg, hsl(${h}, 55%, 18%), hsl(${h + 40}, 70%, 32%))`;
  }

  function bindImageFallback(img, title) {
    const wrap = () => img.closest(".card-poster, .hero-slide-bg, .detail-banner, .search-poster-wrap");

    img.addEventListener("error", () => {
      img.style.display = "none";
      const container = wrap();
      if (container) {
        container.classList.add("show-placeholder");
        container.style.background = posterFallback(title);
      }
    });

    img.addEventListener("load", () => {
      wrap()?.classList.remove("show-placeholder");
    });
  }

  function formatRating(rating) {
    return `⭐ ${rating.toFixed(1)}/10`;
  }

  function posterSrc(movie) {
    return getMoviePoster(movie);
  }

  function createMovieCard(movie) {
    const saved = MyList.has(movie.id);
    const combined = Reviews.getCombinedRating(movie);
    const src = posterSrc(movie);
    const card = document.createElement("article");
    card.className = "movie-card";
    card.setAttribute("data-movie-id", movie.id);
    card.innerHTML = `
      <a href="movie.html?id=${movie.id}" class="card-link" aria-label="View ${escapeHtml(movie.title)}">
        <div class="card-poster">
          <img src="${src}" alt="${escapeHtml(movie.title)} poster" loading="lazy" decoding="async" data-poster-slug="${movie.posterSlug || ""}" />
          <span class="poster-placeholder-icon" aria-hidden="true">🎬</span>
          <div class="card-overlay"></div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(movie.title)}</h3>
          <p class="card-rating">${formatRating(combined)}</p>
          <p class="card-meta"><span>${escapeHtml(movie.genre)}</span> · <span>${movie.year}</span></p>
        </div>
      </a>
      <button type="button" class="btn-save ${saved ? "saved" : ""}" data-save-id="${movie.id}" aria-label="${saved ? "Remove from" : "Add to"} My List" title="My List">
        <span class="save-icon">${saved ? "✓" : "+"}</span>
      </button>
    `;
    const img = card.querySelector("img");
    bindImageFallback(img, movie.title);
    return card;
  }

  function createSearchPosterCard(movie) {
    const src = posterSrc(movie);
    const tile = document.createElement("a");
    tile.href = `movie.html?id=${movie.id}`;
    tile.className = "search-poster-tile";
    tile.setAttribute("aria-label", movie.title);
    tile.innerHTML = `
      <div class="search-poster-wrap">
        <img src="${src}" alt="${escapeHtml(movie.title)}" loading="lazy" decoding="async" data-poster-slug="${movie.posterSlug || ""}" />
        <span class="poster-placeholder-icon" aria-hidden="true">🎬</span>
      </div>
    `;
    const img = tile.querySelector("img");
    bindImageFallback(img, movie.title);
    return tile;
  }

  function bindSaveButtons(container) {
    container.querySelectorAll("[data-save-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute("data-save-id");
        const saved = MyList.toggle(id);
        btn.classList.toggle("saved", saved);
        btn.querySelector(".save-icon").textContent = saved ? "✓" : "+";
        btn.setAttribute("aria-label", `${saved ? "Remove from" : "Add to"} My List`);
        updateMyListBadge();
      });
    });
  }

  function updateMyListBadge() {
    document.querySelectorAll("[data-mylist-count]").forEach((el) => {
      el.textContent = MyList.count();
      el.classList.toggle("hidden", MyList.count() === 0);
    });
  }

  function renderCarouselRow(containerId, movieList) {
    const track = document.querySelector(`#${containerId} .carousel-track`);
    if (!track) return;
    track.innerHTML = "";
    movieList.forEach((m) => track.appendChild(createMovieCard(m)));
    bindSaveButtons(track);
    initCarousel(`#${containerId}`);
  }

  function initCarousel(selector) {
    const row = document.querySelector(selector);
    if (!row) return;
    const track = row.querySelector(".carousel-track");
    const prev = row.querySelector(".carousel-btn.prev");
    const next = row.querySelector(".carousel-btn.next");
    if (!track) return;

    const scrollAmount = () => Math.min(track.clientWidth * 0.85, 900);

    if (prev && !prev.dataset.bound) {
      prev.dataset.bound = "1";
      prev.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      });
    }

    if (next && !next.dataset.bound) {
      next.dataset.bound = "1";
      next.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      });
    }

    if (track.dataset.touchBound) return;
    track.dataset.touchBound = "1";
    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        track.scrollBy({ left: diff > 0 ? scrollAmount() : -scrollAmount(), behavior: "smooth" });
      }
    }, { passive: true });
  }

  function renderHero() {
    const featured = getFeaturedMovies();
    const slidesEl = document.getElementById("hero-slides");
    const dotsEl = document.getElementById("hero-dots");
    if (!slidesEl || !featured.length) return;

    slidesEl.innerHTML = "";
    dotsEl.innerHTML = "";

    featured.forEach((movie, i) => {
      const slide = document.createElement("div");
      slide.className = `hero-slide${i === 0 ? " active" : ""}`;
      const bannerSrc = getMovieBanner(movie);
      slide.innerHTML = `
        <div class="hero-slide-bg">
          <img src="${bannerSrc}" alt="" decoding="async" data-poster-slug="${movie.posterSlug || ""}" />
        </div>
        <div class="hero-gradient"></div>
        <div class="hero-content">
          <span class="hero-badge">Featured</span>
          <h1 class="hero-title">${escapeHtml(movie.title)}</h1>
          <p class="hero-meta">${escapeHtml(movie.genre)} · ${movie.year} · ${movie.duration}</p>
          <p class="hero-rating">${formatRating(movie.rating)}</p>
          <p class="hero-desc">${escapeHtml(movie.description)}</p>
          <div class="hero-actions">
            <a href="movie.html?id=${movie.id}" class="btn btn-primary">View Details</a>
            <button type="button" class="btn btn-secondary" data-hero-save="${movie.id}">
              ${MyList.has(movie.id) ? "✓ In My List" : "+ My List"}
            </button>
          </div>
        </div>
      `;
      const img = slide.querySelector("img");
      bindImageFallback(img, movie.title);
      slidesEl.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `hero-dot${i === 0 ? " active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToHeroSlide(i));
      dotsEl.appendChild(dot);
    });

    slidesEl.querySelectorAll("[data-hero-save]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-hero-save");
        const saved = MyList.toggle(id);
        btn.textContent = saved ? "✓ In My List" : "+ My List";
        updateMyListBadge();
      });
    });

    startHeroAutoplay(featured.length);
  }

  function goToHeroSlide(index) {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    if (!slides.length) return;
    heroIndex = index % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === heroIndex));
    dots.forEach((d, i) => d.classList.toggle("active", i === heroIndex));
  }

  function startHeroAutoplay(count) {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      goToHeroSlide((heroIndex + 1) % count);
    }, HERO_INTERVAL);
  }

  function setSearchMode(active) {
    document.body.classList.toggle("is-searching", active);
  }

  function renderSearchResults(list) {
    const section = document.getElementById("search-section");
    const track = document.getElementById("search-track");
    const empty = document.getElementById("search-empty");
    if (!section || !track) return;

    setSearchMode(true);
    section.classList.remove("hidden");

    if (!list.length) {
      track.innerHTML = "";
      empty?.classList.remove("hidden");
      return;
    }

    empty?.classList.add("hidden");
    track.innerHTML = "";
    list.forEach((m) => track.appendChild(createSearchPosterCard(m)));
    initCarousel("#search-carousel");
  }

  function clearSearchMode() {
    setSearchMode(false);
    document.getElementById("search-section")?.classList.add("hidden");
    document.getElementById("search-empty")?.classList.add("hidden");
    document.getElementById("search-track").innerHTML = "";
  }

  function updateStickyHeaderHeight() {
    const header = document.getElementById("site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--sticky-header-height", `${header.offsetHeight}px`);
  }

  function setupSearch() {
    const input = document.getElementById("search-input");
    const clearBtn = document.getElementById("search-clear");
    const genreSelect = document.getElementById("genre-filter");
    const sortSelect = document.getElementById("sort-filter");

    const run = () => {
      const q = (input?.value || "").trim();
      const genre = genreSelect?.value || "all";
      const sort = sortSelect?.value || "default";
      const hasFilter = q.length > 0 || genre !== "all" || sort !== "default";

      clearBtn?.classList.toggle("hidden", !q.length);

      if (!hasFilter) {
        clearSearchMode();
        return;
      }

      const results = searchMovies(q, genre, sort);
      renderSearchResults(results);
    };

    input?.addEventListener("input", run);
    genreSelect?.addEventListener("change", run);
    sortSelect?.addEventListener("change", run);

    clearBtn?.addEventListener("click", () => {
      if (input) input.value = "";
      if (genreSelect) genreSelect.value = "all";
      if (sortSelect) sortSelect.value = "default";
      clearBtn.classList.add("hidden");
      clearSearchMode();
      input?.focus();
    });
  }

  function populateGenreFilter() {
    const select = document.getElementById("genre-filter");
    if (!select) return;
    GENRES.forEach((g) => {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      select.appendChild(opt);
    });
  }

  function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector(".nav-links");
    toggle?.addEventListener("click", () => {
      nav?.classList.toggle("open");
      toggle.classList.toggle("active");
      updateStickyHeaderHeight();
    });
  }

  function initPage() {
    if (!document.body.classList.contains("page-home")) return;

    populateGenreFilter();
    renderHero();
    renderCarouselRow("row-new", getMoviesByCategory("newReleases"));
    renderCarouselRow("row-trending", getMoviesByCategory("trending"));
    renderCarouselRow("row-top", getMoviesByCategory("topRated"));
    renderCarouselRow("row-rec", getMoviesByCategory("recommended"));
    setupSearch();
    initNav();
    updateMyListBadge();
    updateStickyHeaderHeight();
    window.addEventListener("resize", updateStickyHeaderHeight);
    window.addEventListener("mylist-updated", updateMyListBadge);
  }

  document.addEventListener("DOMContentLoaded", initPage);

  window.HoneyMovie = {
    createMovieCard,
    createSearchPosterCard,
    bindSaveButtons,
    formatRating,
    escapeHtml,
    posterFallback,
    bindImageFallback,
    initCarousel,
    updateMyListBadge,
    posterSrc
  };
})();
