import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie } from "./movie-data/movie";
import { genreType,GenreType } from "./movie-data/movie.model";
import { MOVIES } from "./movie-data/movie.mock-data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
      return of(genreType);
  }

  getMovieByGenre(genre: GenreType): Observable<Movie[]>{
    let movies_by_name: Movie[];
    movies_by_name = [];
    if(genre in genreType){
      for (var movie in MOVIES) {
        if (MOVIES.hasOwnProperty(movie)) {
          var element = MOVIES[movie];
          if(element.genres.includes(genre)){
            movies_by_name.push(element);
          }
        }
      }
    }
    return of(movies_by_name);
  }

  

  }

