import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
  // { providedIn: 'root'}
)

export class AuthService {

  // visual 2019
  baseURL = environment.apiURL + 'api/user/';

  jwtHelper = new JwtHelperService();
  decodeToken: any;

  constructor(private httpClient: HttpClient) { }

  login(model: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}login`, model).pipe(
      map((RESPONSE: any) => {
        const user = RESPONSE;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}login`, model);
  }

  showMenu(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
