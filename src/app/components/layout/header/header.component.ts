import { GetDataService } from './../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileShow = false;

  constructor(public data: GetDataService) {

  }

  ngOnInit(): void {
    if (localStorage.isLogged === 'true') {
      this.data.isLogged = localStorage.isLogged;
      this.data.user = JSON.parse(localStorage.lastUser);
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
}
