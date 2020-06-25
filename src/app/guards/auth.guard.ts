import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router,
         UrlTree} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap,} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {

  isLogin: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  )
  {
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
