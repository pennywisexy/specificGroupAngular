import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

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

  public modalDescription(event, description) {
    // const modalDescription = document.createElement("div");
    // modalDescription.className = "modal-description";
    const modal = document.querySelector('.modal-description');
    const modals = (document.querySelectorAll('.modal-description'));
    const buttons = document.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        if (event.target === buttons[i]) {
          modals[i].innerHTML = description;
          modals[i].classList.toggle('modal-description-active');
        }
        if (event.target !== buttons[i]) {
          console.log(buttons[i]);
          modals[i].className = ('modal-description');
        }
  }
  }
}
