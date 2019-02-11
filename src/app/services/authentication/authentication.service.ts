import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../api/api.service';
import { Observable, interval } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authInterval;
  private jwtHelper = new JwtHelperService();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  login(userData): Observable<any> {
    return this.apiService.login(userData)
      .pipe(map(res => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
        }
        this.setAuthInterval();
      }));
  }

  signin(userData): Observable<any> {
    return this.apiService.signin(userData)
      .pipe(map(res => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
        }
        this.setAuthInterval();
      }));
  }

  /**
   * Loggs user out
   */
  logout() {
    this.clearAuthInterval();
    localStorage.removeItem('jwt');
  }

  /**
   * Checks if token is expired
   */
  isExpire() {
    const token = localStorage.getItem('jwt');
    const now = Math.round(Date.now() / 1000);
    const expiredIn = this.jwtHelper.decodeToken(token).exp - now;
    if (expiredIn < 600) {
      return true;
    }
    return false;
  }

  /**
   * Renews token
   */
  renewToken(): Observable<boolean> {
    const userData = {
      username: '',
      password: ''
    };
    return this.apiService.signin(userData)
      .pipe(map(data => {
        localStorage.setItem('jwt', data.token);
        return true;
      },
      error => {
        return false;
      }));
  }

  /**
   * Checks if user is logged in
   */
  isLoggedIn() {
    const token = localStorage.getItem('jwt');
    if (token) {
      if (this.isExpire()) {
        return false;
      }
      return true;
    }
  }

  /**
   * Checks token every 5 seconds
   */
  setAuthInterval() {
    this.authInterval = interval(5000).pipe(
      map(() => this.isExpire())
    ).subscribe(resp => {
      if (resp) {
        this.renewToken()
          .subscribe(data => {
            this.clearAuthInterval();
            if (!data) {
              this.logout();
              return this.router.navigate(['/signin']);
            }
            this.setAuthInterval();
          },
          (error) => {
            this.logout();
            return this.router.navigate(['/signin']);
          });
      }
    });
  }

  /**
   * Clears interval which renews token
   */
  clearAuthInterval() {
    clearInterval(this.authInterval);
  }
}
