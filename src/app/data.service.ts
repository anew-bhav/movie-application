import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie } from "./movie-data/movie";
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
  
}
