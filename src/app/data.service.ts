import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from "./movie-data/movie";
import { MOVIES } from "./movie-data/movie.mock-data";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private http: HttpClient )   { }

  private moviesUrl = 'api/movies';

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any):Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError('getMovies',[]))
      );
  }

  getMovie(movieId): Observable<Movie> {
    const url = `${this.moviesUrl}/$movieId`;
    return this.http.get<Movie>(url)
      .pipe(
        catchError(this.handleError<Movie>(`getMovie id=${movieId}`))
    );
  }

  searchMovies(term: String): Observable<Movie[]>{
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Movie[]>(`{this.moviesUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );    
  }
}
