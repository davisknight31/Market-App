import { Component, Input } from '@angular/core';
import { Overview } from '../../../shared/interfaces/overview';
import { Stock } from '../../../shared/interfaces/stock';
import { Data } from '../../../shared/interfaces/data';
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
}
