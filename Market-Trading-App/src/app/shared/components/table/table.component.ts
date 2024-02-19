import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: any[];
  @Input() columnHeaders: string[];
  @Input() currentPage: number;
  @Input() rowsPerPage: number;
  @Input() totalRows: number;

  displayedData: any[];
  totalPages: number;

  ngOnInit() {
    // this.columnHeaders.unshift('');
    this.currentPage = 1;
    this.calculateTotalRows();
    this.calculateTotalPages();
    this.updateDisplayedData();
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
