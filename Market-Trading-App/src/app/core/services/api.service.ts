import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Stock, StockOld } from '../../shared/interfaces/stock';
import { CompanyDescription } from '../../shared/interfaces/companyDescription';
import { Overview } from '../../shared/interfaces/overview';
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
  private dataFetched: boolean = false;

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

  //should probably create a stock quote type for this instead of using 'any'
  // getStockQuoteBySymbol(symbol: string): Observable<any> {
  //   if (this.dataFetched) {
  //     let foundStock;
  //     console.log('cache returned');
  //     this.cachedData.forEach((stock) => {
  //       if (stock.name === symbol) {
  //         foundStock = stock;
  //       }
  //     });
  //     return of(foundStock);
  //   } else {
  //     return this.http
  //       .get<StockOld>(`${this.apiUrl}/Stocks/GetStockQuote/${symbol}`)
  //       .pipe(
  //         tap((data) => {
  //           data.name = symbol;
  //           this.cachedData.push(data);
  //           this.dataFetched = true;
  //         }),
  //         catchError((error) => {
  //           console.error('Error fetching data:', error);
  //           throw error;
  //         })
  //       );
  //   }
  // }

  // getCompanyOverviewBySymbol(symbol: string): Observable<Overview> {
  //   return this.http
  //     .get<Overview>(`${this.apiUrl}/Stocks/GetCompanyOverview/${symbol}`)
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error:', error);
  //         throw error;
  //       })
  //     );
  // }

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
