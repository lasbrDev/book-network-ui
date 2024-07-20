import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated!\nYou can now login.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token is invalid or expired. Please try again.';
        this.submitted = true;
        this.isOkay = true;
      }
    });
  }

  redirectToLogin() {
  this.router.navigate(['login']);
  }

    message: string = '';
    isOkay: boolean = true;
    submitted: boolean = false;

    constructor(
      private router: Router,
      private authService: AuthenticationService,
    ) { }
}
