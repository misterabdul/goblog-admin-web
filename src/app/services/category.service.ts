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
  private _httpClientService: HttpClient;

  private _authorizationToken: string | null;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;

    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getCategories(): Observable<Response<Array<CategoryDetailed>>> {
    return this._httpClientService.get<Response<Array<CategoryDetailed>>>(
      UrlConfig.categories,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<CategoryDetailed>>> {
    return this._httpClientService.get<Response<Array<CategoryDetailed>>>(
      UrlConfig.categories + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getCategory(id: string): Observable<Response<CategoryDetailed>> {
    return this._httpClientService.get<Response<CategoryDetailed>>(
      UrlConfig.category + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitNewCategory(
    formData: CategoryFormData
  ): Observable<Response<CategoryDetailed>> {
    return this._httpClientService.post<Response<CategoryDetailed>>(
      UrlConfig.category,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdateCategory(
    categoryId: string,
    formData: CategoryFormData
  ): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.category + '/' + categoryId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeleteCategory(categoryId: string): Observable<Response<any>> {
    return this._httpClientService.delete<Response<any>>(
      UrlConfig.category + '/' + categoryId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestoreCategory(categoryId: string): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.category + '/' + categoryId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
