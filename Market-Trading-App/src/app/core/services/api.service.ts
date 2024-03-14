import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Stock } from '../../shared/interfaces/stock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5286/api';
  private cachedData: Stock;
  private dataFetched: boolean = false;

  constructor(private http: HttpClient) {}

  //should probably create a stock quote type for this instead of using 'any'
  getStockQuoteBySymbol(symbol: string): Observable<any> {
    if (this.dataFetched) {
      console.log('cache returned');
      return of(this.cachedData);
    } else {
      return this.http
        .get<Stock>(`${this.apiUrl}/Stocks/GetStockQuote/${symbol}`)
        .pipe(
          tap((data) => {
            this.cachedData = data;
            this.dataFetched = true;
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            throw error;
          })
        );
    }
  }
}
