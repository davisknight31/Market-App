import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Watchlist } from '../../../shared/interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Stock } from '../../../shared/interfaces/stock';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { TradesimChoice } from '../../../shared/interfaces/tradesimChoice';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() tradesimsChoices: TradesimChoice[];
  @Input() selectedWatchlist: Watchlist;
  @Input() headers: string[];
  @Input() stockDetails: Stock[];
  @Input() refreshList: boolean = false;
  @Input() selectedWatchlistName: string;
  @Input() isDefaultSelected: boolean;
  @Output() refreshListChange = new EventEmitter<boolean>();
  isListUpdated: boolean = false;
  watchlistSymbols: string[] = [];
  watchlistStockDetails: Stock[] = [];
  isLoading: boolean = false;

  displayedTableData: Stock[];
  searchString: string;

  constructor(private apiService: ApiService) {}
  ngOnChanges() {
    this.isLoading = true;
    this.resetList();
    //calling api each time because if a user updates their watchlist we want to recall the api
    this.getStockData();
    this.isLoading = false;
  }

  resetList() {
    this.watchlistStockDetails = [];
    this.watchlistSymbols = [];
    this.selectedWatchlist?.entries.forEach((entry) => {
      this.watchlistSymbols.push(entry.stocksymbol);
    });
  }

  getStockData() {
    if (this.watchlistSymbols.length > 0) {
      this.apiService.getStocks(this.watchlistSymbols).subscribe({
        next: (data) => {
          this.watchlistStockDetails = data;
          this.displayedTableData = this.watchlistStockDetails;
          console.log(this.watchlistStockDetails);
        },
        error: (error) => {
          console.error('Error:', error);
          throw error;
        },
      });
    }
  }

  filterList() {
    // console.log(this.searchString);
    const filteredData: Stock[] = [];
    this.watchlistStockDetails.forEach((data) => {
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

  showModal() {}

  formatDollarChange(amount: string) {
    if (amount.includes('-')) {
      const splitNum = amount.split('-');
      return '-$' + splitNum[1];
    }

    return '$' + amount;
  }

  refreshWatchlists() {
    this.refreshListChange.emit(!this.refreshListChange);
  }
}
