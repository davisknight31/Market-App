import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardComponent, SpinnerComponent],
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
  isLoggingIn: boolean = false;

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

  onKeydown(event) {
    if (event.key === 'Enter') {
      if (this.alreadyHasAccount) {
        console.log(
          (<HTMLInputElement>document.getElementById('loginUsernameInput'))
            .value,
          (<HTMLInputElement>document.getElementById('loginPasswordInput'))
            .value
        );
        this.login(
          (<HTMLInputElement>document.getElementById('loginUsernameInput'))
            .value,
          (<HTMLInputElement>document.getElementById('loginPasswordInput'))
            .value
        );
      } else {
        this.signup(
          (<HTMLInputElement>document.getElementById('signupUsernameInput'))
            .value,
          (<HTMLInputElement>document.getElementById('signupPasswordInput'))
            .value,
          (<HTMLInputElement>(
            document.getElementById('signupConfirmedPasswordInput')
          )).value
        );
      }
    }
  }

  login(username: string, password: string) {
    this.isLoggingIn = true;
    if (username && password) {
      this.userService.loginUser(username, password).subscribe({
        next: (data) => {
          if (data) {
            this.loggedIn = this.userService.loggedIn;
            this.userService.getShares().subscribe();
            this.userService.getWatchlists().subscribe({
              next: () => {
                this.isLoggingIn = false;
                this.navigateToHome();
              },
            });
          }
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
          this.isLoggingIn = false;
        },
      });
    } else if (!username && password) {
      this.isLoggingIn = false;

      this.errorMessage = 'Please enter a username';
    } else if (username && !password) {
      this.isLoggingIn = false;
      this.errorMessage = 'Please enter a password';
    } else {
      this.isLoggingIn = false;
      this.errorMessage = 'Please enter the information';
    }
  }

  signup(username: string, password: string, confirmedPassword: string) {
    console.log(username, password, confirmedPassword);
    if (!username && !password) {
      this.errorMessage = 'Please enter the information';
    } else if (!username) {
      this.errorMessage = 'Please enter a username';
    } else if (!password) {
      this.errorMessage = 'Please enter a password';
    } else {
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
