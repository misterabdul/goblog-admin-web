import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';

import { Response } from '../types/response.type';
import { PostDetailed, PostFormData } from '../types/post.type';
import { ResourceStats } from '../types/resource-stats.type';
import { AuthService, CommonAuthResourceService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends CommonAuthResourceService {
  constructor(httpClientService: HttpClient, authService: AuthService) {
    super(httpClientService, authService);
  }

  public getPosts(
    show?: number,
    page?: number
  ): Observable<Response<Array<PostDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PostDetailed>>>(
        UrlConfig.posts + '?' + this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPostsStats(
    show?: number,
    page?: number
  ): Observable<Response<ResourceStats>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<ResourceStats>>(
        UrlConfig.postsStats + '?' + this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getDrafts(
    show?: number,
    page?: number
  ): Observable<Response<Array<PostDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PostDetailed>>>(
        UrlConfig.posts + '?type=draft&' + this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getDraftsStats(
    show?: number,
    page?: number
  ): Observable<Response<ResourceStats>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<ResourceStats>>(
        UrlConfig.postsStats +
          '?type=draft&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPublished(
    show?: number,
    page?: number
  ): Observable<Response<Array<PostDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PostDetailed>>>(
        UrlConfig.posts +
          '?type=published&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPublishedStats(
    show?: number,
    page?: number
  ): Observable<Response<ResourceStats>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<ResourceStats>>(
        UrlConfig.postsStats +
          '?type=published&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getTrashed(
    show?: number,
    page?: number
  ): Observable<Response<Array<PostDetailed>>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<Array<PostDetailed>>>(
        UrlConfig.posts + '?type=trash&' + this.commonShowPageQuery(show, page),
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
        UrlConfig.postsStats +
          '?type=trash&' +
          this.commonShowPageQuery(show, page),
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public getPost(id: string): Observable<Response<PostDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.get<Response<PostDetailed>>(
        UrlConfig.post + '/' + id,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitNewPost(
    formData: PostFormData
  ): Observable<Response<PostDetailed>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.post<Response<PostDetailed>>(
        UrlConfig.submitPost,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitUpdatePost(
    postId: string,
    formData: PostFormData
  ): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.submitPost + '/' + postId,
        formData,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitDeletePost(postId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.delete<Response<any>>(
        UrlConfig.submitPost + '/' + postId,
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }

  public submitRestorePost(postId: string): Observable<Response<any>> {
    return this.getAuthToken((authToken) =>
      this._httpClientService.put<Response<any>>(
        UrlConfig.submitPost + '/' + postId + '/detrash',
        {},
        HttpConfig.getDefaultAuthenticatedOptions(authToken?.toString() ?? '')
      )
    );
  }
}
