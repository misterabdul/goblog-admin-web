import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CommentDetailed } from 'src/app/types/comment.type';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-comment-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class CommentShowPage implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _comment: CommentDetailed | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._comment = null;
  }

  ngOnInit(): void {
    this._comment = this._activatedRouteService.snapshot.data.comment;
  }

  get comment(): CommentDetailed | null {
    return this._comment;
  }
}

export abstract class CommonCommentModifierPage extends CommentShowPage {
  protected _routerService: Router;
  protected _matDialogService: MatDialog;
  protected _snackBarService: MatSnackBar;
  protected _commentService: CommentService;

  protected _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    commentService: CommentService
  ) {
    super(activatedRouteService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;
    this._snackBarService = snackBarService;
    this._commentService = commentService;

    this._submitting = false as boolean;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
