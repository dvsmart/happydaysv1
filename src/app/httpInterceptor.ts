import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const Authorization = this.authService.getToken();
        const authReq = (Authorization != "" && Authorization !== "undefined") ? req.clone({ headers: req.headers.set('Authorization', 'Bearer '+ Authorization) }) : req;
        return next.handle(authReq).do((event: HttpEvent<any>) => {
            if(event instanceof HttpErrorResponse){
                console.log(event.status);
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403 || err.status === 0) {
                this.router.navigateByUrl('/login');
              }
            }
          });
    }
}