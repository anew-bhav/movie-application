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


  getMovies(): Observable<Movie[]> {
    return of(MOVIES);
  }

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

  getGenres(): Observable<any>{
    let genre_list: GenreType[];
    let genre_keys = Object.keys(genreType);
    genre_list = [];
    for (var key in genre_keys) {
      genre_list.push(genreType[genre_keys[key]]);
    }
    return of(genre_list);
  }

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
    console.log(this.movies_by_genre_array);
  }

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


}

