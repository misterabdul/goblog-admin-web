import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableInput, of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PostService } from 'src/app/services/post.service';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { PostDetailed } from 'src/app/types/post.type';
import { PostShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-post-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class PostRestorePage extends PostShowPage {
  private _routerService: Router;
  private _matDialogService: MatDialog;
  private _restoring: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    super(activatedRouteService, snackBarService, postService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;

    this._restoring = false;
  }

  public restore(post: PostDetailed | undefined) {
    if (!this._restoring && this._postId) {
      const dialogRef = this._matDialogService.open(
        SharedBasicDialogComponent,
        {
          data: new BasicDialogData(
            'Restore Post',
            'Are you sure to restore this post ?',
            'Restoring post'
          ),
        }
      );

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | void>>((dialogResult) => {
            if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
              dialogRef.componentInstance.isProcessing = true;
              this._restoring = true;
              return this._postService.submitRestorePost(this._postId ?? '');
            } else {
              return of(false);
            }
          }),
          finalize(() => {
            this._restoring = false;
          })
        )
        .subscribe(
          (result) => {
            if (result !== false) {
              dialogRef.close();
              this._snackBarService.open('Post restored.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/post'], {
                  queryParams: {
                    tab: 'trash',
                  },
                });
              }, 100);
            }
          },
          (error) => {
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
          }
        );
    }
  }

  get restoring(): boolean {
    return this._restoring;
  }
}
