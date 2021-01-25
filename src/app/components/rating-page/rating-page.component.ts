import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.scss']
})
export class RatingPageComponent implements OnInit {

  mostPopularMovieTitle: string;
  mostUnpopularMovieTitle: string;

  isPopular = false;
  isUnpopular = false;

  constructor(public data: GetDataService) { }

  ngOnInit(): void {
    this.ratingMovie();
  }

  ratingMovie(): void {
    const ratingArr = [];
    const ratingArrWithTitle = [];
    let average: number;

    if(this.data.ratingData === undefined) {
      this.mostPopularMovieTitle = 'No ratings yet';
      this.mostUnpopularMovieTitle = 'No ratings yet';
      return
    }

    this.data.ratingData.forEach((obj) => {
      average = obj.ratingValue.reduce((pre, cur) => pre + cur);
      average = average / obj.ratingValue.length;
      ratingArr.push(average);
      ratingArrWithTitle.push([obj.title, average]);
    });

    ratingArr.sort();

    ratingArrWithTitle.forEach((elem) => {
      if (elem[1] === ratingArr[ratingArr.length - 1]) {
        this.mostPopularMovieTitle = elem[0];
      }
      if (elem[1] === ratingArr[0]) {
        this.mostUnpopularMovieTitle = elem[0];
      }
    });
  }

  popularMovie(): void {
    this.isPopular = true;
    this.isUnpopular = false;
  }

  unpopularMovie(): void {
    this.isPopular = false;
    this.isUnpopular = true;
  }

}
