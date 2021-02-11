import { Movies } from './../services/movies';

export enum ActionsType {
    SET_FILTER = '[FILTER] set filter',
    SET_MOVIES = '[Movies] Set movies'
}

export class SetFilter {
    public static readonly type = ActionsType.SET_FILTER;
    constructor(public payload: string) {}
}

export class SetFilterValue {
    public static readonly type = ActionsType.SET_FILTER;
    constructor(public payload: string) {}
}

export class SetMovies {
    static readonly type = ActionsType.SET_MOVIES
    constructor(public payload: Movies[]) {}
}
