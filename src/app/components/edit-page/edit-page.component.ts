import { Movie } from './../../services/movies';
import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  form: FormGroup;

  constructor(public data?: GetDataService) { }

  ngOnInit(): void {
    this.data.getFilms()
      .subscribe((movies) => this.data.movies = movies.categories[0].videos);

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      sources: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const formData = {...this.form.value};
    this.data.movies.push(formData);
  }

}
