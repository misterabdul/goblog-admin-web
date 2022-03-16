import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { CategoryDetailed, CategoryFormData } from '../types/category.type';
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

  public getTrashed(): Observable<Response<Array<CategoryDetailed>>> {
    return this._httpClient.get<Response<Array<CategoryDetailed>>>(
      UrlConfig.categories + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getCategory(id: string): Observable<Response<CategoryDetailed>> {
    return this._httpClient.get<Response<CategoryDetailed>>(
      UrlConfig.category + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitNewCategory(
    formData: CategoryFormData
  ): Observable<Response<CategoryDetailed>> {
    return this._httpClient.post<Response<CategoryDetailed>>(
      UrlConfig.category,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdateCategory(
    categoryId: string,
    formData: CategoryFormData
  ): Observable<Response<any>> {
    return this._httpClient.put<Response<any>>(
      UrlConfig.category + '/' + categoryId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeleteCategory(categoryId: string): Observable<Response<any>> {
    return this._httpClient.delete<Response<any>>(
      UrlConfig.category + '/' + categoryId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestoreCategory(categoryId: string): Observable<Response<any>> {
    return this._httpClient.put<Response<any>>(
      UrlConfig.category + '/' + categoryId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
