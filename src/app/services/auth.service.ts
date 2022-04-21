import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { Response } from '../types/response.type';
import { AuthData } from '../types/auth-data.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClientService: HttpClient;

  private _accessToken: string | null;
  private _tokenType: string | null;
  private _firstTimeCheck: boolean;
  private _tokenCheckSubject: Subject<TokenCheckResult>;

  constructor(httpClientService: HttpClient) {
    this._httpClientService = httpClientService;

    this._accessToken = null;
    this._tokenType = null;
    this._firstTimeCheck = true;
    this._tokenCheckSubject = new BehaviorSubject<TokenCheckResult>({
      status: TokenCheckStatus.CHECKING,
      authResponse: null,
    });
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

    return this._httpClientService
      .post<Response<AuthData>>(
        UrlConfig.login,
        {
          username: username,
          password: password,
        },
        options
      )
      .pipe(
        tap((authResponse) => {
          this.saveTokens(authResponse);
          this._tokenCheckSubject.next({
            status: TokenCheckStatus.CHECK,
            authResponse: authResponse,
          });
        })
      );
  }

  public deauthenticate(): Observable<Response<any>> {
    const options = HttpConfig.getDefaultOptions();
    options.withCredentials = true;

    return this._httpClientService
      .post<Response<any>>(UrlConfig.logout, null, options)
      .pipe(
        tap(() => {
          this.clearTokens();
          this._tokenCheckSubject.next({
            status: TokenCheckStatus.NO_TOKEN,
            authResponse: null,
          });
        })
      );
  }

  public refreshToken(): Observable<Response<AuthData>> {
    const options = HttpConfig.getDefaultOptions();
    options.withCredentials = true;

    return this._httpClientService
      .post<Response<AuthData>>(UrlConfig.refreshToken, null, options)
      .pipe(
        tap((authResponse) => {
          this.saveTokens(authResponse);
          this._tokenCheckSubject.next({
            status: TokenCheckStatus.CHECK,
            authResponse: authResponse,
          });
        })
      );
  }

  public getTokenCheckStatus(): Observable<TokenCheckResult> {
    if (this._firstTimeCheck) {
      this._firstTimeCheck = false;

      return this.refreshToken().pipe(
        switchMap(() => {
          return this._tokenCheckSubject.asObservable();
        }),
        catchError(() => {
          this.deauthenticate();
          this._tokenCheckSubject.next({
            status: TokenCheckStatus.NO_TOKEN,
            authResponse: null,
          });

          return this._tokenCheckSubject.asObservable();
        })
      );
    }

    return this._tokenCheckSubject.asObservable();
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
  CHECKING = -1,
  NO_TOKEN = 0,
  CHECK = 1,
}

export type TokenCheckResult = {
  status: TokenCheckStatus;
  authResponse: Response<AuthData> | null;
};
