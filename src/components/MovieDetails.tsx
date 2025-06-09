import { useEffect, useState } from "react";
import { getDataFromApi } from "../utils"
import { IMovieDetails, IWatchedMovie } from "../types";
import StarRating from "./StarRating";
import Loader from "./Loader";

interface IMovieDetailsProps
{
    id: string;
    onCloseMovie: () => void;
    onAddWatched: (watched: IWatchedMovie) => void;
    watched: IWatchedMovie[];
}

export default function MovieDetails({ id, onCloseMovie, onAddWatched, watched }: IMovieDetailsProps)
{
    const [movieInfo, setMovieInfo] = useState<IMovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched.map(movie => movie.imdbID).includes(id);
    const watchedUserRating = watched.find(movie => movie.imdbID === id)?.userRating;

    function handleAddWatched()
    {
        const newWatchedMovie: IWatchedMovie =
        {
            Title: movieInfo!.Title,
            Year: movieInfo!.Year,
            imdbID: movieInfo!.imdbID,
            runtime: Number(movieInfo!.Runtime.split(" ").at(0)),
            imdbRating: Number(movieInfo!.imdbRating),
            userRating,
            Type: movieInfo!.Type,
            Poster: movieInfo!.Poster
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => 
    {
        const getMovieDetails = async function ()
        {
            setIsLoading(true);
            const data = await getDataFromApi<IMovieDetails>(`https://www.omdbapi.com/?apikey=b49353cd&i=${id}`);
            setMovieInfo(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [id]);

    useEffect(() =>
    {
        if (!movieInfo?.Title)
            return;

        document.title = `Movie | ${movieInfo.Title}`;

        return () =>
        {
            document.title = "usePopcorn";
        }
    }, [movieInfo?.Title]);

    useEffect(() => {
        function callback(e: KeyboardEvent)
        {
            if (e.code === "Escape")
            {
                onCloseMovie();
            }
        }

        document.addEventListener("keydown", callback)

        return () =>
        {
            document.removeEventListener("keydown", callback);
        }
    }, [onCloseMovie]);

    return (
        <div className="details">
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            {
                isLoading
                    ? <Loader />
                    : <>
                        <header>
                            <img src={movieInfo?.Poster} alt={`Poster of ${movieInfo?.Title} movie`} />
                            <div className="details-overview">
                                <h2>{movieInfo?.Title}</h2>
                                <p>
                                    {movieInfo?.Released} &bull; {movieInfo?.Runtime}
                                </p>
                                <p>{movieInfo?.Genre}</p>
                                <p><span>⭐</span>{movieInfo?.imdbRating} IMDb rating</p>
                            </div>
                        </header>

                        <section>
                            <div className="rating">
                                {
                                    !isWatched ?
                                        <>
                                            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                                            {
                                                userRating > 0 && <button className="btn-add" onClick={handleAddWatched}>+ Add to list</button>
                                            }
                                        </>
                                        : <p>You rated this movie with {watchedUserRating} <span>⭐️</span></p>
                                }
                            </div>
                            <p>
                                <em>{movieInfo?.Plot}</em>
                            </p>
                            <p>Starring: {movieInfo?.Actors}</p>
                            <p>Directed by: {movieInfo?.Director}</p>
                        </section>
                    </>
            }
        </div>
    );
}