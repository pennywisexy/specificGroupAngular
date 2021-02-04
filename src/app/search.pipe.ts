import { Pipe, PipeTransform } from '@angular/core';
import { Movies } from './services/movies';

@Pipe({
  name: 'searchMovie'
})
export class SearchPipe implements PipeTransform {

  transform(movies: Movies[], [searchBy = 'title', search = '']): Movies[] {
    if (!search.trim()) {
      return movies;
    }

    return movies.filter(movie => {
      return movie[`${searchBy}`].toLowerCase().includes(search.toLowerCase());
    });
  }

}
