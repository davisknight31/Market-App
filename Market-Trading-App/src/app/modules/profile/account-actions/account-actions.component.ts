import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-account-actions',
  standalone: true,
  imports: [],
  templateUrl: './account-actions.component.html',
  styleUrl: './account-actions.component.scss',
})
export class AccountActionsComponent {
  constructor(private router: Router, private userService: UserService) {}

  logout() {
    this.userService.resetUser();
    this.router.navigate(['/login']);
  }
}
