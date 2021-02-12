import { GetDataService } from './../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileShow = false;
  isEnLocale = this.data.isEnLocale;

  constructor(public data: GetDataService) {

  }

  ngOnInit(): void {
    if (localStorage.isLogged === 'true') {
      this.data.isLogged = localStorage.isLogged;
      this.data.user = JSON.parse(localStorage.lastUser);
    }
    if (localStorage.locale === 'ru') {
      this.data.isEnLocale = false;
      this.isEnLocale = false;
    }
  }

  signOut(): void {
    delete this.data.user.email;
    delete this.data.user.password;

    this.data.isLogged = false;
    localStorage.isLogged = false;
    localStorage.removeItem('user');
    localStorage.removeItem('lastUser');
  }

  toggleProfileMenu(): void {
    this.profileShow = !this.profileShow;
  }

  enLocale(): void {
    localStorage.locale = 'en';
    this.isEnLocale = true;
    this.data.isEnLocale = true;
  }

  ruLocale(): void {
    localStorage.locale = 'ru';
    this.isEnLocale = false;
    this.data.isEnLocale = false;
  }
}
