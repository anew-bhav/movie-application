import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Movie } from "../movie-data/movie"
import { NgbRating } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.scss']
})
export class MoviesDetailComponent implements OnInit {
  
    movie: Movie;
  
    constructor(private route: ActivatedRoute, private data: DataService) { 
      this.route.params.subscribe( params => this.movie = params.id )
    }
  
    ngOnInit() {
      this.data.getMovie(this.movie).subscribe(
        data => this.movie = data
      );
      this.movie.rate = parseFloat(this.movie.rate);
    }
  
  }