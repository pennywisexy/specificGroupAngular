import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {

  public posterUrl = 'https://media.newyorker.com/photos/5de540ecd1eff50008e2095a/master/w_2560%2Cc_limit/2019-Brody-Movies.gif';

  public movie;

  haveMovie = false;

  checkedcolor = "orange";
  uncheckedcolor = "#ccc";
  value = 0;
  size = '30';
  totalstars = 5;
  readonly = 'false';

  constructor(
    public data: GetDataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMovie.subscribe((movie) => this.movie = movie);
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}): void {

    if (this.data.ratingData === undefined) {
      this.data.ratingData = [{
        title: this.movie.title,
        ratingValue: [$event.newValue]
      }];
    } else {
      this.haveMovie = false;

      this.data.ratingData.forEach((obj) => {
        if (obj.title === this.movie.title) {
          obj.ratingValue.push($event.newValue);
          this.haveMovie = true;
        }
      });

      if (!this.haveMovie) {
        this.data.ratingData.push({
          title: this.movie.title,
          ratingValue: [$event.newValue]
        });
      }
    }
  }
}
