import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { UserService } from 'src/app/services/user.service';
import { UserFormData } from 'src/app/types/user.type';

import { UserShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-user-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UserUpdatePage extends UserShowPage {
  private _routerService: Router;
  private _updating: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    super(activatedRouteService, snackBarService, userService);
    this._routerService = routerService;

    this._updating = false;
  }

  public update(user: UserFormData | undefined) {
    if (!this._updating && user && this._userUid) {
      this._updating = true;
      this._userService.submitUpdateUser(this._userUid, user).subscribe({
        next: (response) => {
          this._snackBarService.open('User updated.', undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          setTimeout(() => {
            this._routerService.navigate(['/user']);
          }, 100);
        },
        error: (error) => {
          this._updating = false;
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
        },
      });
    }
  }

  get updating(): boolean {
    return this._updating;
  }
}
