import { RegistrationData, User } from './user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment, Movies } from './movies';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'any'
})
export class GetDataService {
  private moviesUrl = `${environment.apiUrl}/api/movies`;
  private editUrl = `${environment.apiUrl}/api/movies/edit`;
  private registerUrl = `${environment.apiUrl}/register`;
  private loginUrl = `${environment.apiUrl}/login`;
  private logoutUrl = `${environment.apiUrl}/logout`;
  private commentsUrl = `${environment.apiUrl}/api/comments`;


  
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
    const body = {
      title: movie.title,
      description: movie.description,
      sources: movie.sources,
      subtitle: movie.subtitle,
      thumb: movie.thumb,
      ratingValue: +movie.ratingValue,
      _id: movie._id
    };
    return this.http.post<Movies>(this.editUrl, JSON.stringify(body), {
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
      subtitle: movie.subtitle,
      thumb: movie.thumb,
      ratingValue: +movie.ratingValue,
    };

    return this.http.post<Movies>(this.moviesUrl, JSON.stringify(body), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

  registration(user: RegistrationData): Observable<RegistrationData> {
    return this.http.post<RegistrationData>(this.registerUrl, JSON.stringify(user), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

  login(user: User): Observable<User>{
    return this.http.post<User>(this.loginUrl, JSON.stringify(user), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

  logout(): Observable<User>{
    return this.http.get<User>(this.logoutUrl, {
      withCredentials: true
    });
  }

  logged(): void {
    if (localStorage.isLogged === 'true') {
      this.isLogged = true;
    }
  }

  getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.commentsUrl);
  }

  createComment(comment: Comment): Observable<Comment> {
    const body = {
      text: comment.text,
      date: comment.date,
      author: comment.author,
      userId: comment.userId
    };

    return this.http.post<Comment>(this.commentsUrl, JSON.stringify(body), {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }
}
