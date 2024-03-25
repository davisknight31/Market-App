import { Component } from '@angular/core';
import { TableFilterService } from '../../../core/services/table-filter.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private tableFilterService: TableFilterService) {}

  updateSelectedFilter(choice: string) {
    this.tableFilterService.selectedStockList = choice;
  }
}
