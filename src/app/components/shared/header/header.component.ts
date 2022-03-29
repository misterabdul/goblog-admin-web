import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { AuthService } from 'src/app/services/auth.service';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent implements AfterViewInit {
  private _routerService: Router;
  private _darkModeService: DarkModeService;
  private _logoutDialog: MatDialog;

  private _isDarkMode: boolean;
  private _navItems: Array<Menu>;

  constructor(
    routerService: Router,
    darkModeService: DarkModeService,
    matDialog: MatDialog
  ) {
    this._routerService = routerService;
    this._darkModeService = darkModeService;
    this._logoutDialog = matDialog;

    this._isDarkMode = false;
    this._navItems = [new Menu('posts', '/post')];
  }

  ngAfterViewInit() {
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode: boolean) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  public toggleDarkMode(): void {
    this._darkModeService.toggleDarkMode();
  }

  public logout(): void {
    this._logoutDialog
      .open(InnerLogoutDialogComponent)
      .afterClosed()
      .subscribe({
        next: (dialogResult) => {
          if (dialogResult === InnerLogoutDialogComponent.RESULT_YES) {
            this._routerService.navigate(['/login']);
          }
        },
      });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get navItems(): Array<Menu> {
    return this._navItems;
  }
}

class Menu {
  constructor(public label: string, public link: string) {}
}

@Component({
  selector: 'app-component-shared-header-inner-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
})
export class InnerLogoutDialogComponent {
  private _authService: AuthService;
  private _snackBar: MatSnackBar;
  private _dialogRef: MatDialogRef<InnerLogoutDialogComponent>;
  private _isLoggingOut: boolean;

  public static RESULT_YES = 1;
  public static RESULT_ERROR = -1;

  constructor(
    authService: AuthService,
    snackBar: MatSnackBar,
    matDialogRef: MatDialogRef<InnerLogoutDialogComponent>
  ) {
    this._authService = authService;
    this._snackBar = snackBar;
    this._dialogRef = matDialogRef;
    this._isLoggingOut = false;
  }

  public sureLogout(): void {
    if (!this._isLoggingOut) {
      this._isLoggingOut = true;

      this._authService
        .deauthenticate()
        .pipe(
          finalize(() => {
            this._isLoggingOut = false;
          })
        )
        .subscribe({
          next: (logoutResponse) => {
            this._snackBar.open('Logged out', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._dialogRef.close(InnerLogoutDialogComponent.RESULT_YES);
          },
          error: (errorResponse) => {
            if (errorResponse instanceof HttpErrorResponse) {
              this._snackBar.open(
                errorResponse.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBar.open('Unknown error.', undefined, {
                duration: SnackBarConfig.ERROR_DURATIONS,
              });
            }
            this._dialogRef.close(InnerLogoutDialogComponent.RESULT_ERROR);
          },
        });
    }
  }

  get isLoggingOut(): boolean {
    return this._isLoggingOut;
  }
}
