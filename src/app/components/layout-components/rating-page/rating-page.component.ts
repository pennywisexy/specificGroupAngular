import { GetDataService } from '../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.scss']
})

export class RatingPageComponent implements OnInit {

  mostPopularMovieTitle: string;
  mostPopularMoviePoint: number;
  mostUnpopularMovieTitle: string;
  mostUnpopularMoviePoint: number;

  isPopular = true;

  constructor(public data: GetDataService) { }

  ngOnInit(): void {
    this.ratingMovie();
  }

  ratingMovie(): void {
    const ratingArr = [];
    const ratingArrWithTitle = [];
    let average: number;

    if (this.data.ratingData === undefined) {
      this.mostPopularMovieTitle = 'No ratings yet';
      this.mostUnpopularMovieTitle = 'No ratings yet';
      return;
    }

    this.data.ratingData.forEach((obj) => {
      if (obj.ratingValue.length !== 1) {
        average = obj.ratingValue.reduce((pre, cur) => pre + cur);
        average = average / (obj.ratingValue.length - 1);
        ratingArr.push(average);
        ratingArrWithTitle.push([obj.title, average]);
      }

    });

    ratingArr.sort();

    ratingArrWithTitle.forEach((elem) => {
      if (elem[1] === ratingArr[ratingArr.length - 1]) {
        this.mostPopularMovieTitle = elem[0];
        this.mostPopularMoviePoint = elem[1].toFixed(2);
      }
      if (elem[1] === ratingArr[0]) {
        this.mostUnpopularMovieTitle = elem[0];
        this.mostUnpopularMoviePoint = elem[1].toFixed(2);
      }
    });
  }

  setRatedMovie(): void {
    this.isPopular = !this.isPopular;
  }

}
