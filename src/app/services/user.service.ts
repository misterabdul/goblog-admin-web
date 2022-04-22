import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { UserDetailed, UserFormData } from '../types/user.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getUsers(): Observable<Response<Array<UserDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<UserDetailed>>>(
        UrlConfig.users,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(): Observable<Response<Array<UserDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<UserDetailed>>>(
        UrlConfig.users + '?type=trash',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getUser(id: string): Observable<Response<UserDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<UserDetailed>>(
        UrlConfig.user + '/' + id,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitCreateUser(
    formData: UserFormData
  ): Observable<Response<UserDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.post<Response<UserDetailed>>(
        UrlConfig.user,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitUpdateUser(
    userId: string,
    formData: UserFormData
  ): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.user + '/' + userId,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitDeleteUser(userId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.delete<Response<any>>(
        UrlConfig.user + '/' + userId,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitRestoreUser(userId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.user + '/' + userId + '/detrash',
        {},
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }
}
