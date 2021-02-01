import { RegistrationData, User } from './user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  dataForMovieNewWindow = '';

  public ratingData: Array<{
    title: string,
    ratingValue: [number]
  }>;

  public movies: Array<{
    description: string,
    sources: [string],
    subtitle?: string,
    thumb?: string,
    title: string,
    ratingValue?: number
  }>;

  public ratingValue: number;

  user: User;
  userRegData: [RegistrationData];
  isLogged = false;

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Movie> {
    return this.http.get<Movie>(this.moviesUrl);
  }
}
