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
      thumb: new FormControl('https://render.fineartamerica.com/images/rendered/default/greeting-card/images-medium-5/captain-america-shield-digital-painting-georgeta-blanaru.jpg?&targetx=0&targety=-100&imagewidth=700&imageheight=700&modelwidth=700&modelheight=500&backgroundcolor=161718&orientation=0'),
      subtitle: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const formData = {...this.form.value};
    this.data.movies.push(formData);
  }

}
