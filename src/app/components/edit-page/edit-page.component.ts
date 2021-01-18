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
    if(this.data.movies === undefined || this.data.movies.length === 3) {
      this.data.getFilms()
        .subscribe((movies) => this.data.movies = movies.categories[0].videos);
    }

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      sources: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      thumb: new FormControl('https://cdn.shopify.com/s/files/1/0169/6995/7440/products/F07645L00_5010993767397_pkg_20_Online_300DPI_2000x.jpg?v=1602854860')
    });
  }

  submit(): void {
    const formData = {...this.form.value};
    this.data.movies.push(formData);
  }

}
