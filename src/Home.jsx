import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const fetchMovies = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Explorer</h1>

      <div className="search-box">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movie..."
        />
        <button onClick={fetchMovies}>Search</button>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
