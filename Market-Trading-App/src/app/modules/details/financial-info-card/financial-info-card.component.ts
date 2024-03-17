import { Component, Input } from '@angular/core';
import { Data } from '../../../shared/interfaces/data';

@Component({
  selector: 'app-financial-info-card',
  standalone: true,
  imports: [],
  templateUrl: './financial-info-card.component.html',
  styleUrl: './financial-info-card.component.scss',
})
export class FinancialInfoCardComponent {
  @Input() stockData?: Data;

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
