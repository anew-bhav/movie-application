import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component'
import { MoviesDetailComponent } from './movies-detail/movies-detail.component'
import { AppComponent } from './app.component'

const routes: Routes = [
  {
    path:'',
    component: MoviesComponent
  },
  {
    path:'movies-detail/:id',
    component: MoviesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
