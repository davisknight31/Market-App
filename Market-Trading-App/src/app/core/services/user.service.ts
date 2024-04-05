import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5286/api';
  username: string;
  userId: string;
  watchlists: [];
  loggedIn: boolean = false;
  // any other info

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/User/Login`, {
        username,
        password,
      })
      .pipe(
        tap((data) => {
          this.userId = data.userid;
          this.username = data.username;
          this.loggedIn = true;
          console.log(this.userId, this.username);
        }),
        catchError((error) => {
          console.error('Error:', error);
          let errorMessage: string;
          if (error.status === 404) {
            errorMessage = 'Username or password is incorrect.';
          } else {
            errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  createUser(username: string, password: string): Observable<any> {
    return this.http
      .post<User>(`${this.apiUrl}/User/login`, {
        username,
        password,
      })
      .pipe(
        tap((data) => {
          this.userId = data.userid;
          this.username = data.username;
          this.loggedIn = true;
          console.log(this.userId, this.username);
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
}