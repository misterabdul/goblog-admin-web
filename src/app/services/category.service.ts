import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { CategoryDetailed } from '../types/category.type';
import { Response } from '../types/response.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _authorizationToken: string | null;
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this._httpClient = httpClient;
    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getCategories(): Observable<Response<Array<CategoryDetailed>>> {
    return this._httpClient.get<Response<Array<CategoryDetailed>>>(
      UrlConfig.categories,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getCategory(id: string): Observable<CategoryDetailed> {
    return this._httpClient.get<CategoryDetailed>(
      UrlConfig.category + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
