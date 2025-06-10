import { IMovie, IWatchedMovie } from "../types";
import { average } from "../utils";

export function Movies({
  movies,
  onSelectMovie,
}: {
  movies: IMovie[];
  onSelectMovie: (id: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <SingleMovie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function SingleMovie({
  movie,
  onSelectMovie,
}: {
  movie: IMovie;
  onSelectMovie: (id: string) => void;
}) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export function Summary({ watched }: { watched: IWatchedMovie[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        {/* <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p> */}
      </div>
    </div>
  );
}

export function WatchedMovies({
  watched,
  onWatchedMovieDelete,
}: {
  watched: IWatchedMovie[];
  onWatchedMovieDelete: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <SingleWatchedMovie
          key={movie.imdbID}
          watchedMovie={movie}
          onWatchedMovieDelete={onWatchedMovieDelete}
        />
      ))}
    </ul>
  );
}

function SingleWatchedMovie({
  watchedMovie,
  onWatchedMovieDelete,
}: {
  watchedMovie: IWatchedMovie;
  onWatchedMovieDelete: (id: string) => void;
}) {
  return (
    <li key={watchedMovie.imdbID}>
      <img src={watchedMovie.Poster} alt={`${watchedMovie.Title} poster`} />
      <h3>{watchedMovie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{watchedMovie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watchedMovie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchedMovie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onWatchedMovieDelete(watchedMovie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
