import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class DashAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    }
    this.ngFlashMessageService.showFlashMessage({
      messages:['Please login before going into dashboard'],
      dismissible:true,
      timeout:5000,
      type:'danger'
    });
    this.router.navigate(['login']);
  }

}
