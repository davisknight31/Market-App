import { Component, Input } from '@angular/core';
import { Overview } from '../../../shared/interfaces/overview';
import { Stock } from '../../../shared/interfaces/stock';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() stockQuote?: Stock;
  @Input() companyOverview?: Overview;
}
