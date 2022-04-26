import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { PostDetailed } from 'src/app/types/post.type';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _post: PostDetailed | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._post = null;
  }

  ngOnInit(): void {
    this._post = this._activatedRouteService.snapshot.data.post ?? null;
  }

  get post(): PostDetailed | null {
    return this._post;
  }
}

export abstract class CommonPostModifierPage extends PostShowPage {
  protected _routerService: Router;
  protected _matDialogService: MatDialog;
  protected _snackBarService: MatSnackBar;
  protected _postService: PostService;

  protected _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    super(activatedRouteService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._submitting = false;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
