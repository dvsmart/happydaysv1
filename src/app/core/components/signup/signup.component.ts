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
    errorMessage: string;
    successMessage: string;

    constructor(
        private router: Router, private authService: AuthService
    ) { }

    register() {
        this.loading = true;
        var username = this.model.username;
        this.authService.create(this.model)
            .subscribe(
                data => {
                    if (data) {
                        this.loading = false;
                        this.successMessage = 'Welcome ' + username + ', Your account has been successfully created. Enjoy your happy days!!!';
                        setTimeout(() => {
                            this.router.navigate(['/login']);
                        },
                            3000);
                    }
                },
                errorResponse => {
                    this.errorMessage = errorResponse.error.message;
                    this.loading = false;
                });
    }
}
