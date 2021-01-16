import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  constructor(
    public data: GetDataService,
  ) { }

  public movie;

  ngOnInit(): void {
    this.data.currentMovie.subscribe((movie) => this.movie = movie);
  }
}
