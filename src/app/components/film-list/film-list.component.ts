import { Movie } from './../../services/movies';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  isActiveButton = false;

  showDescription = '';

  title = '';

  constructor(
    public data: GetDataService,
  ) { }

  ngOnInit(): void {
    this.data.getFilms();

    if (this.data.movies === undefined) {
      this.data.getFilms()
        .subscribe((movies) => this.data.movies = movies.categories[0].videos);
    }

    this.data.dataForMovieNewWindow = '';
    this.data.currentMovie.subscribe(movie => this.rating(movie));

  }

  public setMovie(movie: object): void {
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
    }
  }
}
