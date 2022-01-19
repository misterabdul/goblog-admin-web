import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { UserFormData } from 'src/app/types/user.type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-user-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class UserCreatePage {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _userService: UserService;
  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._userService = userService;

    this._submitting = false;
  }

  public create(user: UserFormData | undefined) {
    if (!this._submitting && user) {
      this._submitting = true;
      this._userService.submitCreateUser(user).subscribe(
        () => {
          this._snackBarService.open('User created.', undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          setTimeout(() => {
            this._routerService.navigate(['/user']);
          }, 100);
        },
        (error) => {
          this._submitting = false;
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
        }
      );
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
