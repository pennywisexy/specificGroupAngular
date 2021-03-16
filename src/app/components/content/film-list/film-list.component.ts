import { Movies } from './../../../services/movies';
import { Observable, Subscription } from 'rxjs';
import { MoviesState } from './../../../store/movies.state';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GetDataService } from '../../../services/get-data.service';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit, AfterViewChecked {

  @Select(MoviesState.getMovies) getMovies$: Observable<Movies[]>;
  @Select(MoviesState.getVisibleMovies) filteredMovies$: Observable<Movies[]>;

  @Emitter(MoviesState.setMovies) setMovies: Emittable<Movies[]>;


  isActiveButton = false;

  showDescription = '';

  title = '';

  movies: Movies[];

  constructor(
    public data: GetDataService
  ) { }

  ngOnInit(): void {
    if (!this.data.movies) {
      this.data.getFilms()
        .subscribe((movies) => {
          this.data.movies = movies.reverse();
          this.data.movies.forEach(movie => {
            movie.genre = 'action';
          });
          this.setMovies.emit(this.data.movies);
        });

      
      if (localStorage.title) {
        this.setMovie(localStorage);
      } else if (!localStorage.title && localStorage.lastMovie) {
        this.setMovie(JSON.parse(localStorage.lastMovie));
      }
    }

    // this.data.dataForMovieNewWindow = '';
    this.data.currentMovie.subscribe(movie => this.rating(movie));

    if (this.data.movies) {
      this.setMovies.emit(this.data.movies);
    }

    this.getMovies$.subscribe(mov => this.movies = mov);
    localStorage.locale = this.data.locale;
  }



  ngAfterViewChecked(): void {
    let sub: Subscription;
    if (this.data.searchStr) {
      sub = this.filteredMovies$.subscribe(filMov => this.movies = filMov);
    } else if (sub && !this.data.searchStr) {
      sub.unsubscribe();
    }

  }

  public setMovie(movie): void {
    this.data.currentMovie.next(movie);
    localStorage.lastMovie = JSON.stringify(movie);

    if (this.isActiveButton) {
      this.isActiveButton = false;
    }

    this.rating(movie);
  }

  public modalDescription(event: { stopPropagation: () => void; }, item: { title: string; description: string; }): void {
    event.stopPropagation();

    if (item.title !== this.title) {
      this.title = item.title;
      this.showDescription = item.description.substr(0, 30) + '...';
      this.isActiveButton = true;
    } else {
      this.isActiveButton = !this.isActiveButton;
    }
  }

  public movieNewWindow(item): void {
    this.data.currentMovie.next(item);
    this.data.dataForMovieNewWindow = item;
  }

  public showFullDescription(event: { stopPropagation: () => void; }, item: { description: string; }): void {
    event.stopPropagation();

    this.showDescription = item.description;
  }

  public rating(movie): void {
    this.data.ratingValue = movie.ratingValue;
  }
}
