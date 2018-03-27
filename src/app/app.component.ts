import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  authenticated: boolean;

constructor(private storage : CookieService) {
  if(storage.get('user') != null && storage.get('user') != "undefined" && storage.get('user') !== ""){
    this.authenticated = true;
  }else{
    this.authenticated = false;
  }
}

}
