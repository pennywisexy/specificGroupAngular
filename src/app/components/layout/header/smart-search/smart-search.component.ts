import { MoviesState } from './../../../../store/movies.state';
import { SetFilterValue, SetMovies } from './../../../../store/movies.actions';
import { FacadeService } from './../../../../services/facade.service';
import { GetDataService } from './../../../../services/get-data.service';
import { AfterViewChecked, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Emittable, Emitter } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.scss']
})
export class SmartSearchComponent {

  @Emitter(MoviesState.setFilterValue) setFilterValue: Emittable<string>;

  constructor(public data: GetDataService, public facadeService: FacadeService, private store: Store) { 
  }

  setSearch(): void {
    this.setFilterValue.emit(this.data.searchStr);
  }
}
