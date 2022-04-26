import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PostService } from 'src/app/services/post.service';
import { PostFormData } from 'src/app/types/post.type';
import { CommonPostModifierPage } from '../show/show.page';

@Component({
  selector: 'app-page-post-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class PostUpdatePage extends CommonPostModifierPage {
  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    super(
      activatedRouteService,
      routerService,
      matDialogService,
      snackBarService,
      postService
    );
  }

  public update(post: PostFormData | undefined) {
    if (!this._submitting && post && this._post?.uid) {
      this._submitting = true;
      const submitUpdatePostSubscriber = this._postService
        .submitUpdatePost(this._post.uid, post)
        .subscribe({
          next: () => {
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

      submitUpdatePostSubscriber.add(() => {
        this._submitting = false;
        submitUpdatePostSubscriber.unsubscribe();
      });
    }
  }
}
