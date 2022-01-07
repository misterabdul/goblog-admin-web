import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import HttpConfig from '../configs/http.config';
import URL from '../configs/url.config';
import AuthResponse from '../types/auth-response.type';
import Response from '../types/response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient;
  private _accessToken: string | null;
  private _tokenType: string | null;
  private _checkForTokenRequest: Promise<boolean> | null;

  constructor(http: HttpClient) {
    this._http = http;
    this._accessToken = null;
    this._tokenType = null;
    this._checkForTokenRequest = null;
  }

  public authenticate(
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(
        URL.login,
        { username: username, password: password },
        HttpConfig.getDefaultOptions()
      )
      .pipe(
        map((authResponse) => {
          this._accessToken = authResponse.accessToken!;
          this._tokenType = authResponse.tokenType!;
          return authResponse;
        })
      );
  }

  public deauthenticate(): Observable<Response<any>> {
    return this._http
      .post<Response<any>>(URL.logout, null, HttpConfig.getDefaultOptions())
      .pipe(
        map((response) => {
          this._accessToken = null;
          this._tokenType = null;
          return response;
        })
      );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(
        URL.refreshToken,
        null,
        HttpConfig.getDefaultOptions()
      )
      .pipe(
        map((authResponse) => {
          this._accessToken = authResponse.accessToken!;
          this._tokenType = authResponse.tokenType!;
          return authResponse;
        })
      );
  }

  public async checkForToken(): Promise<boolean> {
    if (!this._checkForTokenRequest)
      this._checkForTokenRequest = this.checkForTokenRequest();
    return this._checkForTokenRequest;
  }

  private async checkForTokenRequest(): Promise<boolean> {
    try {
      if (!this.isAuthenticated) await this.refreshToken().toPromise();
    } finally {
      return this.isAuthenticated;
    }
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  get tokenType(): string | null {
    return this._tokenType;
  }

  get isAuthenticated(): boolean {
    return this._accessToken !== null && this._tokenType !== null;
  }
}
