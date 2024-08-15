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
  @Input() symbolId?: number;
  currentBalance: number;
  currentShares: number = 0;
  sharesInput: number = null;
  transactionString: string = '$0.00';
  showTransactionModal: boolean = false;
  showOrderCompletionModal: boolean = false;
  clickedTransactionType: string;
  transactionCost: number;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.setDetails();
  }

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
    if (this.sharesInput === null) {
      this.errorMessage = 'Please enter a  valid value in the shares input.';
      this.hasError = true;
    } else if (this.sharesInput <= 0) {
      this.errorMessage = 'Please enter a value greater than 0.';
      this.hasError = true;
    } else {
      if (transactionType === 'buy') {
        if (this.transactionCost > this.currentBalance) {
          this.errorMessage =
            'You do not have the required funds for this purchase.';
          this.hasError = true;
        } else {
          this.errorMessage = '';
          this.hasError = false;
          this.clickedTransactionType = 'purchase';
          this.showTransactionModal = true;
        }
      }
      if (transactionType === 'sell') {
        if (this.currentShares < this.sharesInput) {
          this.errorMessage = 'You do not have the required shares to sell.';
          this.hasError = true;
        } else {
          this.errorMessage = '';
          this.hasError = false;
          this.clickedTransactionType = 'sell';
          this.showTransactionModal = true;
        }
      }
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
    this.userService
      .purchaseShares(
        parseInt(this.userService.userId),
        this.symbolId,
        this.sharesInput,
        this.stockQuote.price
      )
      .subscribe(() => {
        this.userService.getShares().subscribe();
        this.userService.getBalance().subscribe();
        this.showTransactionModal = false;
        this.showOrderCompletionModal = true;
      });
  }

  sellShares(): void {
    this.userService
      .sellShares(
        parseInt(this.userService.userId),
        this.symbolId,
        this.sharesInput,
        this.stockQuote.price
      )
      .subscribe(() => {
        this.userService.getShares().subscribe();
        this.userService.getBalance().subscribe();
        this.showTransactionModal = false;
        this.showOrderCompletionModal = true;
      });
  }

  setDetails() {
    this.currentBalance = this.userService.balance;
    const correlatingShare = this.userService.shares.find(
      (shares) => shares.symbolid === this.symbolId
    );
    if (correlatingShare) {
      this.currentShares = correlatingShare.quantity;
    }

    this.showOrderCompletionModal = false;
  }
}
