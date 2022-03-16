import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotFoundPage {
  private _isDarkMode: boolean;
  constructor(darkModeService: DarkModeService) {
    this._isDarkMode = false;

    darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }
}
