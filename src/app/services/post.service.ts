import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { AuthService } from './auth.service';
import { Response } from '../types/response.type';
import { PostDetailed, PostFormData } from '../types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _authorizationToken: string | null;

  constructor(private _http: HttpClient, authService: AuthService) {
    this._authorizationToken = authService.isAuthenticated
      ? authService.tokenType + ' ' + authService.accessToken
      : null;
  }

  public getPosts(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getDrafts(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=draft',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPublished(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=published',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      UrlConfig.posts + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPost(id: string): Observable<PostDetailed> {
    return this._http.get<PostDetailed>(
      UrlConfig.post + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDraftPost(formData: PostFormData): Observable<PostDetailed> {
    return this._http.post<PostDetailed>(
      UrlConfig.submitPost,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitUpdatePost(
    postId: string,
    formData: PostFormData
  ): Observable<void> {
    return this._http.put<void>(
      UrlConfig.submitPost + '/' + postId,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDeletePost(postId: string): Observable<void> {
    return this._http.delete<void>(
      UrlConfig.submitPost + '/' + postId,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitRestorePost(postId: string): Observable<void> {
    return this._http.put<void>(
      UrlConfig.submitPost + '/' + postId + '/detrash',
      {},
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
