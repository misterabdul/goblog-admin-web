import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { UserService } from 'src/app/services/user.service';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { UserDetailed } from 'src/app/types/user.type';
import { SharedBasicDialogComponent } from '../../shared/basic-dialog/basic-dialog.component';
import { UserViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-user-viewer-trash',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class UserViewerTrashComponent
  extends UserViewerComponent
  implements OnDestroy
{
  protected _matDialogService: MatDialog;

  private _mode: 'delete' | 'restore';

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    matDialogService: MatDialog,
    userService: UserService
  ) {
    super(routerService, snackBarService, userService);
    this._matDialogService = matDialogService;

    this._user = null;
    this._mode = 'delete';
  }

  ngOnDestroy(): void {}

  public deleteUser(): void {
    const dialogRef = this._matDialogService.open(SharedBasicDialogComponent, {
      data: new BasicDialogData(
        'Delete User',
        'Are you sure to delete this user ?',
        'Deleting User'
      ),
    });

    dialogRef.componentInstance.dialogResult.subscribe((result) => {
      if (result === SharedBasicDialogComponent.RESULT_APPROVED) {
        dialogRef.componentInstance.isProcessing = true;
        this._userService
          .submitDeleteUser(this._user?.uid!)
          .pipe(
            finalize(() => {
              dialogRef.close();
            })
          )
          .subscribe(() => {
            this._snackBarService.open('Post deleted.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._routerService.navigate(['/user']);
          }, this._commonHttpErrorHandler);
      }
    });
  }

  public restoreUser(): void {
    const dialogRef = this._matDialogService.open(SharedBasicDialogComponent, {
      data: new BasicDialogData(
        'Restore User',
        'Are you sure to restore this user ?',
        'Restoring User'
      ),
    });

    dialogRef.componentInstance.dialogResult.subscribe((result) => {
      if (result === SharedBasicDialogComponent.RESULT_APPROVED) {
        dialogRef.componentInstance.isProcessing = true;
        this._userService
          .submitRestoreUser(this._user?.uid!)
          .pipe(
            finalize(() => {
              dialogRef.close();
            })
          )
          .subscribe(() => {
            this._snackBarService.open('User restored.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._routerService.navigate(['/user'], {
              queryParams: {
                tab: 'trash',
              },
            });
          }, this._commonHttpErrorHandler);
      }
    });
  }

  @Input()
  set mode(mode: 'delete' | 'restore') {
    this._mode = mode;
  }

  get mode(): 'delete' | 'restore' {
    return this._mode;
  }
}
