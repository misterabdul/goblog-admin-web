import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { UserDetailed, UserFormData } from '../types/user.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClientService: HttpClient;
  private _authService: AuthService;

  private _authorizationToken: string | null;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;
    this._authService = authService;

    this._authorizationToken = this._authService.isAuthenticated
      ? this._authService.tokenType + ' ' + this._authService.accessToken
      : null;
  }

  public getUsers(): Observable<Response<Array<UserDetailed>>> {
    return this._httpClientService.get<Response<Array<UserDetailed>>>(
      UrlConfig.users,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<UserDetailed>>> {
    return this._httpClientService.get<Response<Array<UserDetailed>>>(
      UrlConfig.users + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getUser(id: string): Observable<Response<UserDetailed>> {
    return this._httpClientService.get<Response<UserDetailed>>(
      UrlConfig.user + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitCreateUser(
    formData: UserFormData
  ): Observable<Response<UserDetailed>> {
    return this._httpClientService.post<Response<UserDetailed>>(
      UrlConfig.user,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdateUser(
    userId: string,
    formData: UserFormData
  ): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.user + '/' + userId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeleteUser(userId: string): Observable<Response<any>> {
    return this._httpClientService.delete<Response<any>>(
      UrlConfig.user + '/' + userId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestoreUser(userId: string): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.user + '/' + userId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
