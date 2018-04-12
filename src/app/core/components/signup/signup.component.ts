import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
  }
  model: any = {};
  loading = false;
  errorMessage:string;

  constructor(
      private router: Router,private authService : AuthService
  ) { }

  register() {
      this.loading = true;
      this.authService.create(this.model)
          .subscribe(
              data => {
                  debugger;
                  this.router.navigate(['/login']);
              },
              errorResponse => {
                  debugger;
                  this.errorMessage = errorResponse.error.message;
                  this.loading = false;
              });
  }
}
