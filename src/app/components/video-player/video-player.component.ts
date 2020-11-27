import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  constructor(
    private data: GetDataService
  ) { }

  public film;

  ngOnInit(): void {
    this.data.currentFilm.subscribe(film => this.film = film);
  }

}
