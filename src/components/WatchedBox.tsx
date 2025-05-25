import { useState } from "react";
import { average } from "../utils";
import { WatchedMovie } from "../types";

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        title: "Inception",
        year: "2010",
        poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        title: "Back to the Future",
        year: "1985",
        poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

export default function WatchedBox()
{
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    function handleIsOpen2Change(): void 
    {
        setIsOpen2(open => !open);
    }

    return (
        <div className="box">
            <ToggleButton
                isOpen2={isOpen2}
                handleIsOpen2Change={handleIsOpen2Change}
            />
            {isOpen2 &&
                (
                    <>
                        <Summary watched={watched} />
                        <WatchedMovies watched={watched} />
                    </>
                )}
        </div>
    );
}

function ToggleButton({ isOpen2, handleIsOpen2Change }: { isOpen2: boolean, handleIsOpen2Change: () => void })
{
    return (
        <button
            className="btn-toggle"
            onClick={handleIsOpen2Change}
        >
            {isOpen2 ? "–" : "+"}
        </button>
    );
}

function Summary({ watched }: { watched: WatchedMovie[] })
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

function WatchedMovies({ watched }: { watched: WatchedMovie[] })
{
    return (
        <ul className="list">
            {watched.map((movie) => <SingleWatchedMovie watchedMovie={movie} />)}
        </ul>
    )
}

function SingleWatchedMovie({ watchedMovie }: { watchedMovie: WatchedMovie })
{
    return (
        <li key={watchedMovie.imdbID}>
            <img src={watchedMovie.poster} alt={`${watchedMovie.title} poster`} />
            <h3>{watchedMovie.title}</h3>
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