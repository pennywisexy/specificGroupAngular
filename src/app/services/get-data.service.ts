import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import data from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private films = data.categories[0].videos;
  public currentFilm: BehaviorSubject<object> = new BehaviorSubject({});


  constructor() {
  }

  public get getFilms() {
    return this.films;
  }

  public setCurrentFilm(film) {
    this.currentFilm.next(film);
  }

}
