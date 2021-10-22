import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-layout-login',
  templateUrl: './login.layout.html',
  styleUrls: ['./login.layout.scss'],
})
export class LoginLayout {
  private _isDarkMode: boolean = false;

  constructor(darkmodeService: DarkModeService) {
    this._isDarkMode = false;

    darkmodeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }
}
