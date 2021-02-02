import { Router } from '@angular/router';
import { GetDataService } from './../../../services/get-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;
  formReg: FormGroup;
  isReg = false;
  wrongLog = false;

  constructor(public data: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });


  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.data.user = {...this.form.value};
    this.form.reset();

    if (this.data.userRegData) {
      const regUser = this.data.userRegData.find((item) => item.email === this.data.user.email);

      if (regUser) {
        this.data.user.name = `${regUser['first-name']} ${regUser['last-name']}`;
        this.wrongLog = false;
        this.data.isLogged = true;
        this.router.navigate(['/edit-page']);
      } else {
        this.wrongLog = true;
      }
    } else {
      this.wrongLog = true;
    }

    setTimeout(() => {
      this.wrongLog = false;
    }, 1500);
  }

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

  registration(): void {
    if (this.formReg.invalid) {
      return;
    }

    if (!this.data.userRegData) {
      this.data.userRegData = [{
        email: this.formReg.value.email,
        password: this.formReg.value.password,
        'first-name': this.formReg.value['first-name'],
        'last-name': this.formReg.value['last-name']
      }];

    } else if (this.data.userRegData) {
      this.data.userRegData.push(this.formReg.value);
    }

    this.formReg.reset();
    this.isReg = false;

  }

  backToLogging(): void {
    this.isReg = false;
  }

  redirect(): void {
    this.router.navigate(['/edit-page']);
  }

}
