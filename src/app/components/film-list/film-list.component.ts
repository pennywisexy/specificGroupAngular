import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit {
  isActiveButton = false;

  showDescription = '';

  title = '';

  // public movies: Array<{
  //   description: string,
  //   sources: [string],
  //   subtitle?: string,
  //   thumb?: string,
  //   title: string
  // }>;

  constructor(
    public data?: GetDataService,
  ) { }

  ngOnInit(): void {
    this.data.getFilms()
      .subscribe((movies) => this.data.movies = movies.categories[0].videos);
    this.data.dataForMovieNewWindow = '';
  }

  public setMovie(movie): void {
    this.data.currentMovie.next(movie);
  }

  public modalDescription(item): void {
    if (item.title !== this.title) {
      this.title = item.title;
      this.showDescription = item.description;
      this.isActiveButton = true;
    } else {
      this.isActiveButton = !this.isActiveButton;
    }
  }

  public movieNewWindow(item): void {
    this.data.currentMovie.next(item);
    this.data.dataForMovieNewWindow = item.description;
  }
}
