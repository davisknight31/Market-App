import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../../shared/interfaces/stock';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TradesimChoice } from '../../../shared/interfaces/tradesimChoice';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
})
export class MainListComponent {
  @Input() tableData: Stock[];
  @Input() tradesimsChoices: TradesimChoice[];

  displayedTableData: Stock[];
  splitNum: string[];
  searchString: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.displayedTableData = this.tableData;
  }

  formatDollarChange(amount: string) {
    if (amount.includes('-')) {
      this.splitNum = amount.split('-');
      return '-$' + this.splitNum[1];
    }
    return '$' + amount;
  }

  filterList() {
    // console.log(this.searchString);
    const filteredData: Stock[] = [];
    this.tableData.forEach((data) => {
      const correlatingChoice = this.tradesimsChoices.find(
        (stock) => data.symbol === stock.symbol
      );
      if (
        data.symbol.includes(this.searchString.toUpperCase().trim()) ||
        correlatingChoice.fullname
          .toLowerCase()
          .includes(this.searchString.toLowerCase())
      ) {
        filteredData.push(data);
      }
    });
    this.displayedTableData = filteredData;
  }

  navigateToStockDetails(stockSymbol: string) {
    const symbolIdStock = this.tradesimsChoices.find(
      (stock) => stock.symbol === stockSymbol
    );
    this.router.navigate(['/details', stockSymbol, symbolIdStock.symbolid]);
  }
}
