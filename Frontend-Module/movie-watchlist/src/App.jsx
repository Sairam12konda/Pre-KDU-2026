import React, { useEffect, useRef, useState } from "react";
import "./App.css";

/* ---------- Constants ---------- */
const GENRES = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Animation"
];

const PREMIUM_MOVIES = [
  { id: 1, title: "Avatar" },
  { id: 2, title: "Bahubali" },
  { id: 3, title: "The Avengers" }
];

function App() {
  /* ---------- Navigation ---------- */
  const [view, setView] = useState("watchlist");

  /* ---------- Watchlist ---------- */
  const [movies, setMovies] = useState([]);
  const firstLoad = useRef(true);

  /* ---------- Search ---------- */
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  /* ---------- Add Movie ---------- */
  const [form, setForm] = useState({
    title: "",
    genre: "",
    actors: "",
    director: "",
    year: ""
  });

  /* ---------- Rating ---------- */
  const [ratingModal, setRatingModal] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState(null);
  const [rating, setRating] = useState("");

  /* ---------- Premium Rentals ---------- */
  const [premiumTimers, setPremiumTimers] = useState(
    PREMIUM_MOVIES.map(movie => ({
      ...movie,
      timeLeft: 10,
      running: false,
      finished: false
    }))
  );

  const [nowPlaying, setNowPlaying] = useState(null);

  /* ---------- LocalStorage ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("movie_watchlist");
    if (stored) setMovies(JSON.parse(stored));
    firstLoad.current = false;
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      localStorage.setItem("movie_watchlist", JSON.stringify(movies));
    }
  }, [movies]);

  /* ---------- Premium Countdown Logic ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setPremiumTimers(prev =>
        prev.map(movie => {
          if (movie.running && movie.timeLeft > 0) {
            const newTime = movie.timeLeft - 1;
            return {
              ...movie,
              timeLeft: newTime,
              finished: newTime === 0,
              running: newTime === 0 ? false : true
            };
          }
          return movie;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ---------- Navigation ---------- */
  const navigate = (target) => {
    setView(target);
    if (target !== "search") {
      setSearchActive(false);
      setSearchText("");
    }
  };

  /* ---------- Watchlist Actions ---------- */
  const addMovie = () => {
    if (!form.title.trim()) {
      alert("Movie title cannot be empty");
      return;
    }

    setMovies(prev => [
      ...prev,
      { ...form, id: Date.now(), watched: false, rating: "" }
    ]);

    setForm({
      title: "",
      genre: "",
      actors: "",
      director: "",
      year: ""
    });

    navigate("watchlist");
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const openRatingModal = (id) => {
    setActiveMovieId(id);
    setRating("");
    setRatingModal(true);
  };

  const submitRating = () => {
    if (!rating) return;

    setMovies(prev =>
      prev.map(m =>
        m.id === activeMovieId ? { ...m, watched: true, rating } : m
      )
    );

    setRatingModal(false);
  };

  const clearSearch = () => {
    setSearchActive(false);
    setSearchText("");
  };

  /* ---------- Premium Actions ---------- */
  const startCountdown = (id) => {
    setPremiumTimers(prev =>
      prev.map(m => (m.id === id ? { ...m, running: true } : m))
    );
  };

  const resetCountdown = (id) => {
    setPremiumTimers(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, timeLeft: 10, running: false, finished: false }
          : m
      )
    );
  };

  const watchMovie = (movie) => {
    setNowPlaying(movie.title);
    setView("playing");
  };

  /* ---------- Search Logic ---------- */
  const visibleMovies = searchActive
    ? movies.filter(m =>
        (m.title + m.genre + m.actors + m.director)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    : movies;

  /* ---------- UI ---------- */
  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <h1 className="app-title">MOVIE WATCHLIST</h1>

        <div className="nav">
          <button onClick={() => navigate("search")}>SEARCH</button>
          <button onClick={() => navigate("add")}>ADD</button>
          <button onClick={() => navigate("watchlist")}>WATCHLIST</button>
          <button onClick={() => navigate("premium")}>PREMIUM RENTALS</button>
        </div>
      </div>

      {/* SEARCH */}
      {view === "search" && (
        <div className="panel">
          <input
            placeholder="SEARCH MOVIES"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              if (!searchText.trim()) return;
              setSearchActive(true);
              setView("watchlist");
            }}
          >
            SEARCH
          </button>
        </div>
      )}

      {/* ADD */}
      {view === "add" && (
        <div className="panel">
          <input placeholder="TITLE" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />

          <select value={form.genre}
            onChange={e => setForm({ ...form, genre: e.target.value })}>
            <option value="">SELECT GENRE</option>
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>

          <input placeholder="ACTORS" value={form.actors}
            onChange={e => setForm({ ...form, actors: e.target.value })} />

          <input placeholder="DIRECTOR" value={form.director}
            onChange={e => setForm({ ...form, director: e.target.value })} />

          <input placeholder="YEAR" value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })} />

          <button onClick={addMovie}>ADD MOVIE</button>
        </div>
      )}

      {/* WATCHLIST */}
      {view === "watchlist" && (
        <div className="panel">
          {visibleMovies.map(m => (
            <div className="card" key={m.id}>
              <h3>{m.title}</h3>
              {!m.watched ? (
                <button onClick={() => openRatingModal(m.id)}>WATCHED</button>
              ) : (
                <p>{m.rating}/10</p>
              )}
              <button onClick={() => deleteMovie(m.id)}>DELETE</button>
            </div>
          ))}
        </div>
      )}

      {/* PREMIUM RENTALS */}
      {view === "premium" && (
        <div className="panel">
          <h2>PREMIUM RENTALS</h2>

          {premiumTimers.map(movie => (
            <div className="card" key={movie.id}>
              <h3>{movie.title}</h3>

              {!movie.finished ? (
                <>
                  <p>Time Left: {movie.timeLeft}s</p>

                  {!movie.running ? (
                    <button onClick={() => startCountdown(movie.id)}>
                      START COUNTDOWN
                    </button>
                  ) : (
                    <button onClick={() => resetCountdown(movie.id)}>
                      RESET
                    </button>
                  )}
                </>
              ) : (
                <button onClick={() => watchMovie(movie)}>
                  WATCH NOW
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* NOW PLAYING */}
      {view === "playing" && (
        <div className="panel">
          <h1>{nowPlaying}</h1>
          <h2>▶️ Now Playing: {nowPlaying}</h2>
          <button onClick={() => navigate("premium")}>
            BACK TO PREMIUM
          </button>
        </div>
      )}

      {/* RATING MODAL */}
      {ratingModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>RATE MOVIE</h2>
            <select value={rating} onChange={e => setRating(e.target.value)}>
              <option value="">SELECT</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>
            <button onClick={submitRating}>SUBMIT</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
