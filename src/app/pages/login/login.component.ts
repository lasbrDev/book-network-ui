import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    email: '',
    password: ''
  };
  errorMsg: Array<string> = [];  

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    //private tokenService: TokenService
  ) { }

  register() {
    this.router.navigate(['/register']);
  }
    
  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (response) => {
        this.tokenService.token = response.token as string;
        this.router.navigate(['books']);
      },
      error: (error) => {
        if (error.error.validationErrors) {
          this.errorMsg = error.error.validationErrors
        } else {
          this.errorMsg.push(error.error.error)
        }
      }
    });
  }
}
