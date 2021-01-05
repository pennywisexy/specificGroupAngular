import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Movie } from './movies';
@Injectable({
  providedIn: 'any'
})
export class GetDataService {
  private moviesUrl = '../../assets/data.json';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public currentMovie: BehaviorSubject<object> = new BehaviorSubject({});

  constructor (private http: HttpClient) {}

  getFilms(): Observable<Movie> {
    return this.http.get<Movie>(this.moviesUrl);
  }
}
