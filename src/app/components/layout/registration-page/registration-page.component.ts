import { Router } from '@angular/router';
import { GetDataService } from './../../../services/get-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {

  form: FormGroup;
  formReg: FormGroup;
  isReg = false;

  constructor(public data: GetDataService, private router: Router) { }

  registrationForm(): void {
    this.isReg = true;


    this.form.reset();

    this.formReg = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'first-name': new FormControl(null, [
        Validators.required
      ]),
      'last-name': new FormControl(null, [
        Validators.required
      ])
    });
  }
}
