import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLogin: boolean;
  isLoginFB: boolean;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
  ) {
    this.afAuth.authState.subscribe(users => {
      this.isLogin = !(users == null);
    });
  }
  canActivate(): boolean {
    if (this.isLogin) {
      return true;
    } else {
      this.router.navigate(['Login']);
      return false;
    }
  }
}
