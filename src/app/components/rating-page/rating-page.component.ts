import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.css']
})
export class RatingPageComponent implements OnInit {

  mostPopularMovieTitle: string;
  mostUnpopularMovieTitle: string;

  popular = false;
  unpopular = false;

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
    this.popular = true;
    this.unpopular = false;
  }

  unpopularMovie(): void {
    this.popular = false;
    this.unpopular = true;
  }

}
