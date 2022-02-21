import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CommentDetailed } from 'src/app/types/comment.type';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-page-comment-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class CommentIndexPage implements OnInit {
  private _routerService: Router;
  private _activatedRouteService: ActivatedRoute;
  private _commentService: CommentService;

  private _comments: Array<CommentDetailed> | null;
  private _isLoadingComments: boolean;
  private _trash: Array<CommentDetailed> | null;
  private _isLoadingTrash: boolean;
  private _selectedTabIndex: number;

  constructor(
    routerService: Router,
    activatedRouteService: ActivatedRoute,
    commentService: CommentService
  ) {
    this._routerService = routerService;
    this._activatedRouteService = activatedRouteService;
    this._commentService = commentService;

    this._comments = null;
    this._isLoadingComments = false;
    this._trash = null;
    this._isLoadingTrash = false;
    this._selectedTabIndex = 0;
  }

  public ngOnInit(): void {
    this._activatedRouteService.queryParams.subscribe((params) => {
      const tab = params?.tab ?? null;
      switch (true) {
        default:
          break;
        case tab === 'trash':
          this._selectedTabIndex = 1;
          break;
      }
    });
  }

  private async changeRouteQuery(tabQuery: string): Promise<void> {
    await this._routerService.navigate([], {
      relativeTo: this._activatedRouteService,
      queryParams: {
        tab: tabQuery,
      },
      queryParamsHandling: 'merge',
    });
  }

  public loadComments(isCommentTabDisplayed: boolean) {
    this.changeRouteQuery('comment');
    if (this._comments === null && isCommentTabDisplayed) {
      this._isLoadingComments = true;
      this._commentService
        .getComments()
        .pipe(
          finalize(() => {
            this._isLoadingComments = false;
          })
        )
        .subscribe(
          (response) => {
            this._comments = response?.data ?? null;
          },
          (error) => {}
        );
    }
  }

  public loadTrash(isTrashTabDisplayed: boolean) {
    this.changeRouteQuery('trash');
    if (this._trash === null && isTrashTabDisplayed) {
      this._isLoadingTrash = true;
      this._commentService
        .getTrashed()
        .pipe(
          finalize(() => {
            this._isLoadingTrash = false;
          })
        )
        .subscribe((response) => {
          this._trash = response?.data ?? null;
        });
    }
  }

  get comments(): Array<CommentDetailed> {
    return this._comments!;
  }

  get isLoadingComments(): boolean {
    return this._isLoadingComments;
  }

  get trash(): Array<CommentDetailed> {
    return this._trash!;
  }

  get isLoadingTrash(): boolean {
    return this._isLoadingTrash;
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }
}
