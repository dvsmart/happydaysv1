import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  url = 'http://localhost:63159/api/Account';
  constructor(private http: HttpClient,private router: Router) { }

    login(user: any) {
        return this.http.post<any>(this.url+'/authenticate', user)
            .map(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem('user');
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
