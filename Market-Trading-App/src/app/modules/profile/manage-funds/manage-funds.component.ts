import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-manage-funds',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './manage-funds.component.html',
  styleUrl: './manage-funds.component.scss',
})
export class ManageFundsComponent {
  balance: number;
  adjustmentAmount: number;
  adjustmentType: string = 'Add';
  refreshing: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.balance = this.userService.balance;
  }

  changeSelection() {}

  submit(type: string) {
    console.log(this.adjustmentAmount, type);
    if (type === 'add') {
      this.addToBalance();
    } else {
      this.cashoutFromBalance();
    }
  }

  addToBalance() {
    this.refreshing = true;
    this.userService.addToBalance(this.adjustmentAmount).subscribe(() => {
      this.userService.getBalance().subscribe(() => {
        this.balance = this.userService.balance;
        this.refreshing = false;
      });
    });
  }

  cashoutFromBalance() {
    this.refreshing = true;
    if (this.balance >= this.adjustmentAmount) {
      this.userService
        .removeFromBalance(this.adjustmentAmount)
        .subscribe(() => {
          this.userService.getBalance().subscribe(() => {
            this.balance = this.userService.balance;
            this.refreshing = false;
          });
        });
    } else {
      this.errorMessage = 'Insufficient funds...';
      this.refreshing = false;
    }
  }
}
