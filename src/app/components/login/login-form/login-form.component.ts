import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-login-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginLoginFormComponent {
  private _isDarkMode: boolean;
  private _isLoading: boolean;
  private _formControl: LoginFormControl;
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _authService: AuthService;

  constructor(
    routerService: Router,
    snackbarService: MatSnackBar,
    darkModeService: DarkModeService,
    authService: AuthService
  ) {
    this._isDarkMode = false;
    this._isLoading = false;
    this._formControl = new LoginFormControl();
    this._routerService = routerService;
    this._snackBarService = snackbarService;
    this._authService = authService;

    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });
  }

  public submitLoginForm(username: string, password: string): void {
    this._isLoading = true;
    this._formControl.disableAll();
    this._authService
      .authenticate(username, password)
      .pipe(
        finalize(() => {
          this._isLoading = false;
          this._formControl.enableAll();
        })
      )
      .subscribe(
        (authResponse) => {
          this._routerService.navigate(['/']);
        },
        (errorResponse) => {
          if (errorResponse instanceof HttpErrorResponse) {
            this._snackBarService.open(
              errorResponse.error?.message ?? 'Unknown error.',
              undefined,
              {
                duration: 3000,
              }
            );
          } else {
            this._snackBarService.open('Unknown error.', undefined, {
              duration: 3000,
            });
          }
        }
      );
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get formControl(): LoginFormControl {
    return this._formControl;
  }
}

class LoginFormControl {
  private _emailInput: FormControl;
  private _passwordInput: FormControl;

  constructor() {
    this._emailInput = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this._passwordInput = new FormControl('', [Validators.required]);
  }

  public disableAll() {
    this._emailInput.disable();
    this._passwordInput.disable();
  }

  public enableAll() {
    this._emailInput.enable();
    this._passwordInput.enable();
  }

  get email(): FormControl {
    return this._emailInput;
  }

  get password(): FormControl {
    return this._passwordInput;
  }

  get emailError(): string | null {
    const input = this._emailInput;
    switch (true) {
      case input.hasError('required'):
        return 'Email required';
      case input.hasError('email'):
        return 'Email invalid';
      default:
        return null;
    }
  }

  get passwordError(): string | null {
    const input = this._passwordInput;
    switch (true) {
      case input.hasError('required'):
        return 'Password required.';
      default:
        return null;
    }
  }
}
