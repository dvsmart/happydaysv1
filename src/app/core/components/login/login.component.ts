import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  form: FormGroup;
  submitted: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthService,
      private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
          });   
       }

  ngOnInit() {
      this.authenticationService.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.form.value)
          .subscribe(data => 
            {
              this.loading = false;
              this.router.navigate(['/']);
            },
            error => {
                alert(error.Message);
                this.loading = false;
            });
  }

  hasFieldError(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && (this.submitted || this.form.controls[fieldName].touched);
  }
}
