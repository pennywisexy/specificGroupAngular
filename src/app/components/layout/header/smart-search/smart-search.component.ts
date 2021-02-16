import { MoviesState } from './../../../../store/movies.state';
import { GetDataService } from './../../../../services/get-data.service';
import { Component } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.scss']
})
export class SmartSearchComponent {

  @Emitter(MoviesState.setFilterValue) setFilterValue: Emittable<string>;

  constructor(public data: GetDataService) { 
  }

  setSearch(): void {
    this.setFilterValue.emit(this.data.searchStr);
  }
}
