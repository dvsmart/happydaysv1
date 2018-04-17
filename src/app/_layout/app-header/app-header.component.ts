import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
currentUser:string;
watcher: Subscription;
showMenu:boolean;
  constructor(private authservice: AuthService,private storage: CookieService,private media: ObservableMedia) {
    if(storage.get('user') != "undefined" && storage.get('user') !== ""){
      this.currentUser = storage.get('user')
    }
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.showMenu = true;
      }
    });

    
   }

  ngOnInit() {
  }

  onLogout(){
    this.authservice.logout();
  }

}
