import { Movies } from './../../../services/movies';

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
  mostPopularMovieRating: string;

  isSavedRating = false;

  isPopular = true;

  isReset = false;

  title: string;
  thumb: string;
  description: string;

  dbMovies: Movies[];

  constructor(public data: GetDataService) { }

  ngOnInit(): void {
    this.isReset = false;
    this.isSavedRating = true;

    if (localStorage.title) {
      this.isSavedRating = true;
    }else if (!localStorage.length) {
      this.resetRating();
    }
    this.data.getFilms().subscribe(movies => {
      this.dbMovies = movies;
      this.ratingMovie();
      this.getMovie(localStorage.title);
    });
  }

  ratingMovie(): void {
    let ratingArr = [];
    const ratingArrWithTitle = [];

    this.dbMovies.forEach(movie => {
      ratingArrWithTitle.push({
        ratingValue: +movie.ratingValue,
        title: movie.title
      });

      ratingArr.push(+movie.ratingValue);
    });

    ratingArr = ratingArr.filter(elem => elem > 0);
    ratingArr.sort();

    const unPop = ratingArrWithTitle.find(movie => movie.ratingValue === ratingArr[0]);
    const pop = ratingArrWithTitle.find(movie => movie.ratingValue === ratingArr[ratingArr.length - 1]);

    if (unPop) {
      if (+unPop.ratingValue && ratingArr.length > 1) {
        this.mostUnpopularMovieTitle = unPop.title;
        this.mostUnpopularMoviePoint = +unPop.ratingValue.toFixed(2);
      }
    }
    
    if (pop) {
      if (+pop.ratingValue) {
        this.mostPopularMovieTitle = pop.title;
        this.mostPopularMoviePoint = +pop.ratingValue.toFixed(2);
        localStorage.title = this.mostPopularMovieTitle;
      }
    }
  }

  setRatedMovie(): void {
    this.isPopular = !this.isPopular;
  }

  resetRating(): void {
    localStorage.removeItem('title');
    localStorage.removeItem('ratingValue');
    localStorage.removeItem('description');
    localStorage.removeItem('sources');
    localStorage.removeItem('subtitle');
    localStorage.removeItem('thumb');
    localStorage.removeItem('lastMovie');

    this.isSavedRating = false;

    this.dbMovies.forEach(movie => {
      movie.ratingValue = 0;
      this.data.editMovie(movie).subscribe();
    });

    this.isReset = true;
    this.mostPopularMovieTitle = 'No ratings yet';
    this.mostPopularMovieRating = '';
  }

  getMovie(title: string): void {
    this.dbMovies.forEach(elem => {
      if (elem.title === title) {
        this.description = elem.description;
        this.title = elem.title;
        this.thumb = elem.thumb;
      }
    });

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
