import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-page-user-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class UserShowPage implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _user: UserDetailed | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._user = null;
  }

  public ngOnInit(): void {
    this._user = this._activatedRouteService.snapshot.data.user;
  }

  get user(): UserDetailed | null {
    return this._user;
  }
}

export abstract class CommonUserModifierPage extends UserShowPage {
  protected _routerService: Router;
  protected _matDialogService: MatDialog;
  protected _snackBarService: MatSnackBar;
  protected _userService: UserService;

  protected _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    super(activatedRouteService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;
    this._snackBarService = snackBarService;
    this._userService = userService;

    this._submitting = false as boolean;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
