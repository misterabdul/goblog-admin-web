import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  protected _authService: AuthService;
  protected _routerService: Router;

  protected _tokenExistReturns: Observable<boolean | UrlTree>;
  protected _noTokenReturns: Observable<boolean | UrlTree>;
  protected _errorReturns: Observable<boolean | UrlTree>;

  constructor(authService: AuthService, routerService: Router) {
    this._authService = authService;
    this._routerService = routerService;

    this._tokenExistReturns = of(true);
    this._noTokenReturns = of(this._routerService.parseUrl('/login'));
    this._errorReturns = of(this._routerService.parseUrl('/login'));
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this._authService.getAuthToken().pipe(
      filter((authToken) => authToken !== false),
      map((authToken) => (authToken === false ? null : authToken)),
      mergeMap((authToken) => {
        if (authToken === null) return this._noTokenReturns;
        return this._tokenExistReturns;
      }),
      catchError(() => {
        return this._errorReturns;
      })
    );
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.canActivate();
  }
}
