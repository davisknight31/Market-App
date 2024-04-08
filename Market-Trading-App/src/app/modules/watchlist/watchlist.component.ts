import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Watchlist } from '../../shared/interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../shared/interfaces/stock';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, ListComponent, FormsModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  userWatchlists: Watchlist[] = [];
  selectedWatchlist: Watchlist;
  stockDetails: Stock[] = [];
  watchlistSymbols: string[] = [];
  watchlistColumnHeaders: string[] = [
    'Name',
    'Current Price',
    'Change',
    '% Change',
    'Daily High',
    'Daily Low',
    'Open Price',
    'Previous Close',
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userWatchlists = this.userService.watchlists;
    if (this.userService.selectedWatchlist) {
      this.selectedWatchlist = this.userService.selectedWatchlist;
    }
    console.log(this.userWatchlists);
  }

  switchList(choice: string) {
    this.userWatchlists.forEach((watchlist) => {
      if (watchlist.name === choice) {
        this.selectedWatchlist = watchlist;
        this.userService.selectedWatchlist = watchlist;
      }
    });

    // this.watchlistSymbols = [];
    // this.selectedWatchlist?.entries.forEach((entry) => {
    //   this.watchlistSymbols.push(entry.stocksymbol);
    // });

    // this.apiService.getStocks(this.watchlistSymbols).subscribe({
    //   next: (data) => {
    //     // this.isLoading = true;
    //     this.stockDetails = data;
    //     console.log(this.stockDetails);
    //     // this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error:', error);
    //     throw error;
    //   },
    // });
  }
}
