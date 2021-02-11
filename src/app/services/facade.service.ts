import { SetFilter } from './../store/movies.actions';
import { Movies } from './movies';
import { MoviesState } from './../store/movies.state';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
    @Select(MoviesState.getMovies) allMovies$: Observable<Movies[]>;
    @Select(MoviesState.getVisibleMovies) todos$: Observable<Movies[]>;
    @Select(MoviesState.getFilter) currentFilter$: Observable<string>;

    // countAllTodos$ = this.allMovies$.pipe(map((movies: Movies[]) => movies.length));
    // shouldFooterShow$ = this.countAllTodos$.pipe(map((count: number) => !!count));

    @Dispatch()
    setFilter = (filter: string) => new SetFilter(filter);
}
