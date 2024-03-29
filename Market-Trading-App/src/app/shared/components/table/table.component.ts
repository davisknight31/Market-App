import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../interfaces/stock';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: any[];
  @Input() columnHeaders: string[];
  @Input() currentPage: number;
  @Input() rowsPerPage: number;
  @Input() totalRows: number;

  displayedData: Stock[];
  totalPages: number;

  constructor(private router: Router) {}
  ngOnInit() {
    this.currentPage = 1;
    this.calculateTotalRows();
    this.calculateTotalPages();
    this.updateDisplayedData();
    console.log(this.tableData);
  }

  navigateToDetails(stockSymbol: string) {
    console.log(stockSymbol);
    this.router.navigate(['/details', stockSymbol]);
  }

  calculateTotalRows(): void {
    this.totalRows = this.tableData.length;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalRows / this.rowsPerPage);
  }

  updateDisplayedData(): void {
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
}
