import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableInput, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { Response } from 'src/app/types/response.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { UserDetailed } from 'src/app/types/user.type';
import { UserService } from 'src/app/services/user.service';
import { UserShowPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-user-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class UserDeletePage extends UserShowPage {
  private _routerService: Router;
  private _dialogService: MatDialog;
  private _deleting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    dialogService: MatDialog,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    super(activatedRouteService, snackBarService, userService);
    this._routerService = routerService;
    this._dialogService = dialogService;

    this._deleting = false;
  }

  public delete(user: UserDetailed | undefined) {
    if (!this._deleting && this._userId) {
      const dialogRef = this._dialogService.open(SharedBasicDialogComponent, {
        data: new BasicDialogData(
          'Delete User',
          'Are you sure to delete this user ?',
          'Deleting user'
        ),
      });

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._deleting = true;
                return this._userService.submitDeleteUser(this._userId ?? '');
              } else {
                return of(false);
              }
            }
          )
        )
        .subscribe({
          next: (result) => {
            if (result !== false) {
              dialogRef.close();
              this._snackBarService.open('User deleted.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/user']);
              }, 100);
            }
          },
          error: (error) => {
            this._deleting = false;
            dialogRef.close();
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

  get deleting(): boolean {
    return this._deleting;
  }
}
