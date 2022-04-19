import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService extends AuthGuardService {
  constructor(authService: AuthService, routerService: Router) {
    super(authService, routerService);

    this._tokenExistReturns = of(this._routerService.parseUrl('/'));
    this._noTokenReturns = of(true);
    this._errorReturns = of(true);
  }
}
