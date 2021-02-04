import { GetDataService } from './../../../../services/get-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.scss']
})
export class SmartSearchComponent {

  constructor(public data: GetDataService) { }

  searchByTitle(): void {
    this.data.searchBy = 'title';
  }

  searchByDescription(): void {
    this.data.searchBy = 'description';
  }

  searchByGenre(): void {
    this.data.searchBy = 'genre';
  }

}
