import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  errorMessage:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder) {
    this.createLoginForm(formBuilder);
  }

  private createLoginForm(formBuilder: FormBuilder) {
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
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.form.value)
      .subscribe(data => {
        this.loading = false;
        this.router.navigate(['/']);
      },
        errorResponse => {
          this.errorMessage = errorResponse.error.error_description;
          this.loading = false;
        });
  }

  hasFieldError(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && (this.submitted || this.form.controls[fieldName].touched);
  }

  clearForm(){
    this.createLoginForm(this.formBuilder)
  }
}
