export interface IMovie
{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface IWatchedMovie extends IMovie
{
    runtime: number;
    imdbRating: number;
    userRating: number;
}

export interface IOMDBJsonData
{
    Search: IMovie[];
    totalResults: string;
    Response: "True" | "False";
}

export interface IMovieDetails
{
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: [{ Source: string, Value: string }];
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
}