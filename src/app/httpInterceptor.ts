import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");
        const Authorization = this.authService.getToken();
        const authReq = (Authorization != "" && Authorization !== "undefined") ? req.clone({ headers: req.headers.set('Authorization', 'Bearer '+ Authorization) }) : req;
        console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq).catch(x=> this.handleAuthError(x));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/login`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return Observable.of(err.message);
        }
        return Observable.throw(err);
    }
}