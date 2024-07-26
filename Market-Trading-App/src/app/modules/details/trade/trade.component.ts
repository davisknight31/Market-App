import { Component, Input } from '@angular/core';
import { Stock } from '../../../shared/interfaces/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

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
  @Input() symbolId?: number;
  sharesInput: number;
  transactionString: string = '$0.00';
  showTransactionModal: boolean = false;
  clickedTransactionType: string;
  transactionCost: number;

  constructor(private userService: UserService) {}

  calculatePrice() {
    this.transactionCost = this.sharesInput * this.stockQuote.price;
    this.transactionString = this.formatNumber(this.transactionCost);
  }

  formatNumber(value: number) {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return '$' + Number(value).toLocaleString('en', options);
  }

  beginTransaction(transactionType: string): void {
    this.showTransactionModal = true;
    if (transactionType === 'buy') {
      this.clickedTransactionType = 'purchase';
    }
    if (transactionType === 'sell') {
      this.clickedTransactionType = 'sell';
    }
  }

  confirmTransaction() {
    if (this.clickedTransactionType === 'purchase') {
      this.purchaseShares();
    }
    if (this.clickedTransactionType === 'sell') {
      this.sellShares();
    }
  }

  denyTransaction() {
    this.showTransactionModal = false;
  }

  purchaseShares(): void {
    console.log(
      'Buying',
      this.userService.userId,
      this.symbolId,
      this.sharesInput,
      this.stockQuote.price
    );
    // this.userService.purchaseShares(this.userService.userId).subscribe();
  }

  sellShares(): void {
    console.log(
      'Selling',
      this.userService.userId,
      this.symbolId,
      this.sharesInput,
      this.stockQuote.price
    );
    // this.userService.purchaseShares(this.userService.userId).subscribe();
  }
}
