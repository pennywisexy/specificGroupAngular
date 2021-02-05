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

    if (localStorage.userRegData) {
      this.data.userRegData = JSON.parse(localStorage.userRegData);
      this.submit();
    }
  }

  submit(): void {
    if (this.parent.form.invalid) {
      return;
    }


    this.data.user = {...this.parent.form.value};
    localStorage.user = JSON.stringify(this.data.user);

    this.parent.form.reset();

    if (this.data.userRegData) {
      const regUser = this.data.userRegData.find((item) => item.email === this.data.user.email);

      if (regUser) {
        this.data.user.name = `${regUser['first-name']} ${regUser['last-name']}`;
        this.wrongLog = false;
        this.data.isLogged = true;
        localStorage.isLogged = true;
        this.router.navigate(['/edit-page']);
        localStorage.lastUser = JSON.stringify(this.data.user);
      } else {
        this.wrongLog = true;
        localStorage.removeItem('user');
        localStorage.removeItem('lastUser');
      }
    } else {
      this.wrongLog = true;
      localStorage.removeItem('user');
      localStorage.removeItem('lastUser');
    }

    setTimeout(() => {
      this.wrongLog = false;
    }, 1500);
  }
}
