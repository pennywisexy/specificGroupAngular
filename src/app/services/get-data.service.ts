import { RegistrationData, User } from './user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movies } from './movies';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'any'
})
export class GetDataService {
  private moviesUrl = `${environment.apiUrl}/api/movies`;
  private editUrl = `${environment.apiUrl}/api/movies/edit`;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  public currentMovie: BehaviorSubject<object> = new BehaviorSubject({});

  dataForMovieNewWindow = '';

  public ratingData: Array<{
    title: string,
    ratingValue: [number]
  }>;

  public movies: Movies[];

  public ratingValue: number;

  user: User;
  userRegData: [RegistrationData];
  isLogged = false;

  searchStr = '';
  searchBy = 'title';

  videoCurrentTime: string;

  locale = 'en';

  isDarkTheme = false;

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.moviesUrl);
  }

  editMovie(movie: Movies): Observable<Movies> {
    console.log(movie);
    return this.http.post<Movies>(this.editUrl, JSON.stringify(movie), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

  addMovie(movie: Movies): Observable<Movies> {
    const body = {
      title: movie.title,
      description: movie.description,
      sources: movie.sources,
      subtitle: movie.sources,
      thumb: movie.thumb
    };

    return this.http.post<Movies>(this.moviesUrl, JSON.stringify(body), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

  logged(): void {
    if (localStorage.isLogged === 'true') {
      this.isLogged = true;
    }
  }
}
