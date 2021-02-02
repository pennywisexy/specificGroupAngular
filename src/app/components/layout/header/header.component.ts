import { GetDataService } from './../../../services/get-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  profileShow = false;

  constructor(public data: GetDataService) {

  }

  signOut(): void {
    delete this.data.user.email;
    delete this.data.user.password;

    this.data.isLogged = false;
  }

  showProfile(): void {
    this.profileShow = !this.profileShow;

  }
}
