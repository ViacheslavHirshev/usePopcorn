import { useState } from "react";
import { Movie } from "../types";

export default function ListBox({ movies }: { movies: Movie[] })
{
    const [isOpen1, setIsOpen1] = useState(true);

    function handleIsOpen1Change(): void 
    {
        setIsOpen1(open => !open);
    }

    return (
        <div className="box">
            <ToggleButton isOpen1={isOpen1} handleIsOpen1Change={handleIsOpen1Change} />
            {isOpen1 && <Movies movies={movies} />}
        </div>
    );
}

function ToggleButton({ isOpen1, handleIsOpen1Change }: { isOpen1: boolean, handleIsOpen1Change: () => void })
{
    return (
        <button
            className="btn-toggle"
            onClick={handleIsOpen1Change}
        >
            {isOpen1 ? "–" : "+"}
        </button>
    )
}

function Movies({ movies }: { movies: Movie[] })
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
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.year}</span>
                </p>
            </div>
        </li>
    )
}