import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';

import { AuthService, TokenCheckStatus } from '../auth.service';

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
    return this._authService.getTokenCheckStatus().pipe(
      filter((result) => result.status !== TokenCheckStatus.CHECKING),
      mergeMap((result) => {
        if (result.status === TokenCheckStatus.NO_TOKEN)
          return this._noTokenReturns;
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
