import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent {
  private _darkModeService: DarkModeService;
  private _isDarkMode: boolean = false;
  private _navItems: Array<Menu>;
  public searchQuery: string | undefined;

  constructor(darkModeService: DarkModeService) {
    this._navItems = [new Menu('posts', '/post')];
    this._darkModeService = darkModeService;
    this._darkModeService.darkModeSubject.subscribe((isDarkMode: boolean) => {
      this._isDarkMode = isDarkMode;
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get navItems(): Array<Menu> {
    return this._navItems;
  }

  public toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}

class Menu {
  constructor(public label: string, public link: string) {}
}
