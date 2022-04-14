import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import { AuthService, TokenCheckStatus } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  private _authService: AuthService;
  private _routerService: Router;

  constructor(authService: AuthService, routerService: Router) {
    this._authService = authService;
    this._routerService = routerService;
  }

  canActivate(): Observable<boolean> {
    return this._authService.getTokenCheckStatus().pipe(
      filter((status) => status !== TokenCheckStatus.CHECKING),
      map((status) => {
        if (status === TokenCheckStatus.NO_TOKEN)
          this._routerService.navigate(['login']);

        return status === TokenCheckStatus.CHECK;
      }),
      catchError(() => {
        this._routerService.navigate(['login']);
        return of(false);
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
