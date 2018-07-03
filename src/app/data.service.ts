import { Injectable} from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie,MoviesByGenre } from "./movie-data/movie";
import { genreType,GenreType } from "./movie-data/movie.model";
import { MOVIES } from "./movie-data/movie.mock-data";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  movies_by_genre_array: MoviesByGenre[];

  constructor() { }

// Return observable of type Movie[]
  getMovies(): Observable<Movie[]> {
    return of(MOVIES);
  }

// Get movie by id and return observable of type Movie
  getMovie(movieId): Observable<Movie> {
    for (var movie in MOVIES) {
      if (MOVIES.hasOwnProperty(movie)) {
        var element = MOVIES[movie];
        if (element.id == movieId) {
          return of(element);
        }
      }
    }
  }

// Get list of all genres
  getGenres(): Observable<any>{
    let genre_list: GenreType[];
    let genre_keys = Object.keys(genreType);
    genre_list = [];
    for (var key in genre_keys) {
      genre_list.push(genreType[genre_keys[key]]);
    }
    return of(genre_list);
  }

//generate datastructure categorizing movies by genre
  generateMoviesByGenreArray(){
    let movies_by_genre: MoviesByGenre;
    let genre_keys = Object.keys(genreType);
    this.movies_by_genre_array = [];
    movies_by_genre = new MoviesByGenre;
    for (let key in genre_keys) {
      MOVIES.forEach(element => {
        movies_by_genre.genre = genreType[genre_keys[key]] as GenreType;
        if (element.genres.includes(genreType[genre_keys[key]])) {
          movies_by_genre.movie.push(element);
        }
      });
      this.movies_by_genre_array.push(movies_by_genre);
      movies_by_genre=new MoviesByGenre;
    }
  }

//returns observable of tyepe Movie[], where each element belonging to the supplied  genre
  getMoviesByGenre(genre: GenreType): Observable<Movie[]>{
    let result: Movie[];
    result = [];
    this.movies_by_genre_array.forEach(element => {
      if (element.genre == genre) {
        result = element.movie;
      }
    });
    return of(result);
  }

// returns observable of type Movie[], where each element has term in its name
  getMovieBySearchTerm(text: Object): Observable<Movie[]>{
    let movies: Movie[];
    console.log(text['term']);
    movies = MOVIES.filter(v => v.name.toLowerCase().indexOf(text['term'].toLowerCase()) > -1);
    console.log(movies);
    return of(movies);
  }
}

