import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
currentUser:string;
  constructor(private authservice: AuthService,private storage: CookieService) {
    if(storage.get('user') != "undefined" && storage.get('user') !== ""){
      this.currentUser = storage.get('user')
    }
    
   }

  ngOnInit() {
  }

  onLogout(){
    this.authservice.logout();
  }

}
