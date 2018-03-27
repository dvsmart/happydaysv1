import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { apiurl } from '../../api-config';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  url = apiurl +'Account';
  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService) { }

    login(user: any) : Observable<any> {
        var data = "username=" + user.username + "&password=" + user.password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post<any>('http://localhost/TemplateAPI/token', data, { headers: reqHeader })
            .map(response => {
                if ( response !== null && response.access_token !== "" && response.access_token.length > 0) {
                    this.cookieService.set('user', user.username);
                    this.cookieService.set('userToken',response.access_token);
                }
            });
    }

    getToken(): any {
        return this.cookieService.get('userToken');
    }

    logout() {
        this.cookieService.delete('user');
        this.cookieService.delete('userToken');
        this.router.navigate(['/login']);
    }

    create(model:any){
        return this.http.post<any>(this.url+'/register', model)
        .map(response => {
            if (response) {
                return response;
            }
        });
    }

}
