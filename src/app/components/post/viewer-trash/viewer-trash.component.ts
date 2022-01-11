import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PostService } from 'src/app/services/post.service';
import { PostDetailed } from 'src/app/types/post.type';
import { PostViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-post-trash-viewer',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class PostTrashViewerComponent extends PostViewerComponent {
  protected _matDialogService: MatDialog;

  protected _post: PostDetailed | null;
  protected _mode: 'delete' | 'restore';

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    matDialogService: MatDialog,
    postService: PostService
  ) {
    super(routerService, snackBarService, postService);
    this._matDialogService = matDialogService;

    this._post = null;
    this._mode = 'delete';
  }

  public deletePost(): void {
    this._matDialogService
      .open(PostTrashViewerInnerDeleteDialogComponent, {
        data: {
          postId: this._post?.uid,
        },
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (
          dialogResult ===
          PostTrashViewerInnerDeleteDialogComponent.RESULT_SUCCESS
        )
          this._routerService.navigate(['/post']);
      });
  }

  public restorePost(): void {
    this._matDialogService
      .open(PostTrashViewerInnerRestoreDialogComponent, {
        data: {
          postId: this._post?.uid,
        },
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (
          dialogResult ===
          PostTrashViewerInnerRestoreDialogComponent.RESULT_SUCCESS
        )
          this._routerService.navigate(['/post'], {
            queryParams: {
              tab: 'trash',
            },
          });
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

@Component({
  selector: 'app-component-post-viewer-inner-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class PostTrashViewerInnerDeleteDialogComponent {
  private _postService: PostService;
  private _snackBar: MatSnackBar;
  private _dialogRef: MatDialogRef<PostTrashViewerInnerDeleteDialogComponent>;
  private _dialogData: any;

  private _isDeleting: boolean;

  public static RESULT_SUCCESS = 1;
  public static RESULT_ERROR = -1;

  constructor(
    postService: PostService,
    snackBar: MatSnackBar,
    matDialogRef: MatDialogRef<PostTrashViewerInnerDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this._postService = postService;
    this._snackBar = snackBar;
    this._dialogRef = matDialogRef;
    this._dialogData = dialogData;
    this._isDeleting = false;
  }

  public sureDelete(): void {
    if (!this._isDeleting) {
      this._isDeleting = true;

      this._postService
        .submitDeletePost(this._dialogData?.postId ?? null)
        .pipe(
          finalize(() => {
            this._isDeleting = false;
          })
        )
        .subscribe(
          () => {
            this._snackBar.open('Post deleted.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._dialogRef.close(
              PostTrashViewerInnerDeleteDialogComponent.RESULT_SUCCESS
            );
          },
          (errorResponse) => {
            if (errorResponse instanceof HttpErrorResponse) {
              this._snackBar.open(
                errorResponse.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBar.open('Unknown error.', undefined, {
                duration: SnackBarConfig.ERROR_DURATIONS,
              });
            }
            this._dialogRef.close(
              PostTrashViewerInnerDeleteDialogComponent.RESULT_ERROR
            );
          }
        );
    }
  }

  get isDeleting(): boolean {
    return this._isDeleting;
  }
}

@Component({
  selector: 'app-component-post-viewer-inner-restore-dialog',
  templateUrl: './restore-dialog.component.html',
  styleUrls: ['./restore-dialog.component.scss'],
})
export class PostTrashViewerInnerRestoreDialogComponent {
  private _postService: PostService;
  private _snackBar: MatSnackBar;
  private _dialogRef: MatDialogRef<PostTrashViewerInnerDeleteDialogComponent>;
  private _dialogData: any;

  private _isRestoring: boolean;

  public static RESULT_SUCCESS = 1;
  public static RESULT_ERROR = -1;

  constructor(
    postService: PostService,
    snackBar: MatSnackBar,
    matDialogRef: MatDialogRef<PostTrashViewerInnerDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this._postService = postService;
    this._snackBar = snackBar;
    this._dialogRef = matDialogRef;
    this._dialogData = dialogData;
    this._isRestoring = false;
  }

  public sureRestore(): void {
    if (!this._isRestoring) {
      this._isRestoring = true;

      this._postService
        .submitRestorePost(this._dialogData?.postId ?? null)
        .pipe(
          finalize(() => {
            this._isRestoring = false;
          })
        )
        .subscribe(
          () => {
            this._snackBar.open('Post restored.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._dialogRef.close(
              PostTrashViewerInnerDeleteDialogComponent.RESULT_SUCCESS
            );
          },
          (errorResponse) => {
            if (errorResponse instanceof HttpErrorResponse) {
              this._snackBar.open(
                errorResponse.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBar.open('Unknown error.', undefined, {
                duration: SnackBarConfig.ERROR_DURATIONS,
              });
            }
            this._dialogRef.close(
              PostTrashViewerInnerDeleteDialogComponent.RESULT_ERROR
            );
          }
        );
    }
  }

  get isRestoring(): boolean {
    return this._isRestoring;
  }
}
