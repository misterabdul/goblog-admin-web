import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableInput, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { Response } from 'src/app/types/response.type';
import { UserDetailed } from 'src/app/types/user.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { UserService } from 'src/app/services/user.service';
import { CommonUserModifierPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-user-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class UserDeletePage extends CommonUserModifierPage {
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

  public delete(user: UserDetailed | undefined) {
    if (!this._submitting && this._user?.uid) {
      const dialogRef = this._matDialogService.open(
        SharedBasicDialogComponent,
        {
          data: new BasicDialogData(
            'Delete User',
            'Are you sure to delete this user ?',
            'Deleting user'
          ),
        }
      );

      const dialogResultSubscriber = dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._submitting = true;
                return this._userService.submitDeleteUser(
                  this._user?.uid ?? ''
                );
              } else {
                return of(false);
              }
            }
          )
        )
        .subscribe({
          next: (result) => {
            if (result !== false) {
              this._snackBarService.open('User deleted.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/user']);
              }, 100);
            }
          },
          error: (error) => {
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

      dialogResultSubscriber.add(() => {
        this._submitting = false;
        dialogRef.close();
        dialogResultSubscriber.unsubscribe();
      });
    }
  }
}
