import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { IMovie, IWatchedMovie, IOMDBJsonData } from "../types";
import { Movies, Summary, WatchedMovies } from "./MovieInfo";
import Box from "./Box";
import { getDataFromApi } from "../utils";
import MovieDetails from "./MovieDetails";
import Loader from "./Loader";

const KEY = "b49353cd";

export default function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watched, setWatched] = useState<IWatchedMovie[]>(() => {
    const stored = localStorage.getItem("watched");
    return stored ? JSON.parse(stored) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("");

  function selectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function closeMovie() {
    setSelectedId(null);
  }

  function addWatchedMovie(watchedMovie: IWatchedMovie) {
    setWatched((prev) => [...prev, watchedMovie]);
  }

  function deleteWatchedMovie(id: string) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const abortController = new AbortController();

    const getMovies = async function () {
      try {
        setIsLoading(true);
        const data = await getDataFromApi<IOMDBJsonData>(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: abortController.signal }
        );

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        // console.log(data.Search);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        } else {
          // console.log("Unknown error: " + err);
        }
      } finally {
        setIsLoading(false);
        setError("");
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Movies movies={movies} onSelectMovie={selectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={closeMovie}
              onAddWatched={addWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovies
                watched={watched}
                onWatchedMovieDelete={deleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="main">{children}</main>;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>❌{message}</span>
    </p>
  );
}

function NavBar({ children }: { children: ReactNode }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
}) {
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

function Results({ movies }: { movies: IMovie[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
