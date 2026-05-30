/**
 * Movie dataset - single source of truth for the app.
 */
function getMoviePoster(movie) {
  if (!movie.posterSlug) return "";
  return `assets/posters/${movie.posterSlug}.jpg`;
}

function getMovieBanner(movie) {
  if (!movie.posterSlug) return "";
  return `assets/banners/${movie.posterSlug}.jpg`;
}

const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 49m",
    posterSlug: "interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    featured: true,
    categories: ["trending", "topRated", "recommended"]
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "2h 28m",
    posterSlug: "inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is offered a chance to have his criminal record erased.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    featured: true,
    categories: ["trending", "topRated"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    posterSlug: "dark-knight",
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    featured: true,
    categories: ["topRated", "recommended"]
  },
  {
    id: 4,
    title: "Dune",
    year: 2021,
    genre: "Sci-Fi",
    rating: 8.0,
    duration: "2h 35m",
    posterSlug: "dune",
    description:
      "Paul Atreides leads a rebellion to restore his family's honor while navigating a dangerous desert planet and its native inhabitants.",
    cast: ["TimothÃ©e Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
    featured: false,
    categories: ["newReleases", "trending"]
  },
  {
    id: 5,
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Sci-Fi",
    rating: 8.0,
    duration: "2h 44m",
    posterSlug: "blade-runner",
    description:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Robin Wright"],
    featured: false,
    categories: ["recommended", "topRated"]
  },
  {
    id: 6,
    title: "Arrival",
    year: 2016,
    genre: "Sci-Fi",
    rating: 7.9,
    duration: "1h 56m",
    posterSlug: "arrival",
    description:
      "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg"],
    featured: false,
    categories: ["recommended"]
  },
  {
    id: 7,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    rating: 8.1,
    duration: "2h 0m",
    posterSlug: "mad-max",
    description:
      "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from a tyrannical warlord and his army in an armored truck.",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    featured: false,
    categories: ["trending", "topRated"]
  },
  {
    id: 8,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 16m",
    posterSlug: "matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    featured: false,
    categories: ["topRated", "recommended"]
  },
  {
    id: 9,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
    duration: "2h 12m",
    posterSlug: "parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    featured: false,
    categories: ["newReleases", "topRated"]
  },
  {
    id: 10,
    title: "Everything Everywhere All at Once",
    year: 2022,
    genre: "Adventure",
    rating: 7.8,
    duration: "2h 19m",
    posterSlug: "everything",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure in which she alone can save the multiverse by exploring other lives she could have lived.",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
    featured: false,
    categories: ["newReleases", "trending"]
  },
  {
    id: 11,
    title: "Oppenheimer",
    year: 2023,
    genre: "Drama",
    rating: 8.3,
    duration: "3h 0m",
    posterSlug: "oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    featured: true,
    categories: ["newReleases", "trending", "topRated"]
  },
  {
    id: 12,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    duration: "2h 22m",
    posterSlug: "shawshank",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    featured: false,
    categories: ["topRated"]
  },
  {
    id: 13,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    rating: 8.9,
    duration: "2h 34m",
    posterSlug: "pulp-fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    featured: false,
    categories: ["topRated", "recommended"]
  },
  {
    id: 14,
    title: "Spirited Away",
    year: 2001,
    genre: "Animation",
    rating: 8.6,
    duration: "2h 4m",
    posterSlug: "spirited-away",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Bunta Sugawara"],
    featured: false,
    categories: ["recommended"]
  },
  {
    id: 15,
    title: "La La Land",
    year: 2016,
    genre: "Romance",
    rating: 8.0,
    duration: "2h 8m",
    posterSlug: "la-la-land",
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    featured: false,
    categories: ["newReleases", "recommended"]
  },
  {
    id: 16,
    title: "Whiplash",
    year: 2014,
    genre: "Drama",
    rating: 8.5,
    duration: "1h 46m",
    posterSlug: "whiplash",
    description:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams are mentored by an instructor who will stop at nothing.",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist", "Paul Reiser"],
    featured: false,
    categories: ["trending"]
  },
  {
    id: 17,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    duration: "2h 55m",
    posterSlug: "godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    featured: false,
    categories: ["topRated"]
  },
  {
    id: 18,
    title: "Joker",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    duration: "2h 2m",
    posterSlug: "joker",
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, leading him down a path of revolution and bloody crime.",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
    featured: false,
    categories: ["trending", "newReleases"]
  }
];

const GENRES = [...new Set(movies.map((m) => m.genre))].sort();

function getMovieById(id) {
  return movies.find((m) => m.id === Number(id));
}

function getFeaturedMovies() {
  return movies.filter((m) => m.featured);
}

function getMoviesByCategory(category) {
  return movies.filter((m) => m.categories && m.categories.includes(category));
}

function getRelatedMovies(movieId, limit = 8) {
  const movie = getMovieById(movieId);
  if (!movie) return [];
  return movies
    .filter((m) => m.id !== movie.id && m.genre === movie.genre)
    .slice(0, limit);
}

function searchMovies(query, genre = "all", sort = "default") {
  const q = query.trim().toLowerCase();
  let results = movies.filter((m) => {
    const matchesQuery = !q || m.title.toLowerCase().includes(q);
    const matchesGenre = genre === "all" || m.genre === genre;
    return matchesQuery && matchesGenre;
  });

  if (sort === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (sort === "year") {
    results = [...results].sort((a, b) => b.year - a.year);
  }

  return results;
}
