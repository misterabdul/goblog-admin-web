import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpConfig } from '../configs/http.config';
import { UrlConfig } from '../configs/url.config';

import { Response } from '../types/response.type';
import { CategoryDetailed, CategoryFormData } from '../types/category.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getCategories(): Observable<Response<Array<CategoryDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CategoryDetailed>>>(
        UrlConfig.categories,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(): Observable<Response<Array<CategoryDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CategoryDetailed>>>(
        UrlConfig.categories + '?type=trash',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getCategory(id: string): Observable<Response<CategoryDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<CategoryDetailed>>(
        UrlConfig.category + '/' + id,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitNewCategory(
    formData: CategoryFormData
  ): Observable<Response<CategoryDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.post<Response<CategoryDetailed>>(
        UrlConfig.category,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitUpdateCategory(
    categoryId: string,
    formData: CategoryFormData
  ): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.category + '/' + categoryId,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitDeleteCategory(categoryId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.delete<Response<any>>(
        UrlConfig.category + '/' + categoryId,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitRestoreCategory(categoryId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.category + '/' + categoryId + '/detrash',
        {},
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }
}
