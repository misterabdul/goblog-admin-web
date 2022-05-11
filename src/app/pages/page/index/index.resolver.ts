import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';

import { PageDetailed } from 'src/app/types/page.type';
import { ResourceStats } from 'src/app/types/resource-stats.type';
import { Response } from 'src/app/types/response.type';
import { PageService } from 'src/app/services/page.service';

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabDraftResolver
  implements Resolve<PageDetailed[] | null>
{
  protected _pageService;

  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<PageDetailed[]>>;

  constructor(pageService: PageService) {
    this._pageService = pageService;

    this._tabObservable = (page, number) =>
      this._pageService.getDrafts(page, number);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PageDetailed[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabDraftStatsResolver
  implements Resolve<ResourceStats | null>
{
  protected _pageService: PageService;

  protected _resolvedOnce: boolean;
  protected _resolverSubject: Subject<ResourceStats | null>;
  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<ResourceStats>>;

  constructor(pageService: PageService) {
    this._pageService = pageService;

    this._resolvedOnce = false as boolean;
    this._resolverSubject = new ReplaySubject<ResourceStats | null>(1);
    this._tabObservable = (page, number) =>
      this._pageService.getDraftsStats(page, number);
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
export class PageIndexTabPublishedResolver extends PageIndexTabDraftResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = (page, number) =>
      this._pageService.getPublished(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabPublishedStatsResolver extends PageIndexTabDraftStatsResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = (page, number) =>
      this._pageService.getPublishedStats(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabTrashResolver extends PageIndexTabDraftResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = (page, number) =>
      this._pageService.getTrashed(page, number);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabTrashStatsResolver extends PageIndexTabDraftStatsResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = (page, number) =>
      this._pageService.getTrashedStats(page, number);
  }
}
