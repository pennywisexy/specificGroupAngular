import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Film } from './films';
@Injectable({
  providedIn: 'any'
})
export class GetDataService {
  private filmsUrl = '../../assets/data.json';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public currentFilm: BehaviorSubject<object> = new BehaviorSubject({});

  constructor (private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl);
  }
  public setCurrentFilm(film) {
    this.currentFilm.next(film);
  }
}
