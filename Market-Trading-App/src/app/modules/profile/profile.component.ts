import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CardComponent, PersonalDetailsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  username: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.username = this.userService.username;
  }

  navigateToWatchlists() {
    this.router.navigate(['/watchlists']);
  }

  logout() {
    this.userService.resetUser();
    this.router.navigate(['/login']);
  }
}
