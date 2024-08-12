import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-funds',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-funds.component.html',
  styleUrl: './manage-funds.component.scss',
})
export class ManageFundsComponent {
  balance: number;
  adjustmentAmount: number;
  adjustmentType: string = 'Add';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.balance = this.userService.balance;
  }

  changeSelection() {}

  submit(type: string) {
    console.log(this.adjustmentAmount, type);
  }

  addToBalance() {}

  cashoutFromBalance() {}
}
