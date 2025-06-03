import { Movie, WatchedMovie } from "../types";
import { average } from "../utils";

export function Movies({ movies }: { movies: Movie[] })
{
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <SingleMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

function SingleMovie({ movie }: { movie: Movie })
{
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

export function Summary({ watched }: { watched: WatchedMovie[] })
{
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

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
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

export function WatchedMovies({ watched }: { watched: WatchedMovie[] })
{
    return (
        <ul className="list">
            {watched.map((movie) =>
                <SingleWatchedMovie watchedMovie={movie} />)}
        </ul>
    )
}

function SingleWatchedMovie({ watchedMovie }: { watchedMovie: WatchedMovie })
{
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
        </li>
    )
}