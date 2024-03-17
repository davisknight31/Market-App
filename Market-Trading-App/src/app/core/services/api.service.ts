import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Stock } from '../../shared/interfaces/stock';
import { Overview } from '../../shared/interfaces/overview';
import { Data } from '../../shared/interfaces/data';
import { Profile } from '../../shared/interfaces/profile';
import { NewsArticles } from '../../shared/interfaces/newsArticles';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5286/api';
  cachedData: Stock[] = [];
  private dataFetched: boolean = false;

  constructor(private http: HttpClient) {}

  defaultStock: Stock = {
    name: 'Cache Not Found',
    c: 'N/A',
    d: 'N/A',
    dp: 'N/A',
    h: 'N/A',
    l: 'N/A',
    o: 'N/A',
    pc: 'N/A',
  };

  //should probably create a stock quote type for this instead of using 'any'
  getStockQuoteBySymbol(symbol: string): Observable<any> {
    if (this.dataFetched) {
      let foundStock;
      console.log('cache returned');
      this.cachedData.forEach((stock) => {
        if (stock.name === symbol) {
          foundStock = stock;
        }
      });
      return of(foundStock);
    } else {
      return this.http
        .get<Stock>(`${this.apiUrl}/Stocks/GetStockQuote/${symbol}`)
        .pipe(
          tap((data) => {
            data.name = symbol;
            this.cachedData.push(data);
            this.dataFetched = true;
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            throw error;
          })
        );
    }
  }

  getCompanyOverviewBySymbol(symbol: string): Observable<Overview> {
    return this.http
      .get<Overview>(`${this.apiUrl}/Stocks/GetCompanyOverview/${symbol}`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  getStockDataBySymbol(symbol: string): Observable<Data> {
    return this.http
      .get<Data>(`${this.apiUrl}/Stocks/GetStockData/${symbol}`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  GetCompanyProfileBySymbol(symbol: string): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.apiUrl}/Stocks/GetCompanyProfile/${symbol}`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  GetNewsArticles(): Observable<NewsArticles> {
    return this.http
      .get<NewsArticles>(`${this.apiUrl}/Stocks/GetNewsArticles`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }
}
