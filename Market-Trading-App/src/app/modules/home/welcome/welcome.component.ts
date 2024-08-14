import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  @Input() balance: number;
  @Input() loggedIn: boolean;
  @Input() username: string;

  date: Date = new Date();
  formattedDate: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    this.formattedDate = this.date.toLocaleDateString(undefined, options);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  formatNumber(value: number) {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return '$' + Number(value).toLocaleString('en', options);
  }
}
