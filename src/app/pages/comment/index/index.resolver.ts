import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';

import { CommentService } from 'src/app/services/comment.service';
import { CommentDetailed } from 'src/app/types/comment.type';
import { ResourceStats } from 'src/app/types/resource-stats.type';
import { Response } from 'src/app/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CommentIndexTabCommentResolver
  implements Resolve<CommentDetailed[] | null>
{
  protected _commentService: CommentService;

  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<CommentDetailed[] | null>>;

  constructor(commentService: CommentService) {
    this._commentService = commentService;

    this._tabObservable = (show, page) =>
      this._commentService.getComments(show, page);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CommentDetailed[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommentIndexTabCommentStatsResolver
  implements Resolve<ResourceStats | null>
{
  protected _commentService: CommentService;

  protected _resolvedOnce: boolean;
  protected _resolverSubject: Subject<ResourceStats | null>;
  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<ResourceStats>>;

  constructor(commentService: CommentService) {
    this._commentService = commentService;

    this._resolvedOnce = false as boolean;
    this._resolverSubject = new ReplaySubject<ResourceStats | null>(1);
    this._tabObservable = (page, number) =>
      this._commentService.getCommentsStats(page, number);
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
export class CommentIndexTabTrashResolver extends CommentIndexTabCommentResolver {
  constructor(commentService: CommentService) {
    super(commentService);

    this._tabObservable = (show, page) =>
      this._commentService.getTrashed(show, page);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommentIndexTabTrashStatsResolver extends CommentIndexTabCommentStatsResolver {
  constructor(commentService: CommentService) {
    super(commentService);

    this._tabObservable = (page, number) =>
      this._commentService.getTrashedStats(page, number);
  }
}
