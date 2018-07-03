import { GenreType } from './movie.model'

// Class structure of Movie Class, which facilitates retrieval of information
export class Movie{
    id: Number;
    key: String;
    name: String;
    description: String;
    genres: Array<GenreType>;
    rate: any;
    length: String;
    img: String;
}

// Class structure for storing movies by each genre
export class MoviesByGenre{
    constructor(){
        this.movie = [];
    }
    genre: GenreType;
    movie: Movie[];
}