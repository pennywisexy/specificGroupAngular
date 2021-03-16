import { RegistrationPageComponent } from './../registration-page.component';
import { Router } from '@angular/router';
import { GetDataService } from './../../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration-page.component.scss']
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

    this.data.login(this.parent.form.value).subscribe(user => {
      if (user.isLog !== false) {
        this.data.user = {...user};
        this.wrongLog = false;
        this.data.isLogged = true;
        localStorage.isLog = true;
        localStorage.user = JSON.stringify(this.parent.form.value);
        this.data.user.name = `${user['first-name']} ${user['last-name']}`;
        this.router.navigate(['/edit']);
        this.parent.form.reset();
      } else {
        this.wrongLog = true;
      }
    });

    setTimeout(() => {
      this.wrongLog = false;
    }, 1500);
  }
}
