import { Movies } from './../../../services/movies';
import { Observable } from 'rxjs';
import { MoviesState } from './../../../store/movies.state';
import { SetMovies } from './../../../store/movies.actions';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetDataService } from '../../../services/get-data.service';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit, AfterViewChecked {

  @Select(MoviesState.getMovies) getMovies$: Observable<Movies[]>;
  @Select(MoviesState.getVisibleMovies) filteredMovies$: Observable<Movies[]>;

  isActiveButton = false;

  showDescription = '';

  title = '';

  movies: Movies[];

  constructor(
    public data: GetDataService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.data.getFilms();

    if (!this.data.movies) {

      this.data.getFilms()
        .subscribe((movies) => {
          this.data.movies = movies.categories[0].videos;
          this.data.movies.forEach(movie => {
            movie.genre = 'action';
          });
          this.store.dispatch(new SetMovies(JSON.parse(JSON.stringify(this.data.movies))));
        });


      if (localStorage.length !== 0) {
        this.setMovie(localStorage);
      }
    }
    this.data.dataForMovieNewWindow = '';
    this.data.currentMovie.subscribe(movie => this.rating(movie));
    if (this.data.movies) {
      this.store.dispatch(new SetMovies(JSON.parse(JSON.stringify(this.data.movies))));
    }

    this.getMovies$.subscribe(mov => this.movies = mov);
  }

  ngAfterViewChecked(): void {
    let sub;
    if (this.data.searchStr) {
      sub = this.filteredMovies$.subscribe(filMov => this.movies = filMov);
    } else if (sub && !this.data.searchStr) {
      sub.unsubscribe();
    }
  }

  public setMovie(movie): void {
    this.data.currentMovie.next(movie);

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
    this.data.dataForMovieNewWindow = item.description;
  }

  public showFullDescription(event: { stopPropagation: () => void; }, item: { description: string; }): void {
    event.stopPropagation();

    this.showDescription = item.description;
  }

  public rating(movie): void {
    if (this.data.ratingData) {
      this.data.ratingData.forEach((element) => {
        if (movie.title === element.title) {
          this.data.ratingValue = element.ratingValue.reduce((pre, cur) => pre + cur) / (element.ratingValue.length - 1);
        }
      });
    } else if (!this.data.ratingData && localStorage.length) {
      this.data.ratingData = [
        {
          title: movie.title,
          ratingValue: [+movie.ratingValue]
        }
      ];

      this.data.ratingData[0].ratingValue.push(0);

      this.data.getFilms()
        .subscribe((movies) => {
          movies.categories[0].videos.forEach(item => {
            if (this.data.ratingData[0].title !== item.title) {
              this.data.ratingData.push({
                title: item.title,
                ratingValue: [0]
              });
            }
          });
        });

      this.data.ratingData.forEach((element) => {
        if (movie.title === element.title) {
          this.data.ratingValue = element.ratingValue.reduce((pre, cur) => pre + cur) / (element.ratingValue.length - 1);
        }
      });
    }
  }
}
