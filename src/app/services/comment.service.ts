import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { CommentDetailed } from '../types/comment.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _httpClientService: HttpClient;

  private _authorizationToken: string | null;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;

    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getComments(): Observable<Response<Array<CommentDetailed>>> {
    return this._httpClientService.get<Response<Array<CommentDetailed>>>(
      UrlConfig.comments,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<CommentDetailed>>> {
    return this._httpClientService.get<Response<Array<CommentDetailed>>>(
      UrlConfig.comments + '?trash=true',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPostComments(
    postUid: string
  ): Observable<Response<Array<CommentDetailed>>> {
    return this._httpClientService.get<Response<Array<CommentDetailed>>>(
      UrlConfig.post + '/' + postUid + '/comments',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getComment(uid: string): Observable<Response<CommentDetailed>> {
    return this._httpClientService.get<Response<CommentDetailed>>(
      UrlConfig.comment + '/' + uid,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeleteComment(uid: string): Observable<Response<any>> {
    return this._httpClientService.delete<Response<any>>(
      UrlConfig.comment + '/' + uid,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestoreComment(uid: string): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.comment + '/' + uid + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
