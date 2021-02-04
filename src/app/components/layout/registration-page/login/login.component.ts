import { RegistrationPageComponent } from './../registration-page.component';
import { Router } from '@angular/router';
import { GetDataService } from './../../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  wrongLog = false;


  constructor(public data: GetDataService, private router: Router, public parent: RegistrationPageComponent) { }

  ngOnInit(): void {
    this.parent.form = new FormGroup({
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
    if (this.parent.form.invalid) {
      return;
    }

    this.data.user = {...this.parent.form.value};
    this.parent.form.reset();

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

}
