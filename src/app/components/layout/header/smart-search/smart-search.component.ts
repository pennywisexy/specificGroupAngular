import { SetFilterValue } from './../../../../store/movies.actions';
import { FacadeService } from './../../../../services/facade.service';
import { GetDataService } from './../../../../services/get-data.service';
import { AfterViewChecked, Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.scss']
})
export class SmartSearchComponent implements AfterViewChecked {

  constructor(public data: GetDataService, public facadeService: FacadeService, private store: Store) { 
    if (this.data.searchStr) {
      this.search();
    }
  }

  ngAfterViewChecked(): void {
    if (this.data.searchStr) {
      this.store.dispatch(new SetFilterValue(this.data.searchStr));
    } else if (!this.data.searchStr) {
      this.store.dispatch(new SetFilterValue(''));
    }
  }

  search(): void {
    this.setFilter('[FILTER] set filter');
  }

  setFilter(filter: string): void {
    this.facadeService.setFilter(filter);
  }
}
