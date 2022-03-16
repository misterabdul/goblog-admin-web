import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.scss'],
})
export class DefaultLayout {
  private _isDarkMode: boolean = false;

  constructor(darkmodeService: DarkModeService) {
    this._isDarkMode = false;

    darkmodeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }
}
