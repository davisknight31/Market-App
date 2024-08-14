import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Watchlist, Watchlists } from '../../shared/interfaces/watchlists';
import { Share } from '../../shared/interfaces/share';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiUrl = 'https://market-trading-app-davis.com/api';
  private apiUrl = 'https://localhost:5286/api';
  user: User;
  username: string;
  userId: string;
  balance: number;
  watchlists: Watchlist[] = [];
  shares: Share[] = [];
  selectedWatchlist: Watchlist;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/User/Login`, {
        username,
        password,
      })
      .pipe(
        tap((data) => {
          this.user = data;
          this.userId = data.userid;
          this.username = data.username;
          this.balance = data.balance;
          this.loggedIn = true;
        }),
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 404) {
            errorMessage = 'Username or password is incorrect.';
          }
          // else if (error.status === 400) {
          //   }
          else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  createUser(username: string, password: string): Observable<any> {
    return this.http
      .post<User>(`${this.apiUrl}/User/CreateUser`, {
        username,
        password,
      })
      .pipe(
        tap((data) => {
          this.userId = data.userid;
          this.username = data.username;
          this.balance = data.balance;
          this.loggedIn = true;
        }),
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 400) {
            errorMessage = 'Username already exists';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  getWatchlists() {
    return this.http
      .get<Watchlists>(`${this.apiUrl}/Watchlist/GetWatchlists/${this.userId}`)
      .pipe(
        tap((data) => {
          this.watchlists = data.watchlists;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  addStockToWatchlist(watchlistid: number, symbol: string) {
    return this.http
      .put<Watchlist>(`${this.apiUrl}/Watchlist/AddToWatchlist`, {
        watchlistid,
        symbol,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 400) {
            errorMessage = 'This watchlist already contains this symbol.';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  createNewWatchlist(symbol: string, name: string, userid: string) {
    return this.http
      .post<Watchlist>(`${this.apiUrl}/Watchlist/CreateAndAddToWatchlist`, {
        userid,
        name,
        symbol,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 400) {
            errorMessage = 'A watchlist already exists with that name.';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  removeStockFromWatchlist(watchlistEntryId: number) {
    return this.http.delete<Watchlists>(
      `${this.apiUrl}/Watchlist/RemoveWatchlistEntry/${watchlistEntryId}`
    );
  }

  deleteWatchlist(watchlistId: number) {
    return this.http.delete<Watchlists>(
      `${this.apiUrl}/Watchlist/RemoveWatchlist/${watchlistId}`
    );
  }

  getBalance() {
    return this.http
      .get<number>(`${this.apiUrl}/User/GetUserBalance/${this.userId}`)
      .pipe(
        tap((data) => {
          this.balance = data;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  addToBalance(amount: number) {
    return this.http
      .post<number>(
        `${this.apiUrl}/User/AddToBalance/${this.userId}/${amount}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  removeFromBalance(amount: number) {
    return this.http
      .post<number>(
        `${this.apiUrl}/User/RemoveFromBalance/${this.userId}/${amount}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  getShares() {
    return this.http
      .get<Share[]>(`${this.apiUrl}/Shares/GetUserShares/${this.userId}`)
      .pipe(
        tap((data) => {
          this.shares = data;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  purchaseShares(
    userid: number,
    symbolid: number,
    quantity: number,
    price: number
  ) {
    return this.http
      .post<Share>(`${this.apiUrl}/Shares/PurchaseShares`, {
        userid,
        symbolid,
        quantity,
        price,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 400) {
            errorMessage = 'The user does not have the required funds.';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  sellShares(
    userid: number,
    symbolid: number,
    quantity: number,
    price: number
  ) {
    return this.http
      .post<Share>(`${this.apiUrl}/Shares/SellShares`, {
        userid,
        symbolid,
        quantity,
        price,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 400) {
            errorMessage = 'The user does not have the required funds.';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  updatePersonalInfo(
    userid: string,
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    phonenumber: string
  ) {
    return this.http
      .put<User>(`${this.apiUrl}/User/UpdateUserPersonalDetails`, {
        userid,
        username,
        email,
        firstname,
        lastname,
        phonenumber,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          errorMessage =
            'An error occurred updating the info. Please try again later.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  getUserById() {
    return this.http
      .get<User>(`${this.apiUrl}/User/GetUserById/${this.userId}`)
      .pipe(
        tap((data) => {
          this.user = data;
          this.username = data.username;
          this.balance = data.balance;
        }),
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          errorMessage =
            'An error occurred updating the info. Please try again later.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  resetUser(): void {
    this.userId = '';
    this.username = '';
    this.watchlists = [];
    this.loggedIn = false;
  }
}
