import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { PostDetailed, PostFormData } from '../types/post.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _httpClientService: HttpClient;

  private _authorizationToken: string | null;

  constructor(httpClientService: HttpClient, authService: AuthService) {
    this._httpClientService = httpClientService;

    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getPosts(): Observable<Response<Array<PostDetailed>>> {
    return this._httpClientService.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getDrafts(): Observable<Response<Array<PostDetailed>>> {
    return this._httpClientService.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=draft',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPublished(): Observable<Response<Array<PostDetailed>>> {
    return this._httpClientService.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=published',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<PostDetailed>>> {
    return this._httpClientService.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPost(id: string): Observable<Response<PostDetailed>> {
    return this._httpClientService.get<Response<PostDetailed>>(
      UrlConfig.post + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitNewPost(
    formData: PostFormData
  ): Observable<Response<PostDetailed>> {
    return this._httpClientService.post<Response<PostDetailed>>(
      UrlConfig.submitPost,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdatePost(
    postId: string,
    formData: PostFormData
  ): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.submitPost + '/' + postId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeletePost(postId: string): Observable<Response<any>> {
    return this._httpClientService.delete<Response<any>>(
      UrlConfig.submitPost + '/' + postId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestorePost(postId: string): Observable<Response<any>> {
    return this._httpClientService.put<Response<any>>(
      UrlConfig.submitPost + '/' + postId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
