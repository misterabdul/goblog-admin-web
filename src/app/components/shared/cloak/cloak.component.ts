import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-cloak',
  templateUrl: './cloak.component.html',
  styleUrls: ['./cloak.component.scss'],
})
export class SharedCloakComponent {
  private _isDarkMode: boolean;

  constructor(darkModeService: DarkModeService) {
    this._isDarkMode = false;

    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }
}
