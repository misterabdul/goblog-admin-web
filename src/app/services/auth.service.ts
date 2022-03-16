import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

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
  private _isCheckingToken: boolean;
  private _tokenCheckSubject: BehaviorSubject<TokenCheckStatus>;

  constructor(http: HttpClient) {
    this._accessToken = null;
    this._tokenType = null;
    this._isCheckingToken = false;
    this._tokenCheckSubject = new BehaviorSubject<TokenCheckStatus>(
      TokenCheckStatus.CHECKING
    );

    this._http = http;
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
          this._accessToken = authResponse.data!.accessToken!;
          this._tokenType = authResponse.data!.tokenType!;
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
        this._accessToken = null;
        this._tokenType = null;
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
          this._accessToken = authResponse.data!.accessToken!;
          this._tokenType = authResponse.data!.tokenType!;
          return authResponse;
        })
      );
  }

  public checkForToken(): Observable<TokenCheckStatus> {
    if (!this._isCheckingToken) {
      this._isCheckingToken = true;
      this._tokenCheckSubject.next(TokenCheckStatus.CHECKING);

      return this.refreshToken().pipe(
        switchMap(() => {
          this._tokenCheckSubject.next(TokenCheckStatus.CHECK);
          return this._tokenCheckSubject;
        }),
        catchError(() => {
          this.deauthenticate();
          this._tokenCheckSubject.next(TokenCheckStatus.NO_TOKEN);
          return this._tokenCheckSubject;
        }),
        finalize(() => {
          this._isCheckingToken = false;
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
