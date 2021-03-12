import { Movies } from './../../../services/movies';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  public posterUrl = 'https://media.newyorker.com/photos/5de540ecd1eff50008e2095a/master/w_2560%2Cc_limit/2019-Brody-Movies.gif';

  public movie;
  dbMovies: Movies[];

  haveMovie = false;
  isRated = false;

  checkedcolor = 'orange';
  uncheckedcolor = '#ccc';
  value = this.data.ratingValue;
  size = '30';
  totalstars = 5;
  readonly = 'false';

  currentTime: string;
  videoEvent: string;
  isCurrentTime = true;

  constructor(
    public data: GetDataService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data.getFilms().subscribe(movies => {
      this.dbMovies = movies;
    });

    this.data.currentMovie.subscribe((movie) => {
      this.movie = movie;
    });
    this.isCurrentTime = true;

    if (this.activateRoute.snapshot.params['id']) {
      const id = this.activateRoute.snapshot.params['id'];
      this.data.getMovieById(id).subscribe(movie => {
        this.movie = movie;
        this.data.dataForMovieNewWindow = movie;
      });
    }
  }

  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.muted = true;
    this.videoPlayer.nativeElement.play();
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}): void {
    this.dbMovies.forEach((movieItem) => {
      if (movieItem._id === this.movie._id) {
        if (+movieItem.ratingValue === 0) {
          movieItem.ratingValue = +$event.newValue;
        } else {
          movieItem.ratingValue = (+movieItem.ratingValue + +$event.newValue) / 2;
        }
        this.haveMovie = true;
        this.data.editMovie(movieItem).subscribe(movie => movie);
        $event.starRating.value = movieItem.ratingValue;
        this.data.ratingValue = movieItem.ratingValue;
      } else {
        this.haveMovie = false;
      }
    });
    this.ratingToast();
  }

  ratingToast(): void {
    this.isRated = true;

    setTimeout(() => {
      this.isRated = false;
    }, 1500);
  }

  getCurrentTime(event): void {
    this.videoEvent = event;
    this.currentTime = event.target.currentTime;
    if (localStorage[`currentTime ${this.movie.title}`] && this.isCurrentTime) {
      this.videoPlayer.nativeElement.currentTime = localStorage[`currentTime ${this.movie.title}`];
      this.isCurrentTime = false;
    }
    localStorage[`currentTime ${this.movie.title}`] = this.currentTime;
    this.data.videoCurrentTime = localStorage[`currentTime ${this.movie.title}`];
  }
}
