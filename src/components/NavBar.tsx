import { useState } from "react";
import { Movie } from "../types";

export default function NavBar({ movies }: { movies: Movie[] })
{
    return (
        <nav className="nav-bar">
            <Logo />
            <SearchBar />
            <Results movies={movies} />
        </nav>
    );
}

function SearchBar()
{
    const [query, setQuery] = useState("");

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function Logo()
{
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

function Results({ movies }: { movies: Movie[] })
{
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}