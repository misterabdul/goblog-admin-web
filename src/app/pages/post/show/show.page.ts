import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PostService } from 'src/app/services/post.service';
import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements AfterViewInit {
  protected _activatedRouteService: ActivatedRoute;
  protected _snackBarService: MatSnackBar;
  protected _postService: PostService;
  protected _postId: string | null;
  protected _post: PostDetailed | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._postId = null;
    this._post = null;
  }

  public ngAfterViewInit(): void {
    this._activatedRouteService.params.subscribe((params) => {
      if (typeof params['id'] === 'string') {
        this._postId = params['id'];
        this._postService.getPost(this._postId).subscribe(
          (response) => {
            this._post = response;
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              this._snackBarService.open(
                'Failed to fetch post.\n' +
                  (error.error?.message ?? 'Unknown error.'),
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBarService.open(
                'Failed to fetch post.\nUnknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            }
          }
        );
      }
    });
  }

  get postId(): string | null {
    return this._postId;
  }

  get post(): PostDetailed | null {
    return this._post;
  }
}
