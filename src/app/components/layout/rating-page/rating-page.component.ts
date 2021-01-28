import { FilmListComponent } from './../../content/film-list/film-list.component';
import { Movie } from '../../../services/movies';
import { GetDataService } from '../../../services/get-data.service';
import { Component, OnInit, Output } from '@angular/core';
import { element } from 'protractor';

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
  mostPopularMovieRating: string;

  isSavedRating = false;

  isPopular = true;

  isReset = false;

  title: string;
  thumb: string;
  description: string;

  constructor(public data: GetDataService) { }

  ngOnInit(): void {
    this.isReset = false;
    this.ratingMovie();

    if (localStorage.length !== 0) {
      this.isSavedRating = true;
      this.getMovie(localStorage.title);
    }
  }

  ratingMovie(): void {
    const ratingArr = [];
    const ratingArrWithTitle = [];
    let average: number;

    if (this.data.ratingData === undefined) {
      this.mostPopularMovieTitle = 'No ratings yet';
      if (localStorage.length !== 0) {
        this.mostPopularMovieTitle = localStorage.title;
        this.mostPopularMovieRating = `Movie rating: ${localStorage.ratingValue} points`;
      }

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
    this.isSavedRating = false;

    ratingArrWithTitle.forEach((elem) => {
      if (elem[1] === ratingArr[ratingArr.length - 1]) {
        this.mostPopularMovieTitle = elem[0];
        this.mostPopularMoviePoint = elem[1].toFixed(2);

        localStorage.clear();

        localStorage.ratingValue = this.mostPopularMoviePoint;
        localStorage.title = this.mostPopularMovieTitle;


        const movie = this.data.movies.find(el => el.title === localStorage.title);

        localStorage.description = movie.description;
        localStorage.sources = movie.sources;
        localStorage.subtitle = movie.subtitle;
        localStorage.thumb = movie.thumb;
      }
      if (elem[1] === ratingArr[0]) {
        const unPop = ratingArr.find(item => item !== ratingArr[ratingArr.length - 1]);

        if (unPop) {
          this.mostUnpopularMovieTitle = elem[0];
          this.mostUnpopularMoviePoint = elem[1].toFixed(2);
        } else {
          this.mostUnpopularMovieTitle = '';
        }

      }
    });
  }

  setRatedMovie(): void {
    this.isPopular = !this.isPopular;
  }

  resetRating(): void {
    localStorage.clear();
    this.isSavedRating = false;

    if (this.data.ratingData) {
      this.data.ratingData.forEach((obj) => {
        obj.ratingValue = [0];
      });
    }
    this.isReset = true;
    this.mostPopularMovieTitle = 'No ratings yet';
    this.mostPopularMovieRating = '';
  }

  getMovie(title): void {
    if (title && this.data.movies) {
      this.data.movies.forEach(elem => {
        if (elem.title === title) {
          this.description = elem.description;
          this.title = elem.title;
          this.thumb = elem.thumb;
        }
      });
    }

    if (!this.data.movies && localStorage.length !== 0) {
      this.description = localStorage.description;
      this.title = localStorage.title;
      this.thumb = localStorage.thumb;
    }

  }

  getPopularMovie(title): void {
    this.isPopular = true;

    this.getMovie(title);
  }

  getUnpopularMovie(title): void {
    this.isPopular = false;

    this.getMovie(title);
  }

}
