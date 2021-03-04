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
    if (localStorage.isLog === 'true') {
      this.data.login(JSON.parse(localStorage.user)).subscribe(user => {
        this.data.isLogged = true;
        this.data.user = {...user};
        this.data.isLogged = true;
        localStorage.isLog = true;
        this.data.user.name = `${user['first-name']} ${user['last-name']}`;
      });
    }
  }

  signOut(): void {
    delete this.data.user.email;
    delete this.data.user.password;

    this.data.isLogged = false;
    this.data.logout().subscribe(() => {
      localStorage.isLog = false;
    });
  }

  toggleProfileMenu(): void {
    this.profileShow = !this.profileShow;
  }

  setLocale(locale: string): void {
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
