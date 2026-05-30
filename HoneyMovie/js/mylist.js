/**
 * Saved movies (My List) via localStorage.
 */
const MyList = {
  STORAGE_KEY: "honeyMovie_mylist",

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  },

  _save(ids) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("mylist-updated"));
  },

  getIds() {
    return this._load().map(Number);
  },

  getMovies() {
    const ids = this.getIds();
    return ids.map((id) => getMovieById(id)).filter(Boolean);
  },

  has(movieId) {
    return this.getIds().includes(Number(movieId));
  },

  toggle(movieId) {
    const id = Number(movieId);
    let ids = this.getIds();
    if (ids.includes(id)) {
      ids = ids.filter((i) => i !== id);
    } else {
      ids.push(id);
    }
    this._save(ids);
    return this.has(id);
  },

  remove(movieId) {
    const ids = this.getIds().filter((i) => i !== Number(movieId));
    this._save(ids);
  },

  count() {
    return this.getIds().length;
  }
};
