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

  comments: Comment[];
  isCommented = false;
  isValid = false;

  constructor(public data: GetDataService) {
  }

  ngOnInit(): void {
    if (this.data.dataForMovieNewWindow) {
      this.movieDescription = this.data.dataForMovieNewWindow.description;
      this.data.getComments(this.data.dataForMovieNewWindow._id).subscribe(comments => {
        this.comments = comments;
        if (this.comments) {
          this.comments.reverse();
        }
      });
    }
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
      author: new FormControl(null),
      date: new FormControl(null),
      userId: new FormControl(null),
      movieId: new FormControl(null)
    });

  }

  submit(): void {
    const comment: Comment = {
      text: this.form.value.text,
      author: `${this.data.user.name}`,
      date: new Date(),
      userId: this.data.user._id,
      movieId: this.data.dataForMovieNewWindow._id
    };
    this.data.createComment(comment).subscribe((com) => {
      this.comments.unshift(com);
      this.form.reset();
    });
  }
}
