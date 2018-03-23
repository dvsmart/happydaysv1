import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  authenticated: boolean;

constructor() {
  if(localStorage.getItem('user') != null){
    this.authenticated = true;
  }else{
    this.authenticated = false;
  }
}

}
