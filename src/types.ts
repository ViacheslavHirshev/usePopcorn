export interface Movie
{
    imdbID: string;
    title: string;
    year: string;
    poster: string;
}

export interface WatchedMovie extends Movie
{
    runtime: number;
    imdbRating: number;
    userRating: number;
}