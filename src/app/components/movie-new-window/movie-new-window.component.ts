import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-new-window',
  templateUrl: './movie-new-window.component.html',
  styleUrls: ['./movie-new-window.component.css']
})

export class MovieNewWindowComponent implements OnInit {

  movieDescription = '';

  constructor(private data?: GetDataService) {
  }

  ngOnInit(): void {
    this.movieDescription = this.data.dataForMovieNewWindow;
  }
}
