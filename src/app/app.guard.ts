import { GetDataService } from './services/get-data.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private data: GetDataService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.data.isLogged) {
      return true;
    } else {
      this.router.navigate(['/registration']);
    }
  }
}
