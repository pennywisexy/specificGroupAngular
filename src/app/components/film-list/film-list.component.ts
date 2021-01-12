import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  isActiveButton: boolean = false;
  showDescription: string = '';
  title: string = '';

  public movies: Array<{
    description: string,
    sources: [string],
    subtitle: string,
    thumb: string,
    title: string
  }>;

  constructor(
    private data: GetDataService
  ) { }

  ngOnInit(): void {
    this.data.getFilms()
    .subscribe(movies => this.movies = movies.categories[0].videos);
  }

  public setMovie(movie) {
    this.data.currentMovie.next(movie);
  }

  public modalDescription(item): void {
    if(item.title !== this.title) {
      this.title = item.title;
      this.showDescription = item.description;
      this.isActiveButton = true;
    }else {
      this.title = item.title;
      this.showDescription = item.description;
      this.isActiveButton = !this.isActiveButton;
    }
  }
}



// [ngClass]="{'active': isActiveButton}"
