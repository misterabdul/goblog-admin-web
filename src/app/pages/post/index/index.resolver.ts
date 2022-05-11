import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';

import { PostDetailed } from 'src/app/types/post.type';
import { Response } from 'src/app/types/response.type';
import { ResourceStats } from 'src/app/types/resource-stats.type';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabDraftResolver
  implements Resolve<PostDetailed[] | null>
{
  protected _postService: PostService;

  protected _tabObservable: (
    show: number,
    page: number
  ) => Observable<Response<PostDetailed[]>>;

  constructor(postService: PostService) {
    this._postService = postService;

    this._tabObservable = (page, number) =>
      this._postService.getDrafts(page, number);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PostDetailed[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabDraftStatsResolver
  implements Resolve<ResourceStats | null>
{
  protected _postService: PostService;

  protected _resolvedOnce: boolean;
  protected _resolverSubject: Subject<ResourceStats | null>;
  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<ResourceStats>>;

  constructor(postService: PostService) {
    this._postService = postService;

    this._resolvedOnce = false as boolean;
    this._resolverSubject = new ReplaySubject<ResourceStats | null>(1);
    this._tabObservable = (page, number) =>
      this._postService.getDraftsStats(page, number);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ResourceStats | null> {
    if (!this._resolvedOnce) {
      this._resolvedOnce = true as boolean;

      return this._tabObservable(
        route.queryParams.show ?? null,
        route.queryParams.page ?? null
      ).pipe(
        take(1),
        map((response) => response?.data ?? null),
        switchMap((stats) => {
          this._resolverSubject.next(stats);
          this._resolverSubject.complete();

          return this._resolverSubject.asObservable();
        })
      );
    }

    return this._resolverSubject.asObservable();
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabPublishedResolver extends PostIndexTabDraftResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = (page, number) =>
      this._postService.getPublished(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabPublishedStatsResolver extends PostIndexTabDraftStatsResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = (page, number) =>
      this._postService.getPublishedStats(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabTrashResolver extends PostIndexTabDraftResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = (page, number) =>
      this._postService.getTrashed(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostIndexTabTrashStatsResolver extends PostIndexTabDraftStatsResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = (page, number) =>
      this._postService.getTrashedStats(page, number);
  }
}
