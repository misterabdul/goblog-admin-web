import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableInput, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { Response } from 'src/app/types/response.type';
import { CommentDetailed } from 'src/app/types/comment.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { CommentService } from 'src/app/services/comment.service';
import { CommentShowPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-comment-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class CommentRestorePage extends CommentShowPage {
  private _routerService: Router;
  private _dialogService: MatDialog;
  private _restoring: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    dialogService: MatDialog,
    snackBarService: MatSnackBar,
    commentService: CommentService
  ) {
    super(activatedRouteService, snackBarService, commentService);
    this._routerService = routerService;
    this._dialogService = dialogService;

    this._restoring = false;
  }

  public restore(comment: CommentDetailed | undefined) {
    if (!this._restoring && this._commentUid) {
      const dialogRef = this._dialogService.open(SharedBasicDialogComponent, {
        data: new BasicDialogData(
          'Restore Comment',
          'Are you sure to restore this comment ?',
          'Restoring comment'
        ),
      });

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._restoring = true;
                return this._commentService.submitRestoreComment(
                  this._commentUid ?? ''
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
              dialogRef.close();
              this._snackBarService.open('Comment restored.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/comment'], {
                  queryParams: {
                    tab: 'trash',
                  },
                });
              }, 100);
            }
          },
          error: (error) => {
            this._restoring = false;
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

  get restoring(): boolean {
    return this._restoring;
  }
}
