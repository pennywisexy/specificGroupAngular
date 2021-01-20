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
  }

  public setMovie(movie): void {
    this.data.currentMovie.next(movie);

    if(this.isActiveButton) {
      this.isActiveButton = false
    }
  }

  public modalDescription(event, item): void {
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

  public showFullDescription(event, item): void {
    event.stopPropagation();

    this.showDescription = item.description;
  }
}
