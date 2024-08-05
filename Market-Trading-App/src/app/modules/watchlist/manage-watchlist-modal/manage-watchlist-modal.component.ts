import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Watchlist } from '../../../shared/interfaces/watchlists';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-manage-watchlist-modal',
  standalone: true,
  imports: [],
  templateUrl: './manage-watchlist-modal.component.html',
  styleUrl: './manage-watchlist-modal.component.scss',
})
export class ManageWatchlistModalComponent {
  @Input() isModalOpen: boolean;
  @Input() selectedSymbol: string;
  @Output() isListUpdatedChange = new EventEmitter<boolean>();
  @Output() isModalOpenChange = new EventEmitter<boolean>();
  selectedWatchlist: Watchlist;
  clickCameFromAction: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.selectedWatchlist = this.userService.selectedWatchlist;
  }

  removeFromWatchlist() {
    this.clickCameFromAction = true;
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
    this.clickCameFromAction = true;
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
    if (this.clickCameFromAction) {
      this.isListUpdatedChange.emit(!this.isListUpdatedChange);
    }
    this.isModalOpenChange.emit(!this.isModalOpen);
  }
}
