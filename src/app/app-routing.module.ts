import { EditPageComponent } from './components/edit-page/edit-page.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { MovieNewWindowComponent } from './components/movie-new-window/movie-new-window.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'movie', component: MovieNewWindowComponent},
  {path: '', component: FilmListComponent},
  {path: 'edit-page', component: EditPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
