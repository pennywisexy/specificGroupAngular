import { RatingPageComponent } from './components/layout-components/rating-page/rating-page.component';
import { EditPageComponent } from './components/layout-components/edit-page/edit-page.component';
import { FilmListComponent } from './components/content-components/film-list/film-list.component';
import { MovieNewWindowComponent } from './components/layout-components/movie-new-window/movie-new-window.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'movie', component: MovieNewWindowComponent},
  {path: '', component: FilmListComponent},
  {path: 'edit-page', component: EditPageComponent},
  {path: 'rating-page', component: RatingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
