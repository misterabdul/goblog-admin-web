import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { Response } from '../types/response.type';
import { UserDetailed } from '../types/user.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private _httpClientService: HttpClient;
  private _authService: AuthService;

  private _isFetched: boolean;
  private _authorizationToken: string | null;
  private _meDataSubject: Subject<UserDetailed | null | undefined>;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;
    this._authService = authService;

    this._isFetched = false as boolean;
    this._authorizationToken = this._authService.isAuthenticated
      ? this._authService.tokenType + ' ' + this._authService.accessToken
      : null;
    this._meDataSubject = new BehaviorSubject<UserDetailed | null | undefined>(
      undefined
    );
  }

  public getMe(): Observable<UserDetailed | null | undefined> {
    if (!this._isFetched) {
      this._isFetched = true as boolean;
      return this.fetchMe().pipe(
        switchMap(() => {
          return this._meDataSubject.asObservable();
        })
      );
    }

    return this._meDataSubject.asObservable();
  }

  public fetchMe(): Observable<Response<UserDetailed>> {
    return this._httpClientService
      .get<Response<UserDetailed>>(
        UrlConfig.me,
        HttpConfig.getDefaultAuthenticatedOptions(
          this._authorizationToken ?? ''
        )
      )
      .pipe(
        tap((response) => {
          this._meDataSubject.next(response.data ?? null);
        }),
        catchError((error) => {
          this._meDataSubject.next(null);

          return throwError(() => {
            return error;
          });
        })
      );
  }

  public clearMe(): void {
    this._isFetched = false as boolean;
    this._meDataSubject.next(undefined);
  }
}
