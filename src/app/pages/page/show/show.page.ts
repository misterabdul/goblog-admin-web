import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from 'src/app/services/page.service';
import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-page-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PageShowPage implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _page: PageDetailed | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._page = null;
  }

  public ngOnInit(): void {
    this._page = this._activatedRouteService.snapshot.data.page ?? null;
  }

  get page(): PageDetailed | null {
    return this._page;
  }
}

export abstract class CommonPageModifierPage extends PageShowPage {
  protected _routerService: Router;
  protected _matDialogService: MatDialog;
  protected _snackBarService: MatSnackBar;
  protected _pageService: PageService;

  protected _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    super(activatedRouteService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;
    this._snackBarService = snackBarService;
    this._pageService = pageService;

    this._submitting = false;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
