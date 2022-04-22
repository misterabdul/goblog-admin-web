import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { CommentDetailed } from '../types/comment.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getComments(): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.comments,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.comments + '?trash=true',
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPostComments(
    postUid: string
  ): Observable<Response<Array<CommentDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<CommentDetailed>>>(
        UrlConfig.post + '/' + postUid + '/comments',
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
