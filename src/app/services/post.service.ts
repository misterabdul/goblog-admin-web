import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import URL from '../configs/url.config';
import Response from '../types/response.type';
import PostDetailed, { PostFormData } from '../types/post.type';
import HttpConfig from '../configs/http.config';

import { AuthService } from './auth.service';

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
      URL.posts,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getDrafts(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      URL.posts + '?type=draft',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPublished(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      URL.posts + '?type=published',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getTrashed(): Observable<Response<Array<PostDetailed>>> {
    return this._http.get<Response<Array<PostDetailed>>>(
      URL.posts + '?type=trash',
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public getPost(id: string): Observable<PostDetailed> {
    return this._http.get<PostDetailed>(
      URL.post + '/' + id,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }

  public submitDraftPost(formData: PostFormData): Observable<PostDetailed> {
    return this._http.post<PostDetailed>(
      URL.submitPost,
      formData,
      HttpConfig.getDefaultAuthenticatedOptions(this._authorizationToken!)
    );
  }
}
