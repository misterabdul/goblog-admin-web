import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { AuthService } from 'src/app/services/auth.service';
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
  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    authService: AuthService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._authService = authService;

    this._submitting = false;
  }

  public login(data: LoginFormData | undefined) {
    if (!this._submitting && data && data.username && data.password) {
      this._submitting = true;
      this._authService
        .authenticate(data.username, data.password)
        .pipe(
          finalize(() => {
            this._submitting = false;
          })
        )
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Logged in.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            setTimeout(() => {
              this._routerService.navigate(['/']);
            }, 100);
          },
          error: (errorResponse) => {
            if (errorResponse instanceof HttpErrorResponse) {
              this._snackBarService.open(
                errorResponse.error?.message ?? 'Unknown error.',
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
          },
        });
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
