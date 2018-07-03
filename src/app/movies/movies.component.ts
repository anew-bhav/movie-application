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

  getMovies(): void {
    this.dataService.getMovies()
      .subscribe(movies => this.movies = movies );
  }

  getGenres(): void {
    this.dataService.getGenres()
        .subscribe(genres => this.genres = genres);
  }

  getMoviesByGenre(genre: GenreType) {
    this.dataService.getMoviesByGenre(genre)
        .subscribe(movies => this.movies = movies);
  }

  getMoviesBySearchTerm(term: string) {
    this.dataService.getMovieBySearchTerm(term)
        .subscribe(movies => this.movies = movies);
  }

  onInputChanged(){
    this.search.valueChanges.subscribe(term => this.getMoviesBySearchTerm(term));
  }

  onGenreSelected(val: any){
    if(val === "All"){
      this.getMovies();
    }
    else{
      this.getMoviesByGenre(val);
    }
    
  }
}
