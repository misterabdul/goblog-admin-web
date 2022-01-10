import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DarkModeConfig } from '../configs/darkmode.config';

import { CookieHelpers } from '../utils/cookie.util';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    this._darkModeSubject = new BehaviorSubject<boolean>(false);

    if (
      (CookieHelpers.readCookie(DarkModeConfig.Cookie.NAME)?.indexOf(
        DarkModeConfig.Cookie.SET
      ) ?? -1) == 0
    ) {
      this._darkModeSubject.next(true);
    }
  }

  get darkModeSubject(): Observable<boolean> {
    return this._darkModeSubject;
  }

  public toggleDarkMode(): void {
    if (this._darkModeSubject.value) {
      CookieHelpers.createCookie(
        DarkModeConfig.Cookie.NAME,
        DarkModeConfig.Cookie.UNSET,
        DarkModeConfig.Cookie.EXPIRES
      );
      this._darkModeSubject.next(false);
    } else {
      CookieHelpers.createCookie(
        DarkModeConfig.Cookie.NAME,
        DarkModeConfig.Cookie.SET,
        DarkModeConfig.Cookie.EXPIRES
      );
      this._darkModeSubject.next(true);
    }
  }
}
