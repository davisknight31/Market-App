import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Watchlist } from '../../interfaces/watchlists';
import { CommonModule } from '@angular/common';
import { concatMap, forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isModalOpen: boolean;
  @Input() inHomeView: boolean;
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
            this.closeModal();
          }
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
          console.log(this.errorMessage);
        },
      });
  }

  addToWatchlist(watchlistId: number) {
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

  removeFromWatchlist() {
    let idToRemove: number;
    this.selectedWatchlist.entries.forEach((watchlist) => {
      if (watchlist.stocksymbol === this.selectedSymbol) {
        idToRemove = watchlist.watchlistentryid;
      }
    });

    const removeStock$ = this.userService.removeStockFromWatchlist(idToRemove);

    removeStock$.subscribe(() => {
      this.userService.getWatchlists().subscribe(() => {
        this.closeModal();
      });
    });
  }

  deleteWatchlist() {
    const deleteWatchlist$ = this.userService.deleteWatchlist(
      this.selectedWatchlist.watchlistid
    );
    deleteWatchlist$.subscribe(() => {
      this.userService.getWatchlists().subscribe(() => {
        this.closeModal();
      });
    });
  }

  closeModal() {
    this.isModalOpenChange.emit(!this.isModalOpen);
  }
}
