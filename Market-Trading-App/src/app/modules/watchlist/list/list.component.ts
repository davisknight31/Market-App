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
import { ManageWatchlistModalComponent } from '../manage-watchlist-modal/manage-watchlist-modal.component';
import { UserService } from '../../../core/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    SpinnerComponent,
    FormsModule,
    ManageWatchlistModalComponent,
    RouterModule,
  ],
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

  isModalOpen: boolean = false;
  selectedSymbol: string;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
  ngOnChanges() {
    this.isLoading = true;
    this.resetList();
    //calling api each time because if a user updates their watchlist we want to recall the api
    this.getStockData();

    console.log('change');
    console.log(this.displayedTableData);
    // this.isLoading = false;
  }

  resetList() {
    this.watchlistStockDetails = [];
    this.watchlistSymbols = [];
    this.displayedTableData = [];
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
          console.log('hit');
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          throw error;
        },
      });
    } else {
      this.isLoading = false;
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

  formatDollarChange(amount: string) {
    if (amount.includes('-')) {
      const splitNum = amount.split('-');
      return '-$' + splitNum[1];
    }

    return '$' + amount;
  }

  swapModalDisplay(symbol: string) {
    this.selectedSymbol = symbol;
    this.isModalOpen = !this.isModalOpen;
  }

  refreshWatchlists() {
    console.log('refresh watchlists hit');
    this.refreshListChange.emit(!this.refreshListChange);
  }

  deleteWatchlist() {
    const deleteWatchlist$ = this.userService.deleteWatchlist(
      this.selectedWatchlist.watchlistid
    );
    deleteWatchlist$.subscribe(() => {
      this.userService.getWatchlists().subscribe(() => {
        this.refreshWatchlists();
      });
    });
  }

  // swapModalDisplay() {
  //   this.isModalOpen = !this.isModalOpen;
  // }

  // refreshWatchlists() {
  //   this.refreshListChange.emit(!this.refreshListChange);
  // }
}
