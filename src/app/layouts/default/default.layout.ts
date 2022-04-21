import { AfterViewInit, Component } from '@angular/core';

import { MeService } from 'src/app/services/me.service';
import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.scss'],
})
export class DefaultLayout implements AfterViewInit {
  private _meService: MeService;

  private _meData: UserDetailed | null;

  constructor(meService: MeService) {
    this._meService = meService;

    this._meData = null;
  }

  ngAfterViewInit(): void {
    this._meService.getMe().subscribe((meData) => {
      this._meData = meData ?? null;
    });
  }

  get meData(): UserDetailed | null {
    return this._meData;
  }
}
