import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../interfaces/stock';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: any[];
  @Input() columnHeaders: string[];
  @Input() currentPage: number;
  @Input() rowsPerPage: number;
  @Input() totalRows: number;
  @Input() inHomeView: boolean;
  @Input() isListUpdated: boolean = false;
  @Output() isListUpdatedChange = new EventEmitter<boolean>();

  displayedData: Stock[];
  totalPages: number;
  isModalShown: boolean = false;
  selectedSymbol: string;

  constructor(private router: Router) {}
  ngOnInit() {
    this.currentPage = 1;
    this.calculateTotalRows();
    this.calculateTotalPages();
    this.updateDisplayedData();
    console.log(this.tableData);
  }

  handleClick(stockSymbol: string) {
    if (this.inHomeView) {
      this.router.navigate(['/details', stockSymbol]);
    } else {
      this.selectedSymbol = stockSymbol;
      console.log(this.selectedSymbol);
      this.showModal();
    }
  }

  calculateTotalRows(): void {
    this.totalRows = this.tableData.length;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalRows / this.rowsPerPage);
  }

  updateDisplayedData(): void {
    this.tableData = this.tableData.sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );

    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.displayedData = this.tableData.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }

  keepOrder = (a) => {
    return a;
  };

  addToWatchList(symbol: string) {
    this.selectedSymbol = symbol;
    this.showModal();
  }

  showModal() {
    this.isModalShown = true;
  }

  closeModalAndRefresh() {
    if (!this.inHomeView) {
      this.isListUpdatedChange.emit(!this.isListUpdatedChange);
    }
  }
}
