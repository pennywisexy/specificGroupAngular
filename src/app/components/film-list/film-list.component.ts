import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  public films = [];

  constructor(
    private data: GetDataService
  ) { }

  ngOnInit(): void {
    this.films = this.data.getFilms;
  }

  public setFilm(film) {
    this.data.setCurrentFilm(film);
  }

}
