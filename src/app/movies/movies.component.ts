import { Component, OnInit} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule,FormBuilder,FormGroup } from '@angular/forms';
import { Observable,of } from "rxjs";

import { GenreType } from '../movie-data/movie.model'
import { Movie } from '../movie-data/movie';
import { DataService } from '../data.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  
  movies: Movie[];
  genres: GenreType[];
  genre_selected: GenreType;
  term: Observable<string>;
  search: FormGroup;

  constructor(private dataService: DataService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
    this.dataService.generateMoviesByGenreArray();
    this.search = this.fb.group({
      term: ''
    });
    this.onInputChanged();
  }

// getMovies() method is used to fetch all the Movies from data service. 
// The fetched details are stored in movies: Movie[] variable.
  getMovies(): void {
    this.dataService.getMovies()
      .subscribe(movies => this.movies = movies );
  }

// getGenres() method is used to fetch all the Genres from data service.
// The fetched details are stored in genres: GenreType[] variable.
  getGenres(): void {
    this.dataService.getGenres()
        .subscribe(genres => this.genres = genres);
  }

// getMoviesByGenre(genre: Genretype) is used to fetch movie which belong to a specific genre
// The fetched details are stored in movies: Movie[] variable.
  getMoviesByGenre(genre: GenreType) {
    this.dataService.getMoviesByGenre(genre)
        .subscribe(movies => this.movies = movies);
  }

// getMoviesBySearchTerm(term: string) is used to fetch all the movies
// whose name property has term in it
  getMoviesBySearchTerm(term: string) {
    this.dataService.getMovieBySearchTerm(term)
        .subscribe(movies => this.movies = movies);
  }

// onInputChanged() is a utility method to reads the character stream from search utility 
// and passes the characters to getMoviesBySearchTerm() method
  onInputChanged(){
    this.search.valueChanges.subscribe(term => this.getMoviesBySearchTerm(term));
  }

// onGenreSelected() is used update movies instance variable as per the genre selected
  onGenreSelected(val: any){
    if(val === "All"){
      this.getMovies();
    }
    else{
      this.getMoviesByGenre(val);
    }
    
  }
}
