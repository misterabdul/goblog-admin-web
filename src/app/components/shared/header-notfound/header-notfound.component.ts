import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header-notfound',
  templateUrl: './header-notfound.component.html',
  styleUrls: ['./header-notfound.component.scss'],
})
export class SharedHeaderNotFoundComponent implements OnInit {
  protected _routerService: Router;
  protected _snackBarService: MatSnackBar;
  protected _darkModeService: DarkModeService;

  protected _isDarkMode: boolean;
  protected _isLoading: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    darkModeService: DarkModeService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._darkModeService = darkModeService;

    this._isDarkMode = false;
    this._isLoading = false;
  }

  ngOnInit(): void {
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode: boolean) => {
        this._isDarkMode = isDarkMode;
      },
    });

    this._routerService.events.subscribe({
      next: (event) => {
        switch (true) {
          case event instanceof NavigationStart:
            this._isLoading = true;
            break;
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
            this._isLoading = false;
            break;
          case event instanceof NavigationError:
            if (
              event instanceof NavigationError &&
              event.error instanceof HttpErrorResponse
            ) {
              this._snackBarService.open(
                'Failed to fetch data.\n' +
                  (event.error.error?.message ?? 'Unknown error.'),
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBarService.open(
                'Failed to fetch data.\nUnknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            }
            this._isLoading = false;
            break;
          default:
            break;
        }
      },
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  public toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}
