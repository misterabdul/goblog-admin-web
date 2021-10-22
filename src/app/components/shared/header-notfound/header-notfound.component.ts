import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header-notfound',
  templateUrl: './header-notfound.component.html',
  styleUrls: ['./header-notfound.component.scss'],
})
export class SharedHeaderNotFoundComponent {
  private _darkModeService: DarkModeService;
  private _isDarkMode: boolean = false;

  constructor(darkModeService: DarkModeService) {
    this._darkModeService = darkModeService;
    this._darkModeService.darkModeSubject.subscribe((isDarkMode: boolean) => {
      this._isDarkMode = isDarkMode;
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  public toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}
