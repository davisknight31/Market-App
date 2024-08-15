import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Watchlist } from '../../shared/interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { TradesimChoice } from '../../shared/interfaces/tradesimChoice';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    FormsModule,
    RouterModule,
    CardComponent,
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  isRefreshing: boolean = false;
  userWatchlists: Watchlist[] = [];
  emptyWatchlist: Watchlist;
  selectedWatchlist: Watchlist;
  selectedWatchlistName: string;
  loggedIn: boolean;
  tradesimsChoices: TradesimChoice[];
  isDefaultSelected: boolean = true;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

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
    this.loggedIn = this.userService.loggedIn;
    this.getTradesimsChoices();
  }

  getTradesimsChoices() {
    this.apiService
      .getTradesimsChoices()
      .subscribe((response: TradesimChoice[]) => {
        this.tradesimsChoices = response;
      });
  }

  switchList(choice: string) {
    if (choice === 'Choose a watchlist') {
      this.isDefaultSelected = true;
    } else {
      this.userWatchlists.forEach((watchlist) => {
        if (watchlist.name === choice) {
          this.selectedWatchlistName = watchlist.name;
          this.selectedWatchlist = watchlist;
          this.userService.selectedWatchlist = watchlist;
        }
      });
      this.isDefaultSelected = false;
    }
  }

  refresh() {
    this.isRefreshing = true;
    this.userService.getWatchlists().subscribe(() => {
      this.userWatchlists = this.userService.watchlists;
      if (this.userWatchlists.length > 0) {
        this.userWatchlists.forEach((watchlist) => {
          if (watchlist.name === this.selectedWatchlistName) {
            this.userService.selectedWatchlist = watchlist;
            this.selectedWatchlist = watchlist;
          } else {
            this.isDefaultSelected = true;
            this.selectedWatchlistName = 'Choose a watchlist';
            this.selectedWatchlist = this.emptyWatchlist;
            this.userService.selectedWatchlist = this.emptyWatchlist;
          }
        });
      } else {
        this.selectedWatchlistName = 'Choose a watchlist';
        this.selectedWatchlist = this.emptyWatchlist;
        this.userService.selectedWatchlist = this.emptyWatchlist;
      }
      this.isRefreshing = false;
    });
  }
}
