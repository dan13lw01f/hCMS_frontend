import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, OnDestroy {
  authRenewTokenSubscription: Subscription;
  authRenewTokenChildSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('jwt')) {
        if (this.authService.isExpire()) {
          this.authRenewTokenSubscription = this.authService.renewToken()
            .subscribe(data => {
              if (!data) {
                this.goToSignIn(state);
              }
            },
            (error) => {
              return this.router.navigate(['/signin']);
            });
        }
        return true;
      }
      this.goToSignIn(state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('jwt')) {
        if (this.authService.isExpire()) {
          this.authRenewTokenChildSubscription = this.authService.renewToken()
          .subscribe(data => {
            if (!data) {
              this.goToSignIn(state);
            }
          },
          (error) => {
            return this.router.navigate(['/signin']);
          });
        }
        return true;
      }
      this.goToSignIn(state);
  }
  goToSignIn(state) {
    this.router.navigate(['/signin'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  ngOnDestroy() {
  }
}
