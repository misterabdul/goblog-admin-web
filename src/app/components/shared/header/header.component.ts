import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { AuthService } from 'src/app/services/auth.service';
import { DarkModeService } from 'src/app/services/darkmode.service';
import { MeService } from 'src/app/services/me.service';

import { SharedHeaderLoginComponent } from '../header-login/header-login.component';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent extends SharedHeaderLoginComponent {
  private _logoutDialog: MatDialog;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    darkModeService: DarkModeService,
    matDialog: MatDialog
  ) {
    super(routerService, snackBarService, darkModeService);
    this._logoutDialog = matDialog;

    this._navItems = [new Menu('posts', '/post')];
  }

  public logout(): void {
    const logoutDialogSubscriber = this._logoutDialog
      .open(InnerLogoutDialogComponent)
      .afterClosed()
      .subscribe({
        next: (dialogResult) => {
          if (dialogResult === InnerLogoutDialogComponent.RESULT_YES) {
            this._routerService.navigateByUrl('/login');
          }
        },
        complete: () => {
          logoutDialogSubscriber.unsubscribe();
        },
      });
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
  private _snackBar: MatSnackBar;
  private _dialogRef: MatDialogRef<InnerLogoutDialogComponent>;
  private _authService: AuthService;
  private _meService: MeService;
  private _isLoggingOut: boolean;

  public static RESULT_YES = 1;
  public static RESULT_ERROR = -1;

  constructor(
    snackBar: MatSnackBar,
    matDialogRef: MatDialogRef<InnerLogoutDialogComponent>,
    authService: AuthService,
    meService: MeService
  ) {
    this._snackBar = snackBar;
    this._dialogRef = matDialogRef;
    this._authService = authService;
    this._meService = meService;
    this._isLoggingOut = false;
  }

  public sureLogout(): void {
    if (!this._isLoggingOut) {
      this._isLoggingOut = true;

      const deauthSubsriber = this._authService
        .deauthenticate()
        .pipe(
          take(1),
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              this._snackBar.open(
                error.error?.message ?? 'Unknown error.',
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

            return of(null);
          }),
          tap(() => {
            this._snackBar.open('Logged out', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._dialogRef.close(InnerLogoutDialogComponent.RESULT_YES);
          })
        )
        .subscribe({
          complete: () => {
            this._meService.clearMe();
            this._isLoggingOut = false;
            deauthSubsriber.unsubscribe();
          },
        });
    }
  }

  get isLoggingOut(): boolean {
    return this._isLoggingOut;
  }
}
