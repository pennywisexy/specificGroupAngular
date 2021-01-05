import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  public movies: Array<any>

  constructor(
    private data: GetDataService
  ) { }

  ngOnInit(): void {
    this.data.getFilms()
    .subscribe(movies => this.movies = movies.categories[0].videos)
  }

  public setMovie(movie) {
    console.log()
    this.data.currentMovie.next(movie)
  }

}
