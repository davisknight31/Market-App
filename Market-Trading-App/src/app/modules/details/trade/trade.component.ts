import { Component, Input } from '@angular/core';
import { Stock } from '../../../shared/interfaces/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
})
export class TradeComponent {
  @Input() stockQuote?: Stock;
  @Input() balance: number;
  sharesInput: number;
  transactionString: string = '$0.00';

  calculatePrice() {
    const transactionCost = this.sharesInput * this.stockQuote.price;
    this.transactionString = this.formatNumber(transactionCost);
  }

  formatNumber(value: number) {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return '$' + Number(value).toLocaleString('en', options);
  }
}
