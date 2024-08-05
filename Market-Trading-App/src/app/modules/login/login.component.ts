import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  passwordType: string = 'password';
  buttonLabel: string = 'show';
  errorMessage: string;
  user: User;
  alreadyHasAccount: boolean = true;
  loggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  // ngOnInit() {
  //   this.loggedIn = this.userService.loggedIn;
  // }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.buttonLabel = this.passwordType === 'password' ? 'show' : 'hide';
  }

  toggleSignup() {
    this.alreadyHasAccount = false;
    this.errorMessage = '';
  }

  toggleLogin() {
    this.alreadyHasAccount = true;
    this.errorMessage = '';
  }

  login(username: string, password: string) {
    this.userService.loginUser(username, password).subscribe({
      next: (data) => {
        if (data) {
          this.loggedIn = this.userService.loggedIn;
          this.userService.getShares().subscribe();
          this.userService.getWatchlists().subscribe({
            next: () => {
              this.navigateToHome();
            },
          });
        }
      },
      error: (errorMessage) => {
        this.errorMessage = errorMessage;
      },
    });
  }

  signup(username: string, password: string, confirmedPassword: string) {
    console.log(username, password, confirmedPassword);
    if (password !== confirmedPassword) {
      this.errorMessage = 'The passwords must match!';
    } else if (!this.checkForUppercase(password)) {
      this.errorMessage = 'The password must contain at least one uppercase!';
    } else {
      this.userService.createUser(username, password).subscribe({
        next: (data) => {
          if (data) {
            this.navigateToHome();
          }
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
        },
      });
    }
    //backend returns 400 if user exists
  }

  checkForUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
