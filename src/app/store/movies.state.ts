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
  static setValue(ctx: StateContext<MoviesStateModel>, action: EmitterAction<string>): void {
    ctx.setState({ filterValue: action.payload });
  }
  @Selector()
  static getMovies(state: MoviesStateModel): Movies[] {
    return state.movies;
  }

  @Selector()
  static getFilter(state: MoviesStateModel): string {
    return state.filter;
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
  @Action(SetMovies)
  setMovies({ setState }: StateContext<MoviesStateModel>, { payload }: SetMovies): void {
    setState(
      patch<MoviesStateModel>({
        movies: payload 
      })
    );
  }
  @Action(SetFilter)
  filter({ setState }: StateContext<MoviesStateModel>, { payload }: SetFilter): void {
    setState(
      patch<MoviesStateModel>({
        filter: payload
      })
    );
  }
  @Action(SetFilterValue)
  updateFilter({patchState}: StateContext<MoviesStateModel>, { payload }: SetFilterValue): void {
    patchState({ filterValue: payload });
  }
}