import { RatingPageComponent } from './components/layout/rating-page/rating-page.component';
import { EditPageComponent } from './components/layout/edit-page/edit-page.component';
import { FilmListComponent } from './components/content/film-list/film-list.component';
import { MovieNewWindowComponent } from './components/layout/movie-new-window/movie-new-window.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'movie', component: MovieNewWindowComponent},
  {path: '', component: FilmListComponent},
  {path: 'edit-page', component: EditPageComponent},
  {path: 'rating-page', component: RatingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
