import { Movies } from './movies';
import { MoviesState } from './../store/movies.state';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
    @Select(MoviesState.getMovies) allMovies$: Observable<Movies[]>;
    @Select(MoviesState.getVisibleMovies) todos$: Observable<Movies[]>;
    @Select(MoviesState.getFilter) currentFilter$: Observable<string>;
}
