/**
 * Movie details page — info, reviews, related movies.
 */
(function () {
  function getQueryId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function formatRating(rating) {
    return `⭐ ${rating.toFixed(1)}/10`;
  }

  function renderStars(rating) {
    const full = Math.round(rating / 2);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function renderMovie(movie) {
    const combined = Reviews.getCombinedRating(movie);
    const userAvg = Reviews.getAverage(movie.id);
    const reviewCount = Reviews.getForMovie(movie.id).length;

    document.title = `${movie.title} — HoneyMovie`;

    const banner = document.getElementById("detail-banner");
    const bannerSrc = getMovieBanner(movie);
    banner.innerHTML = `<img src="${bannerSrc}" alt="" decoding="async" />`;
    const bannerImg = banner.querySelector("img");
    if (window.HoneyMovie?.bindImageFallback) {
      HoneyMovie.bindImageFallback(bannerImg, movie.title);
    }

    document.getElementById("detail-title").textContent = movie.title;
    document.getElementById("detail-rating").textContent = formatRating(combined);
    document.getElementById("detail-stars").textContent = renderStars(combined);
    document.getElementById("detail-meta").innerHTML = `
      <span>${movie.genre}</span>
      <span>${movie.year}</span>
      <span>${movie.duration}</span>
    `;
    document.getElementById("detail-description").textContent = movie.description;
    document.getElementById("detail-cast").innerHTML = movie.cast
      .map((name) => `<li>${name}</li>`)
      .join("");

    const imdbNote = document.getElementById("rating-breakdown");
    if (imdbNote) {
      imdbNote.textContent = userAvg
        ? `IMDb ${movie.rating}/10 · User avg ${userAvg}/10 (${reviewCount} review${reviewCount !== 1 ? "s" : ""})`
        : `IMDb rating ${movie.rating}/10 · Be the first to review`;
    }

    const saveBtn = document.getElementById("detail-save");
    if (saveBtn) {
      const saved = MyList.has(movie.id);
      saveBtn.classList.toggle("saved", saved);
      saveBtn.innerHTML = `<span>${saved ? "✓" : "+"}</span> ${saved ? "In My List" : "Add to My List"}`;
      saveBtn.onclick = () => {
        const nowSaved = MyList.toggle(movie.id);
        saveBtn.classList.toggle("saved", nowSaved);
        saveBtn.innerHTML = `<span>${nowSaved ? "✓" : "+"}</span> ${nowSaved ? "In My List" : "Add to My List"}`;
        HoneyMovie?.updateMyListBadge?.();
      };
    }
  }

  function renderReviews(movieId) {
    const listEl = document.getElementById("reviews-list");
    const avgEl = document.getElementById("reviews-avg");
    const reviews = Reviews.getForMovie(movieId);
    const avg = Reviews.getAverage(movieId);

    if (avgEl) {
      avgEl.textContent = avg ? `Average: ${avg}/10 (${reviews.length})` : "No user reviews yet";
    }

    if (!listEl) return;

    if (!reviews.length) {
      listEl.innerHTML = `<p class="empty-state">No reviews yet. Share your thoughts below.</p>`;
      return;
    }

    listEl.innerHTML = reviews
      .map(
        (r) => `
      <article class="review-card" data-review-id="${r.id}">
        <div class="review-header">
          <strong>${escapeHtml(r.name)}</strong>
          <span class="review-rating">⭐ ${r.rating}/10</span>
        </div>
        <p class="review-comment">${escapeHtml(r.comment)}</p>
        <button type="button" class="btn-text btn-delete-review" data-delete="${r.id}">Delete</button>
      </article>
    `
      )
      .join("");

    listEl.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Reviews.remove(movieId, btn.getAttribute("data-delete"));
        renderReviews(movieId);
        const movie = getMovieById(movieId);
        if (movie) {
          renderMovie(movie);
        }
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function setupReviewForm(movieId) {
    const form = document.getElementById("review-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const comment = form.querySelector('[name="comment"]').value;
      const rating = form.querySelector('[name="rating"]').value;

      if (!name.trim() || !comment.trim()) return;

      Reviews.add(movieId, { name, comment, rating });
      form.reset();
      renderReviews(movieId);
      const movie = getMovieById(movieId);
      if (movie) renderMovie(movie);
    });
  }

  function renderRelated(movieId) {
    const related = getRelatedMovies(movieId);
    const track = document.querySelector("#related-row .carousel-track");
    if (!track) return;

    track.innerHTML = "";
    if (!related.length) {
      const fallback = movies.filter((m) => m.id !== Number(movieId)).slice(0, 8);
      fallback.forEach((m) => track.appendChild(HoneyMovie.createMovieCard(m)));
    } else {
      related.forEach((m) => track.appendChild(HoneyMovie.createMovieCard(m)));
    }
    HoneyMovie.bindSaveButtons(track);
    HoneyMovie.initCarousel("#related-row");
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
    if (!document.body.classList.contains("page-detail")) return;

    const id = getQueryId();
    const movie = getMovieById(id);

    if (!movie) {
      document.querySelector(".detail-hero")?.classList.add("hidden");
      document.querySelector(".detail-main")?.classList.add("hidden");
      document.getElementById("related-section")?.classList.add("hidden");
      document.getElementById("not-found")?.classList.remove("hidden");
      return;
    }

    renderMovie(movie);
    renderReviews(movie.id);
    setupReviewForm(movie.id);
    renderRelated(movie.id);
    initNav();
    HoneyMovie?.updateMyListBadge?.();
    window.addEventListener("mylist-updated", () => HoneyMovie?.updateMyListBadge?.());
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
