import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Stock } from '../../shared/interfaces/stock';
import { ApiService } from '../../core/services/api.service';
import { NgIf } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { NewsCardComponent } from '../../shared/components/news-card/news-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    TableComponent,
    NgIf,
    NewsCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  responseData: Stock[] = [];
  stockSymbols: string[] = [];
  tableColumnHeaders: string[] = [];
  isLoading: boolean = true;
  isDataCached: boolean = false;

  stockDetails: Stock[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.stockSymbols.push(
      'MSFT',
      'AMZN',
      'TSLA',
      'AAPL',
      'NVDA',
      'META',
      'PEP'
    );
    this.tableColumnHeaders.push(
      'Name',
      'Current Price',
      'Change',
      '% Change',
      'Daily High',
      'Daily Low',
      'Open Price',
      'Previous Close'
    );
    this.getStockQuotes(this.stockSymbols);
  }

  getStockQuotes(stockSymbols: string[]): void {
    const observables: Observable<any>[] = [];
    this.responseData = [];

    stockSymbols.forEach((symbol) => {
      observables.push(this.apiService.getStockQuoteBySymbol(symbol));
    });

    forkJoin(observables).subscribe({
      next: (responses) => {
        console.log('All data received', responses);
        this.responseData = responses;

        let i = 0;
        this.responseData.forEach((response) => {
          //creating new object to guarantee property order
          const object: Stock = {
            name: response.name,
            c: response.c,
            d: response.d,
            dp: response.dp,
            h: response.h,
            l: response.l,
            o: response.o,
            pc: response.pc,
          };
          i++;
          this.stockDetails.push(object);
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.error('error fetching', error);
      },
    });
  }

  formatData() {}
}
