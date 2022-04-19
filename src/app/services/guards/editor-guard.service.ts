import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MeService } from '../me.service';
import { UserRoleLevel } from 'src/app/utils/user-roles.util';
import { SuperadminGuardService } from './superadmin-guard.service';

@Injectable({
  providedIn: 'root',
})
export class EditorGuardService extends SuperadminGuardService {
  constructor(routerService: Router, meService: MeService) {
    super(routerService, meService);

    this._roleLevel = UserRoleLevel.EDITOR;
  }
}
