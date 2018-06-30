import { GenreType } from './movie.model'
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