import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
currentUser:string;
  constructor(private authservice: AuthService) {
    var user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = user.userName
   }

  ngOnInit() {
  }

  onLogout(){
    this.authservice.logout();
  }

}
