import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';

import { ResourceStats } from 'src/app/types/resource-stats.type';
import { Response } from 'src/app/types/response.type';
import { UserDetailed } from 'src/app/types/user.type';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserIndexTabActiveResolver
  implements Resolve<UserDetailed[] | null>
{
  protected _userService: UserService;

  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<UserDetailed[] | null>>;

  constructor(userService: UserService) {
    this._userService = userService;

    this._tabObservable = (show, page) =>
      this._userService.getUsers(show, page);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserDetailed[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserIndexTabActiveStatsResolver
  implements Resolve<ResourceStats | null>
{
  protected _userService: UserService;

  protected _resolvedOnce: boolean;
  protected _resolverSubject: Subject<ResourceStats | null>;
  protected _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<ResourceStats>>;

  constructor(userService: UserService) {
    this._userService = userService;

    this._resolvedOnce = false as boolean;
    this._resolverSubject = new ReplaySubject<ResourceStats | null>(1);
    this._tabObservable = (page, number) =>
      this._userService.getUsersStats(page, number);
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
export class UserIndexTabTrashResolver extends UserIndexTabActiveResolver {
  constructor(userService: UserService) {
    super(userService);

    this._tabObservable = (show, page) =>
      this._userService.getTrashed(show, page);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserIndexTabTrashStatsResolver extends UserIndexTabActiveStatsResolver {
  constructor(userService: UserService) {
    super(userService);

    this._tabObservable = (page, number) =>
      this._userService.getTrashedStats(page, number);
  }
}
