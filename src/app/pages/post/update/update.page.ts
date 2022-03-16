import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import { PostFormData } from 'src/app/types/post.type';
import { PostShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-post-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class PostUpdatePage extends PostShowPage {
  private _routerService: Router;
  private _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    super(activatedRouteService, snackBarService, postService);
    this._routerService = routerService;

    this._submitting = false;
  }

  public update(post: PostFormData | undefined) {
    if (!this._submitting && post && this._postUid) {
      this._postService
        .submitUpdatePost(this._postUid, post)
        .pipe(finalize(() => (this._submitting = false)))
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Draft saved.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._routerService.navigate(['/post']);
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
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
