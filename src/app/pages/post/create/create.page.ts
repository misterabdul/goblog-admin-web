import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import { PostFormData } from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class PostCreatePage {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _postService: PostService;
  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._submitting = false;
  }

  public create(post: PostFormData | undefined) {
    if (!this._submitting && post) {
      this._submitting = true;
      this._postService
        .submitNewPost(post)
        .pipe(finalize(() => (this._submitting = false)))
        .subscribe(
          () => {
            this._snackBarService.open('Draft saved.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._routerService.navigate(['/post']);
          },
          (error) => {
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
