import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {

  public posterUrl = 'https://media.newyorker.com/photos/5de540ecd1eff50008e2095a/master/w_2560%2Cc_limit/2019-Brody-Movies.gif';

  public movie;

  constructor(
    public data: GetDataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMovie.subscribe((movie) => this.movie = movie);
  }
}
