import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models/registration-request';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
  ) { }
  login() {
    this.router.navigate(['login'])
  }
  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (error) => {
        this.errorMsg = error.error.validationErrors;
      }
    })
  }

  registerRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  errorMsg: Array<string> = [];
  
}
