import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-layout-notfound',
  templateUrl: './notfound.layout.html',
  styleUrls: ['./notfound.layout.scss'],
})
export class NotFoundLayout {
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
