import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { UserService } from 'src/app/services/user.service';
import { UserFormData } from 'src/app/types/user.type';
import { CommonUserModifierPage } from '../show/show.page';

@Component({
  selector: 'app-page-user-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UserUpdatePage extends CommonUserModifierPage {
  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    super(
      activatedRouteService,
      routerService,
      matDialogService,
      snackBarService,
      userService
    );
  }

  public update(user: UserFormData | undefined) {
    if (!this._submitting && user && this._user?.uid) {
      this._submitting = true;
      this._userService.submitUpdateUser(this._user.uid, user).subscribe({
        next: (response) => {
          this._submitting = false;
          this._snackBarService.open('User updated.', undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          setTimeout(() => {
            this._routerService.navigate(['/user']);
          }, 100);
        },
        error: (error) => {
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
        },
      });
    }
  }
}
