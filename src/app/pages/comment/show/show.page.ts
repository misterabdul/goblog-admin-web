import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CommentDetailed } from 'src/app/types/comment.type';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-page-comment-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class CommentShowPage implements AfterViewInit {
  protected _activatedRouteService: ActivatedRoute;
  protected _snackBarService: MatSnackBar;
  protected _commentService: CommentService;
  protected _commentUid: string | null;
  protected _comment: CommentDetailed | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    commentService: CommentService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._commentService = commentService;

    this._commentUid = null;
    this._comment = null;
  }

  ngAfterViewInit(): void {
    this._activatedRouteService.params
      .pipe(
        concatMap((params) => {
          if (typeof params['uid'] === 'string')
            this._commentUid = params['uid'];
          else this._commentUid = null;

          return this._commentService.getComment(this._commentUid!);
        })
      )
      .subscribe({
        next: (response) => {
          this._comment = response.data!;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch comment.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch comment.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        },
      });
  }

  get commentUid(): string {
    return this._commentUid!;
  }

  get comment(): CommentDetailed {
    return this._comment!;
  }
}
