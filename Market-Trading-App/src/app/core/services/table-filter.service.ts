import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableFilterService {
  selectedStockList: string;

  constructor() {}

  setSelectedStockList(stockListChoice: string) {
    this.selectedStockList = stockListChoice;
  }
}
