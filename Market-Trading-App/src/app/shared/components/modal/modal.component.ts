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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.watchlists = this.userService.watchlists;
    this.selectedWatchlist = this.userService.selectedWatchlist;
    this.loggedIn = this.userService.loggedIn;
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
