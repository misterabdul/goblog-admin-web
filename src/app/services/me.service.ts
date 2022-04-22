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
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MeService extends CommonAuthResourceService {
  private _isMeDataFetched: boolean;
  private _meDataSubject: Subject<UserDetailed | null | false>;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);

    this._isMeDataFetched = false as boolean;
    this._meDataSubject = new BehaviorSubject<UserDetailed | null | false>(
      false
    );
  }

  public getMe(): Observable<UserDetailed | null | false> {
    const meDataObservable = this._meDataSubject.asObservable();
    if (!this._isMeDataFetched) {
      this._isMeDataFetched = true as boolean;
      return this.fetchMe().pipe(switchMap(() => meDataObservable));
    }

    return meDataObservable;
  }

  public fetchMe(): Observable<Response<UserDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService
        .get<Response<UserDetailed>>(
          UrlConfig.me,
          HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
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
        )
    );
  }

  public clearMe(): void {
    this._isMeDataFetched = false as boolean;
    this._meDataSubject.next(false);
  }
}
