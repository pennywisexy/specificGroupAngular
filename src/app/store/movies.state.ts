import { FilterType } from './../utils/filter-type.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Movies } from './../services/movies';
import { SetFilter, SetFilterValue, SetMovies } from './movies.actions';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Injectable } from '@angular/core';

export interface MoviesStateModel {
    filter?: string;
    movies?: Movies[];
    filterValue?: string;
}
@State<MoviesStateModel>({
  name: 'store',
  defaults: {
    filter: FilterType.SHOW_ALL,
    movies: [],
    filterValue: ''
  }
})
@Injectable()
export class MoviesState {
  @Receiver()
  public static setFilterValue(ctx: StateContext<MoviesStateModel>, { payload }: EmitterAction<string>): void {
    ctx.patchState({ filterValue: payload });
  }
  @Selector()
  public static getFilter(state: MoviesStateModel): string {
    return state.filterValue;
  }
  @Selector()
  static getVisibleMovies(state: MoviesStateModel, search = ''): Movies[] {
    search = state.filterValue;
    return state.movies.filter(movie => {
      if (movie.description.toLowerCase().includes(search.toLowerCase()) ||
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.genre.toLowerCase().includes(search.toLowerCase())) {
        return movie;
      }
    });
  }
  @Receiver()
  public static setMovies(ctx: StateContext<MoviesStateModel>, { payload }: EmitterAction<Movies[]>): void {
    ctx.patchState({ movies: payload });
  }
  @Selector()
  public static getMovies(state: MoviesStateModel): Movies[] {
    return state.movies;
  }
}