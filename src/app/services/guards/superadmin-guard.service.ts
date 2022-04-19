import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, mergeMap, of } from 'rxjs';

import { MeService } from '../me.service';
import { UserRoleLevel } from 'src/app/utils/user-roles.util';

@Injectable({
  providedIn: 'root',
})
export class SuperadminGuardService implements CanActivate, CanActivateChild {
  private _routerService: Router;
  private _meService: MeService;

  protected _roleLevel: number;

  constructor(routerService: Router, meService: MeService) {
    this._routerService = routerService;
    this._meService = meService;

    this._roleLevel = UserRoleLevel.SUPERADMIN;
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this._meService.getMe().pipe(
      mergeMap((meData) => {
        let isSuperAdmin = false as boolean;
        if (meData?.roles !== undefined)
          meData.roles.forEach((role) => {
            if (!isSuperAdmin && role.level! <= this._roleLevel)
              isSuperAdmin = true;
          });

        if (!isSuperAdmin) return of(this._routerService.parseUrl('/404'));
        return of(isSuperAdmin);
      })
    );
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.canActivate();
  }
}
