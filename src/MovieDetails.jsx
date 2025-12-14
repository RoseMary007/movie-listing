import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="status">Loading...</p>;

  return (
    <div className="details-overlay">
      <div className="details-page">
        {/* ❌ Close Button */}
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>

        <img
          className="details-poster"
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
        />

        <div className="details-info">
          <h1>
            {movie.Title} ({movie.Year})
          </h1>

          <p className="meta">
            {movie.Genre} | {movie.Runtime} | {movie.Language}
          </p>

          <p className="rating">
            Rated: {movie.Rated} | IMDb: {movie.imdbRating} / 10
          </p>

          <h3>Plot</h3>
          <p>{movie.Plot}</p>

          <h3>Key Personnel</h3>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>

          <h3>Cast</h3>
          <p>{movie.Actors}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
