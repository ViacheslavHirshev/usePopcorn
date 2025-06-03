import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Movie, WatchedMovie, OMDBJsonData } from "../types";
import { Movies, Summary, WatchedMovies } from "./MovieInfo";
import Box from "./Box";
import { getDataFromApi } from "../utils";

const KEY = "b49353cd";
const endpoint = `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`;

export default function App()
{
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>
  {
    const getMovies = async function () 
    {
      const data = await getDataFromApi<OMDBJsonData>(endpoint);

      if (data.Response === "True" && data.Search)
      {
        setMovies(data.Search);
        setIsLoading(false);
      }
      else
      {
        console.error("OMDB API error");
        setMovies([]);
      }
    }

    setIsLoading(true);
    getMovies();
  }, []);

  return (
    <>
      <NavBar movies={movies} />
      <Main>
        <Box>
          {
            isLoading ? <Loader /> : <Movies movies={movies} />
          }
        </Box>

        <Box>
          <Summary watched={watched} />
          <WatchedMovies watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main({ children }: { children: React.ReactNode })
{
  return (
    <main className="main">
      {children}
    </main>
  );
}

function Loader()
{
  return <p className="loader">Loading...</p>;
}