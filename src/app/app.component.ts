import { ThemeService } from './services/theme.service';
import { GetDataService } from './services/get-data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public data: GetDataService, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    if (!this.data.isDarkTheme) {
      this.themeService.toggleLight();
    }
  }
}

