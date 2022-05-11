import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { CommentDetailed } from '../types/comment.type';
import { ResourceStats } from '../types/resource-stats.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getComments(
    show?: number,
    page?: number
  ): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.comments + '?' + this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getCommentsStats(
    show?: number,
    page?: number
  ): Observable<Response<ResourceStats>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<ResourceStats>>(
        UrlConfig.commentsStats + '?' + this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(
    show?: number,
    page?: number
  ): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.comments +
          '?trash=true&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashedStats(
    show?: number,
    page?: number
  ): Observable<Response<ResourceStats>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<ResourceStats>>(
        UrlConfig.commentsStats +
          '?trash=true&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPostComments(
    postUid: string,
    show?: number,
    page?: number
  ): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.post +
          '/' +
          postUid +
          '/comments?' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getComment(uid: string): Observable<Response<CommentDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<CommentDetailed>>(
        UrlConfig.comment + '/' + uid,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitDeleteComment(uid: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.delete<Response<any>>(
        UrlConfig.comment + '/' + uid,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitRestoreComment(uid: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.comment + '/' + uid + '/detrash',
        {},
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }
}
