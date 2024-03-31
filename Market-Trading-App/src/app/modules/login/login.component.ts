import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  passwordType: string = 'password';
  buttonLabel: string = 'show';

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.buttonLabel = this.passwordType === 'password' ? 'show' : 'hide';
  }
}
