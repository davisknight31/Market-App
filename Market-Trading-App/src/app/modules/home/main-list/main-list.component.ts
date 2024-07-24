import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../../shared/interfaces/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
})
export class MainListComponent {
  @Input() tableData: Stock[];
  splitNum: string[];

  constructor(private router: Router) {}

  formatDollarChange(amount: string) {
    if (amount.includes('-')) {
      this.splitNum = amount.split('-');
      return '-$' + this.splitNum[1];
    }
    return '$' + amount;
  }

  navigateToStockDetails(stockSymbol: string) {
    this.router.navigate(['/details', stockSymbol]);
  }
}
