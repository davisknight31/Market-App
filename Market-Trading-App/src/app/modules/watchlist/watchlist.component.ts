import { Component, Input } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Watchlist } from '../../shared/interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../shared/interfaces/stock';
import { ApiService } from '../../core/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, ListComponent, FormsModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  @Input() refreshLists: boolean;
  isRefreshing: boolean = false;
  userWatchlists: Watchlist[] = [];
  emptyWatchlist: Watchlist;
  selectedWatchlist: Watchlist;
  selectedWatchlistName: string;
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
  loggedIn: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.emptyWatchlist = {
      watchlistid: 0,
      userid: 0,
      name: '',
      entries: [],
    };
    this.selectedWatchlistName = 'Choose a watchlist';

    this.userWatchlists = this.userService.watchlists;
    if (this.userService.selectedWatchlist) {
      this.selectedWatchlist = this.userService.selectedWatchlist;
    }
    console.log(this.userWatchlists);
    this.loggedIn = this.userService.loggedIn;
  }

  switchList(choice: string) {
    this.userWatchlists.forEach((watchlist) => {
      if (watchlist.name === choice) {
        this.selectedWatchlistName = watchlist.name;
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

  refresh() {
    this.isRefreshing = true;
    this.userWatchlists = this.userService.watchlists;
    if (this.userWatchlists.length > 0) {
      this.userWatchlists.forEach((watchlist) => {
        if (watchlist.name === this.selectedWatchlistName) {
          this.userService.selectedWatchlist = watchlist;
          this.selectedWatchlist = watchlist;
        } else {
          this.selectedWatchlist = this.userWatchlists[0];
          this.userService.selectedWatchlist = this.userWatchlists[0];
          this.selectedWatchlistName = this.userWatchlists[0].name;
          // this.selectedWatchlist = null;
          // this.selectedWatchlistName = 'Choose a watchlist';
        }
      });
    } else {
      this.selectedWatchlistName = 'Choose a watchlist';
      this.selectedWatchlist = this.emptyWatchlist;
      this.userService.selectedWatchlist = this.emptyWatchlist;
    }
    this.isRefreshing = false;
  }

  deleteWatchlist() {
    const deleteWatchlist$ = this.userService.deleteWatchlist(
      this.selectedWatchlist.watchlistid
    );
    deleteWatchlist$.subscribe(() => {
      this.userService.getWatchlists().subscribe(() => {
        this.refresh();
      });
    });
  }
}
