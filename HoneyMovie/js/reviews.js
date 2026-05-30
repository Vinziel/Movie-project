/**
 * Per-movie reviews stored in localStorage.
 */
const Reviews = {
  STORAGE_KEY: "honeyMovie_reviews",

  _loadAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  },

  _saveAll(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  getForMovie(movieId) {
    const all = this._loadAll();
    return all[String(movieId)] || [];
  },

  add(movieId, { name, comment, rating }) {
    const all = this._loadAll();
    const key = String(movieId);
    const list = all[key] || [];
    const review = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: name.trim(),
      comment: comment.trim(),
      rating: Math.min(10, Math.max(1, Number(rating))),
      createdAt: new Date().toISOString()
    };
    list.unshift(review);
    all[key] = list;
    this._saveAll(all);
    return review;
  },

  remove(movieId, reviewId) {
    const all = this._loadAll();
    const key = String(movieId);
    all[key] = (all[key] || []).filter((r) => r.id !== reviewId);
    this._saveAll(all);
  },

  getAverage(movieId) {
    const list = this.getForMovie(movieId);
    if (!list.length) return null;
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / list.length) * 10) / 10;
  },

  getCombinedRating(movie) {
    const userAvg = this.getAverage(movie.id);
    const base = movie.rating;
    if (userAvg === null) return base;
    return Math.round(((base + userAvg) / 2) * 10) / 10;
  }
};
