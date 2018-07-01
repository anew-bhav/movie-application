import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { 
    debounceTime, distinctUntilChanged, switchMap 
  } from 'rxjs/operators';

import { Movie } from '../../movie-data/movie';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private dataService: DataService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dataService.searchMovies(term) ),
    );
  }

}
