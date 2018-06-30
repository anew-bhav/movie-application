import { GenreType } from './movie.model'
export class Movie{
    id: Number;
    key: String;
    name: String;
    description: String;
    genres: Array<GenreType>;
    rate: String;
    length: String;
    img: String;
}