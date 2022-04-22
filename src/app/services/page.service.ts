import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { PageDetailed, PageFormData } from '../types/page.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PageService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getPages(): Observable<Response<Array<PageDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PageDetailed>>>(
        UrlConfig.pages,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getDrafts(): Observable<Response<Array<PageDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PageDetailed>>>(
        UrlConfig.pages + '?type=draft',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPublished(): Observable<Response<Array<PageDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PageDetailed>>>(
        UrlConfig.pages + '?type=published',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(): Observable<Response<Array<PageDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PageDetailed>>>(
        UrlConfig.pages + '?type=trash',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPage(id: string): Observable<Response<PageDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<PageDetailed>>(
        UrlConfig.page + '/' + id,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitNewPage(
    formData: PageFormData
  ): Observable<Response<PageDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.post<Response<PageDetailed>>(
        UrlConfig.submitPage,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitUpdatePage(
    pageId: string,
    formData: PageFormData
  ): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.submitPage + '/' + pageId,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitDeletePage(pageId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.delete<Response<any>>(
        UrlConfig.submitPage + '/' + pageId,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitRestorePage(pageId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.submitPage + '/' + pageId + '/detrash',
        {},
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }
}
