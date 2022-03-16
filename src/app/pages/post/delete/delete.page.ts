import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableInput, of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { Response } from 'src/app/types/response.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { PostDetailed } from 'src/app/types/post.type';
import { PostService } from 'src/app/services/post.service';
import { PostShowPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-post-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class PostDeletePage extends PostShowPage {
  private _routerService: Router;
  private _matDialogService: MatDialog;
  private _deleting: boolean;

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

    this._deleting = false;
  }

  public delete(post: PostDetailed | undefined) {
    if (!this._deleting && this._postUid) {
      const dialogRef = this._matDialogService.open(
        SharedBasicDialogComponent,
        {
          data: new BasicDialogData(
            'Delete Post',
            'Are you sure to delete this post ?',
            'Deleting post'
          ),
        }
      );

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._deleting = true;
                return this._postService.submitDeletePost(this._postUid ?? '');
              } else {
                return of(false);
              }
            }
          ),
          finalize(() => {
            this._deleting = false;
          })
        )
        .subscribe({
          next: (result) => {
            if (result !== false) {
              dialogRef.close();
              this._snackBarService.open('Post deleted.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/post']);
              }, 100);
            }
          },
          error: (error) => {
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
