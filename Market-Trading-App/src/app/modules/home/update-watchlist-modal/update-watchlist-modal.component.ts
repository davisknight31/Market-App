import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Watchlist } from '../../../shared/interfaces/watchlists';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-update-watchlist-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-watchlist-modal.component.html',
  styleUrl: './update-watchlist-modal.component.scss',
})
export class UpdateWatchlistModalComponent {
  @Input() isModalOpen: boolean;
  @Input() selectedSymbol: string;
  @Output() isModalOpenChange = new EventEmitter<boolean>();
  watchlists: Watchlist[] = [];
  selectedWatchlist: Watchlist;
  loggedIn: boolean;
  successMessage: string;
  errorMessage: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.watchlists = this.userService.watchlists;
    this.selectedWatchlist = this.userService.selectedWatchlist;
    this.loggedIn = this.userService.loggedIn;
  }

  createWatchlist(watchlistName: string) {
    this.resetMessages();
    console.log(watchlistName, this.userService.userId, this.selectedSymbol);
    this.userService
      .createNewWatchlist(
        this.selectedSymbol,
        watchlistName,
        this.userService.userId
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.successMessage = `Watchlist with name "${watchlistName}" created successfully`;
            console.log(this.successMessage);
            this.watchlists = [];
            this.userService.getWatchlists().subscribe((response) => {
              console.log(response);
            });
            this.watchlists = this.userService.watchlists;
          }
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
          console.log(this.errorMessage);
        },
      });
  }

  addToWatchlist(watchlistId: number) {
    this.resetMessages();
    this.userService
      .addStockToWatchlist(watchlistId, this.selectedSymbol)
      .subscribe({
        next: (data) => {
          if (data) {
            this.successMessage = `Successfully added ${this.selectedSymbol}!`;
            this.userService.getWatchlists().subscribe((response) => {
              console.log(response);
            });
            console.log(this.successMessage);
          }
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
          console.log(this.errorMessage);
        },
      });
  }

  resetMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeModal() {
    this.isModalOpenChange.emit(!this.isModalOpen);
  }
}
