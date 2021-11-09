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

  async canActivate(): Promise<boolean> {
    if (!this._auth.isAuthenticated) await this._auth.checkForToken();
    if (!this._auth.isAuthenticated) await this._router.navigate(['login']);

    return this._auth.isAuthenticated;
  }

  async canActivateChild(): Promise<boolean> {
    return await this.canActivate();
  }
}
