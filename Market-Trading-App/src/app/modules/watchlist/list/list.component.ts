import { Component, Input, SimpleChanges } from '@angular/core';
import { Watchlist } from '../../../shared/interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Stock } from '../../../shared/interfaces/stock';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() selectedWatchlist: Watchlist;
  @Input() headers: string[];
  @Input() stockDetails: Stock[];
  watchlistSymbols: string[] = [];
  watchlistStockDetails: Stock[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    this.isLoading = true;
    this.watchlistStockDetails = [];
    this.watchlistSymbols = [];
    this.selectedWatchlist?.entries.forEach((entry) => {
      this.watchlistSymbols.push(entry.stocksymbol);
    });

    //calling api each time because if a user updates their watchlist we want to recall the api
    this.getStockData();
    this.isLoading = false;
  }

  getStockData() {
    if (this.watchlistSymbols.length > 0) {
      this.apiService.getStocks(this.watchlistSymbols).subscribe({
        next: (data) => {
          this.watchlistStockDetails = data;
          console.log(this.watchlistStockDetails);
          if (data === this.watchlistStockDetails) {
          }
        },
        error: (error) => {
          console.error('Error:', error);
          throw error;
        },
      });
    }
  }

  setStockSymbols() {
    this.selectedWatchlist?.entries.forEach((entry) => {
      this.watchlistSymbols.push(entry.stocksymbol);
    });
  }
}
