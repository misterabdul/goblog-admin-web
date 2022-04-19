import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
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

  private _authorizationToken: string | null;
  private _meDataSubject: BehaviorSubject<UserDetailed | null | undefined>;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;
    this._authService = authService;

    this._authorizationToken = this._authService.isAuthenticated
      ? this._authService.tokenType + ' ' + this._authService.accessToken
      : null;
    this._meDataSubject = new BehaviorSubject<UserDetailed | null | undefined>(
      undefined
    );
  }

  public getMe(): Observable<UserDetailed | null | undefined> {
    return this._meDataSubject;
  }

  public fetchMe(
    authorizationToken: string | undefined = undefined
  ): Observable<Response<UserDetailed>> {
    const _authorizationToken = authorizationToken ?? this._authorizationToken!;

    return this._httpClientService
      .get<Response<UserDetailed>>(
        UrlConfig.me,
        HttpConfig.getDefaultAuthenticatedOptions(_authorizationToken!)
      )
      .pipe(
        map((response) => {
          this._meDataSubject.next(response.data ?? null);

          return response;
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
    this._meDataSubject.next(undefined);
  }
}
