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

  constructor(private data: GetDataService) {
  }

  ngOnInit(): void {
    this.movieDescription = this.data.dataForMovieNewWindow;

    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
      author: new FormControl(null),
      date: new FormControl(null),
      userId: new FormControl(null)
    });

    this.data.getComments().subscribe(comments => this.comments = comments);
  }

  submit(): void {
    const comment: Comment = {
      text: this.form.value.text,
      author: `${this.data.user.name}`,
      date: new Date(),
      userId: this.data.user._id
    };
    console.log(comment);
    this.data.createComment(comment).subscribe(() => this.form.reset());
  }
}
