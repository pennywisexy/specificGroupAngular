import { Movies } from './../../../services/movies';
import { Observable } from 'rxjs';
import { MoviesState } from './../../../store/movies.state';
import { GetDataService } from '../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  @Select(MoviesState.getMovies) getMovies$: Observable<Movies[]>;

  @Emitter(MoviesState.setMovies) setMovies: Emittable<Movies[]>;


  form: FormGroup;

  editBtn = false;

  formData;

  itemId;

  notification = false;

  movies: Movies[];

  constructor(
    public data: GetDataService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies$.subscribe(mov => this.movies = mov);
    
    if (this.data.movies === undefined) {
      this.data.getFilms()
        .subscribe((movies) => {
          this.data.movies = movies.reverse();
          this.setMovies.emit(this.data.movies);
        });
    }

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      sources: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      thumb: new FormControl('https://render.fineartamerica.com/images/rendered/default/greeting-card/images-medium-5/captain-america-shield-digital-painting-georgeta-blanaru.jpg?&targetx=0&targety=-100&imagewidth=700&imageheight=700&modelwidth=700&modelheight=500&backgroundcolor=161718&orientation=0'),
      subtitle: new FormControl('', Validators.required),
      _id: new FormControl(''),
    });
  }

  submit(): void {
    this.formData = {...this.form.value};
    this.data.movies.unshift(this.formData);
    this.data.movies.forEach(movie => {
      movie.genre = 'action';
      movie.ratingValue = 0;
    });
    const sub = this.data.addMovie(this.formData).subscribe(e => e);
    this.setMovies.emit(this.data.movies);
    this.form.reset();
    this.notification = true;

    setTimeout(() => this.notification = false, 2000);
    sub.unsubscribe();
  }

  editMovie(item): void {
    this.editBtn = !this.editBtn;
    this.itemId = item.value._id;
    this.form = new FormGroup({
      description: new FormControl(item.value.description, Validators.required),
      sources: new FormControl(item.value.sources, Validators.required),
      thumb: new FormControl('https://render.fineartamerica.com/images/rendered/default/greeting-card/images-medium-5/captain-america-shield-digital-painting-georgeta-blanaru.jpg?&targetx=0&targety=-100&imagewidth=700&imageheight=700&modelwidth=700&modelheight=500&backgroundcolor=161718&orientation=0'),
      title: new FormControl(item.value.title, Validators.required),
      subtitle: new FormControl(item.value.subtitle, Validators.required),
      ratingValue: new FormControl(item.value.ratingValue),
      _id: new FormControl(item.value._id)
    });
  }

  editChangedMovie(): void {
    const editingMovie = this.data.movies.find(c => c._id === this.itemId);

    this.editBtn = !this.editBtn;

    editingMovie.description = this.form.value.description;
    editingMovie.sources = this.form.value.sources;
    editingMovie.title = this.form.value.title;
    editingMovie.subtitle = this.form.value.subtitle;
    editingMovie.thumb = this.form.value.thumb;
    editingMovie.ratingValue = this.form.value.ratingValue;
    editingMovie._id = this.form.value._id;
    this.setMovies.emit(this.data.movies);
    const sub = this.data.editMovie(editingMovie).subscribe(movie => console.log(movie));

    this.form.reset();
    sub.unsubscribe();
  }

  redirect(): void {
    this.router.navigate(['/registration']);
  }

}
