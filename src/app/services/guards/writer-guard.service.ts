import { Injectable } from '@angular/core';

import { MeService } from '../me.service';
import { UserRoleLevel } from 'src/app/utils/user-roles.util';
import { SuperadminGuardService } from './superadmin-guard.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WriterGuardService extends SuperadminGuardService {
  constructor(routerService: Router, meService: MeService) {
    super(routerService, meService);

    this._roleLevel = UserRoleLevel.WRITER;
  }
}
