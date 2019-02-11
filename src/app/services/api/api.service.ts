import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiPath = 'http://localhost:8089/';

  constructor(
    private http: HttpClient
  ) { }

  login(data): Observable<any> {
    return this.http.post(this.apiPath + 'auth/login', data);
  }

  signin(data): Observable<any> {
    return this.http.post(this.apiPath + 'auth/signup', data);
  }

  getAdminData(): Observable<any> {
    return this.http.get(this.apiPath + 'admin/');
  }

  getPages(): Observable<any> {
    return this.http.get(this.apiPath + 'pages');
  }

  savePages(data): Observable<any> {
    return this.http.put(this.apiPath + 'pages', data);
  }
}
