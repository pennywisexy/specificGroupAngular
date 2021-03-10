import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { OnInit, Component } from '@angular/core';
import { Comment } from 'src/app/services/movies';

@Component({
  selector: 'app-movie-new-window',
  templateUrl: './movie-new-window.component.html',
  styleUrls: ['./movie-new-window.component.scss']
})

export class MovieNewWindowComponent implements OnInit {

  movieDescription = '';
  form: FormGroup;

  constructor(private data: GetDataService) {
  }

  ngOnInit(): void {
    this.movieDescription = this.data.dataForMovieNewWindow;

    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
      author: new FormControl(null),
      date: new FormControl(null),
    });
  }

  submit(): void {
    const comment: Comment = {
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    };

    console.log(comment, this.data.userRegData);
  }
}
