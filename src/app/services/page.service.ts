import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { PageDetailed, PageFormData } from '../types/page.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private _httpClientService: HttpClient;

  private _authorizationToken: string | null;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;

    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getPages(): Observable<Response<Array<PageDetailed>>> {
    return this._httpClientService.get<Response<Array<PageDetailed>>>(
      UrlConfig.pages,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getDrafts(): Observable<Response<Array<PageDetailed>>> {
    return this._httpClientService.get<Response<Array<PageDetailed>>>(
      UrlConfig.pages + '?type=draft',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPublished(): Observable<Response<Array<PageDetailed>>> {
    return this._httpClientService.get<Response<Array<PageDetailed>>>(
      UrlConfig.pages + '?type=published',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<PageDetailed>>> {
    return this._httpClientService.get<Response<Array<PageDetailed>>>(
      UrlConfig.pages + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPage(id: string): Observable<Response<PageDetailed>> {
    return this._httpClientService.get<Response<PageDetailed>>(
      UrlConfig.page + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitNewPage(
    formData: PageFormData
  ): Observable<Response<PageDetailed>> {
    return this._httpClientService.post<Response<PageDetailed>>(
      UrlConfig.submitPage,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdatePage(
    pageId: string,
    formData: PageFormData
  ): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.submitPage + '/' + pageId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeletePage(pageId: string): Observable<Response<any>> {
    return this._httpClientService.delete<Response<any>>(
      UrlConfig.submitPage + '/' + pageId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestorePage(pageId: string): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.submitPage + '/' + pageId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
