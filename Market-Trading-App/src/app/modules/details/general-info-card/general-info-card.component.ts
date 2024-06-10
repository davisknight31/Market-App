import { Component, Input } from '@angular/core';
import { Stock } from '../../../shared/interfaces/stock';
import { Data } from '../../../shared/interfaces/data';
import { Profile } from '../../../shared/interfaces/profile';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-general-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-info-card.component.html',
  styleUrl: './general-info-card.component.scss',
})
export class GeneralInfoCardComponent {
  @Input() stockQuote?: Stock;
  @Input() stockData?: Data;
  @Input() companyProfile: Profile;
  // @Input() isLoading: boolean;

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
