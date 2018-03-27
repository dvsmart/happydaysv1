import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthguardService {

  constructor(private router: Router,private storage: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storage.get('user') != null && this.storage.get('user') !== "undefined" && this.storage.get('user') !== "") {
            return true;
        }else{
            this.router.navigate(["/login"], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

}
