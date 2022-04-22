import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { AuthService } from 'src/app/services/auth.service';
import { MeService } from 'src/app/services/me.service';
import { LoginFormData } from 'src/app/types/user.type';

@Component({
  selector: 'app-page-login-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _authService: AuthService;
  private _meService: MeService;

  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    authService: AuthService,
    meService: MeService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._authService = authService;
    this._meService = meService;

    this._submitting = false;
  }

  public login(data: LoginFormData | undefined) {
    if (!this._submitting && data && data.username && data.password) {
      this._submitting = true;
      const authSubscriber = this._authService
        .authenticate(data.username, data.password)
        .pipe(
          take(1),
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              this._snackBarService.open(
                error.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBarService.open('Unknown error.', undefined, {
                duration: SnackBarConfig.ERROR_DURATIONS,
              });
            }
            return of(null);
          }),
          tap(() => {
            this._meService.fetchMe();
            this._snackBarService.open('Logged in.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
          })
        )
        .subscribe({
          complete: () => {
            this._submitting = false;
            this._routerService.navigateByUrl('/');
            authSubscriber.unsubscribe();
          },
        });
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
