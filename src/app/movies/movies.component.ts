import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie-data/movie';
import { DataService } from '../data.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  
  movies : Movie[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.dataService.getMovies()
      .subscribe(movies => this.movies = movies );
  }
}
