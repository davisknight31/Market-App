import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuActive: boolean = false;

  constructor(private userService: UserService) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  checkIfLoggedIn(): boolean {
    if (this.userService.loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  closeMenu(): void {
    console.log('hit');
    if (this.menuActive) {
      this.menuActive = !this.menuActive;
    }
  }
}
