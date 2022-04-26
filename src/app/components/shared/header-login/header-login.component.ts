import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DarkModeService } from 'src/app/services/darkmode.service';
import { SharedHeaderNotFoundComponent } from '../header-notfound/header-notfound.component';

@Component({
  selector: 'app-component-shared-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class SharedHeaderLoginComponent extends SharedHeaderNotFoundComponent {
  protected _navItems: Array<Menu>;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    darkModeService: DarkModeService
  ) {
    super(routerService, snackBarService, darkModeService);

    this._isDarkMode = false as boolean;
    this._isLoading = false as boolean;

    this._navItems = [
      new Menu('register', '/register'),
      new Menu('login', '/login'),
    ];
  }

  get navItems(): Array<Menu> {
    return this._navItems;
  }
}

class Menu {
  constructor(public label: string, public link: string) {}
}
