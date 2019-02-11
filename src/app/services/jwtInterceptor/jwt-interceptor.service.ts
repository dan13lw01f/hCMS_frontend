import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request);
  }
}
