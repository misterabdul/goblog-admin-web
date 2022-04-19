import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MeService } from '../me.service';
import { SuperadminGuardService } from './superadmin-guard.service';
import { UserRoleLevel } from 'src/app/utils/user-roles.util';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService extends SuperadminGuardService {
  constructor(routerService: Router, meService: MeService) {
    super(routerService, meService);

    this._roleLevel = UserRoleLevel.ADMIN;
  }
}
