import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  private _auth: AuthService;
  private _router: Router;

  constructor(auth: AuthService, router: Router) {
    this._auth = auth;
    this._router = router;
  }

  canActivate(): boolean {
    if (!this._auth.isAuthenticated) {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
