import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.scss'],
})
export class DefaultLayout {
  public isDarkMode: boolean = false;

  constructor(darkmodeService: DarkModeService) {
    this.isDarkMode = false;

    darkmodeService.darkModeSubject.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}
