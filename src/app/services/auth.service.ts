import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { Response } from '../types/response.type';
import { AuthData } from '../types/auth-data.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClientService: HttpClient;

  private _isAuthTokenFetched: boolean;
  private _authTokenSubject: Subject<AuthenticationToken | null | false>;

  constructor(httpClientService: HttpClient) {
    this._httpClientService = httpClientService;

    this._isAuthTokenFetched = false;
    this._authTokenSubject = new BehaviorSubject<
      AuthenticationToken | null | false
    >(false);
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
          this._authTokenSubject.next(new AuthenticationToken(authResponse));
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
          this._authTokenSubject.next(false);
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
          this._authTokenSubject.next(new AuthenticationToken(authResponse));
        })
      );
  }

  public getAuthToken(
    forceRefresh?: boolean
  ): Observable<AuthenticationToken | null | false> {
    const authTokenObservable = this._authTokenSubject.asObservable();
    if (forceRefresh === true || !this._isAuthTokenFetched) {
      this._isAuthTokenFetched = true;

      return this.refreshToken().pipe(
        switchMap(() => authTokenObservable),
        catchError(() => {
          this.deauthenticate();
          this._authTokenSubject.next(false);
          return authTokenObservable;
        })
      );
    }

    return authTokenObservable;
  }
}

export class AuthenticationToken {
  private _tokenType: string | null;
  private _token: string | null;

  public toString = (): string => this._tokenType + ' ' + this._token;

  constructor(
    token: Response<AuthData> | string,
    tokenType?: string | undefined
  ) {
    if (typeof token === 'string') {
      this._token = token;
      this._tokenType = tokenType ?? null;
    } else {
      this._token = token.data?.accessToken ?? null;
      this._tokenType = token.data?.tokenType ?? null;
    }
  }

  get token(): string | null {
    return this._token;
  }

  get tokenType(): string | null {
    return this._tokenType;
  }
}

export abstract class CommonAuthResourceService {
  protected _httpClientService: HttpClient;
  protected _authService: AuthService;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;
    this._authService = authService;
  }

  protected getAuthToken<T>(
    handler: (authToken: AuthenticationToken | null) => Observable<T>
  ): Observable<T> {
    return this._authService.getAuthToken().pipe(
      filter((authToken) => authToken !== false),
      take(1),
      map((authToken) => (authToken === false ? null : authToken)),
      switchMap((authToken) => handler(authToken))
    );
  }

  protected commonShowPageQuery(show?: number, page?: number): string {
    return 'show=' + (show ?? 25) + '&page=' + (page ?? 1);
  }
}
