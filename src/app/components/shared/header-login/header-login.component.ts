import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class SharedHeaderLoginComponent {
  private _darkModeService: DarkModeService;
  private _isDarkMode: boolean = false;
  private _navItems: Array<Menu>;
  public searchQuery: string | undefined;

  constructor(darkModeService: DarkModeService) {
    this._navItems = [new Menu('register', '/register')];
    this._navItems = [new Menu('login', '/login')];
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
