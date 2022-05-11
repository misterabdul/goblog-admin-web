import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryDetailed } from 'src/app/types/category.type';
import { ResourceStats } from 'src/app/types/resource-stats.type';
import { Response } from 'src/app/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryIndexTabCategoryResolver
  implements Resolve<CategoryDetailed[] | null>
{
  protected _categoryService: CategoryService;

  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<CategoryDetailed[] | null>>;

  constructor(categoryService: CategoryService) {
    this._categoryService = categoryService;

    this._tabObservable = (show, page) =>
      this._categoryService.getCategories(show, page);
  }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<CategoryDetailed[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CategoryIndexTabCategoryStatsResolver
  implements Resolve<ResourceStats | null>
{
  protected _categoryService: CategoryService;

  protected _resolvedOnce: boolean;
  protected _resolverSubject: Subject<ResourceStats | null>;
  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<ResourceStats>>;

  constructor(categoryService: CategoryService) {
    this._categoryService = categoryService;

    this._resolvedOnce = false as boolean;
    this._resolverSubject = new ReplaySubject<ResourceStats | null>(1);
    this._tabObservable = (page, number) =>
      this._categoryService.getCategoriesStats(page, number);
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
export class CategoryIndexTabTrashResolver extends CategoryIndexTabCategoryResolver {
  constructor(categoryService: CategoryService) {
    super(categoryService);

    this._tabObservable = (show, page) =>
      this._categoryService.getTrashed(show, page);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CategoryIndexTabTrashStatsResolver extends CategoryIndexTabCategoryStatsResolver {
  constructor(categoryService: CategoryService) {
    super(categoryService);

    this._tabObservable = (page, number) =>
      this._categoryService.getTrashedStats(page, number);
  }
}
