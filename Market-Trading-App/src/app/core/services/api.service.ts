import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Stock, StockOld } from '../../shared/interfaces/stock';
import { CompanyDescription } from '../../shared/interfaces/companyDescription';
import { Data } from '../../shared/interfaces/data';
import { Profile } from '../../shared/interfaces/profile';
import { NewsArticles } from '../../shared/interfaces/newsArticles';
import { HistoricalBars } from '../../shared/interfaces/bars';
import { TradesimChoice } from '../../shared/interfaces/tradesimChoice';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'https://market-trading-app-davis.com/api';
  private apiUrl = 'https://localhost:5286/api';
  cachedData: StockOld[] = [];

  constructor(private http: HttpClient) {}

  defaultStock: StockOld = {
    name: 'Cache Not Found',
    c: 'N/A',
    d: 'N/A',
    dp: 'N/A',
    h: 'N/A',
    l: 'N/A',
    o: 'N/A',
    pc: 'N/A',
  };

  //in use
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

  //in use
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

  //in use
  getNewsArticles(): Observable<NewsArticles> {
    return this.http
      .get<NewsArticles>(`${this.apiUrl}/Stocks/GetNewsArticles`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  //in use
  getStocks(symbols: string[]): Observable<Stock[]> {
    const params = new HttpParams().set('symbols', symbols.join(','));

    return this.http
      .get<Stock[]>(`${this.apiUrl}/Stocks/GetStocks`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  //in use
  getTopMovers(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/Stocks/GetTopMovers`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  //in use
  getMostActive(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/Stocks/GetMostActive`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  //in use
  getTradesimsChoices(): Observable<TradesimChoice[]> {
    return this.http
      .get<TradesimChoice[]>(`${this.apiUrl}/Stocks/GetTradesimsChoices`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  //in use
  getCompanyDescription(symbol: string): Observable<CompanyDescription> {
    return this.http
      .get<CompanyDescription>(
        `${this.apiUrl}/Stocks/GetCompanyDescription/${symbol}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  //in use
  getHistoricalBars(symbol: string): Observable<HistoricalBars> {
    return this.http
      .get<HistoricalBars>(`${this.apiUrl}/Stocks/GetHistoricalBars/${symbol}`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }
}
