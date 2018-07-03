import { WindowModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { UiModule } from './ui/ui.module'
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesDetailComponent } from './movies-detail/movies-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesDetailComponent,
  ],
  imports:[
 CommonModule,
WindowModule,
 
    
    AppRoutingModule,
    NgbModule.forRoot(),
    UiModule,
    FormsModule,
    ReactiveFormsModule  ],

  providers: [],
})
export class AppModule { }
