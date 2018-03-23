import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthguardService {

  constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user') != null) {
            return true;
        }else{
            this.router.navigate(["/login"], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

}
