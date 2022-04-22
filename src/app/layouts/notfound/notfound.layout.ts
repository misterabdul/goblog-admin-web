import { AfterViewInit, Component } from '@angular/core';
import { filter, map } from 'rxjs';

import { MeService } from 'src/app/services/me.service';
import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-layout-notfound',
  templateUrl: './notfound.layout.html',
  styleUrls: ['./notfound.layout.scss'],
})
export class NotFoundLayout implements AfterViewInit {
  private _meService: MeService;

  private _meData: UserDetailed | null;

  constructor(meService: MeService) {
    this._meService = meService;

    this._meData = null;
  }

  ngAfterViewInit(): void {
    this._meService
      .getMe()
      .pipe(
        filter((meData) => meData !== false),
        map((meData) => (meData === false ? null : meData))
      )
      .subscribe((meData) => {
        this._meData = meData ?? null;
      });
  }

  get meData(): UserDetailed | null {
    return this._meData;
  }

  get isLoggedIn(): boolean {
    return this._meData !== null;
  }
}
