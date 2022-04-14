import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { Response } from '../types/response.type';
import { AuthData } from '../types/auth-data.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient;
  private _accessToken: string | null;
  private _tokenType: string | null;
  private _firstTimeCheck: boolean;
  private _tokenCheckSubject: BehaviorSubject<TokenCheckStatus>;

  constructor(http: HttpClient) {
    this._accessToken = null;
    this._tokenType = null;
    this._firstTimeCheck = true;
    this._tokenCheckSubject = new BehaviorSubject<TokenCheckStatus>(
      TokenCheckStatus.CHECKING
    );

    this._http = http;
  }

  private saveTokens(authResponse: Response<AuthData>) {
    this._accessToken = authResponse.data!.accessToken!;
    this._tokenType = authResponse.data!.tokenType!;
  }

  private clearTokens() {
    this._accessToken = null;
    this._tokenType = null;
  }

  public authenticate(
    username: string,
    password: string
  ): Observable<Response<AuthData>> {
    const options = HttpConfig.getDefaultOptions();
    options.withCredentials = true;

    return this._http
      .post<Response<AuthData>>(
        UrlConfig.login,
        {
          username: username,
          password: password,
        },
        options
      )
      .pipe(
        map((authResponse) => {
          this.saveTokens(authResponse);
          this._tokenCheckSubject.next(TokenCheckStatus.CHECK);

          return authResponse;
        })
      );
  }

  public deauthenticate(): Observable<Response<any>> {
    const options = HttpConfig.getDefaultOptions();
    options.withCredentials = true;

    return this._http.post<Response<any>>(UrlConfig.logout, null, options).pipe(
      map((response) => {
        this.clearTokens();
        this._tokenCheckSubject.next(TokenCheckStatus.NO_TOKEN);

        return response;
      })
    );
  }

  public refreshToken(): Observable<Response<AuthData>> {
    const options = HttpConfig.getDefaultOptions();
    options.withCredentials = true;

    return this._http
      .post<Response<AuthData>>(UrlConfig.refreshToken, null, options)
      .pipe(
        map((authResponse) => {
          this.saveTokens(authResponse);

          return authResponse;
        })
      );
  }

  public getTokenCheckStatus(): Observable<TokenCheckStatus> {
    if (this._firstTimeCheck) {
      this._firstTimeCheck = false;
      this._tokenCheckSubject.next(TokenCheckStatus.CHECKING);

      return this.refreshToken().pipe(
        concatMap(() => {
          this._tokenCheckSubject.next(TokenCheckStatus.CHECK);
          return this._tokenCheckSubject;
        }),
        catchError(() => {
          this.deauthenticate();
          this._tokenCheckSubject.next(TokenCheckStatus.NO_TOKEN);
          return this._tokenCheckSubject;
        })
      );
    }

    return this._tokenCheckSubject;
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

export enum TokenCheckStatus {
  CHECKING = 0,
  NO_TOKEN = 1,
  CHECK = 2,
}
