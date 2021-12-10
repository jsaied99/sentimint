import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var loggedIn: boolean;
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          loggedIn = true;
          resolve(true);
        } else {
          loggedIn = false;
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
      if(loggedIn) {
        console.log("User is logged in in Guard");
        return true;
      }
      return false;
    });

  }
}
