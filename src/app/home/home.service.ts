import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Home } from './home';


@Injectable()
export class HomeService {
  url = environment.url + 'api/home/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getHome(): Observable<Home> {
    return this.http.get<Home>(this.url, { responseType: 'json' });
  }
 
}
