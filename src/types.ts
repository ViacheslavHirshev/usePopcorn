export interface Movie
{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface WatchedMovie extends Movie
{
    runtime: number;
    imdbRating: number;
    userRating: number;
}

export interface OMDBJsonData
{
    Search: Movie[];
    totalResults: string;
    Response: "True" | "False";
}