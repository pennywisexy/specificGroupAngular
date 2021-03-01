import { ThemeService } from './../../../services/theme.service';
import { GetDataService } from './../../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileShow = false;

  constructor(
    public data: GetDataService, 
    private themeService: ThemeService,
    public translate: TranslateService) {

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

  setLocale(locale: string): void {
    console.log(locale);
    this.translate.use(locale);
  }

  setTheme(): void {
    this.data.isDarkTheme = !this.data.isDarkTheme;
    if (this.data.isDarkTheme) {
      this.themeService.toggleDark();
    } else {
      this.themeService.toggleLight();
    }
  }
}
