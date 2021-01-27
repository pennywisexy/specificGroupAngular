import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {

  public posterUrl = 'https://media.newyorker.com/photos/5de540ecd1eff50008e2095a/master/w_2560%2Cc_limit/2019-Brody-Movies.gif';

  public movie;

  haveMovie = false;
  isRated = false;

  checkedcolor = 'orange';
  uncheckedcolor = '#ccc';
  value = this.data.ratingValue;
  size = '30';
  totalstars = 5;
  readonly = 'false';

  constructor(
    public data: GetDataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMovie.subscribe((movie) => {
      this.movie = movie;
    });
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}): void {
    if (this.data.ratingData === undefined) {
      this.data.ratingData = [{
        title: this.movie.title,
        ratingValue: [$event.newValue]
      }];

      this.data.movies.forEach((movie) => {
        if (this.data.ratingData[0].title !== movie.title) {
          this.data.ratingData.push({
            title: movie.title,
            ratingValue: [0]
          });
        }else {
          this.data.ratingData[0].ratingValue.push(0);
        }
      });
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



    this.ratingToast();
    if (this.data.ratingData) {
      this.data.ratingData.forEach((element) => {
        if (this.movie.title === element.title) {
          $event.starRating.value = element.ratingValue.reduce((pre, cur) => pre + cur) / (element.ratingValue.length - 1);
        }
      });
    }
  }

  ratingToast(): void {
    this.isRated = true;

    setTimeout(() => {
      this.isRated = false;
    }, 1500);
  }

}
