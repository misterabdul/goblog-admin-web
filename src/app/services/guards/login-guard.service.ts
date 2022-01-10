import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AuthService, TokenCheckStatus } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate, CanActivateChild {
  private _authService: AuthService;
  private _routerService: Router;

  constructor(authService: AuthService, routerService: Router) {
    this._authService = authService;
    this._routerService = routerService;
  }

  canActivate(): Observable<boolean> {
    return this._authService.checkForToken().pipe(
      filter((status) => status !== TokenCheckStatus.CHECKING),
      map((status) => {
        if (status === TokenCheckStatus.CHECK)
          this._routerService.navigate(['']);

        return status === TokenCheckStatus.NO_TOKEN;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
