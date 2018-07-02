import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
    this.dataService.generateMoviesByGenreArray();
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

  onGenreSelected(val: any){
    if(val === "All"){
      this.getMovies();
    }
    else{
      this.getMoviesByGenre(val);
    }
    
  }
}
