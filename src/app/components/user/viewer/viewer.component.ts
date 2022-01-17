import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { UserService } from 'src/app/services/user.service';
import { UserDetailed, UserRole } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-user-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class UserViewerComponent {
  protected _routerService: Router;
  protected _snackBarService: MatSnackBar;
  protected _userService: UserService;

  private _roles: Array<FormUserRole>;
  protected _user: UserDetailed | null;
  protected _commonHttpErrorHandler: (error: any) => void;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._userService = userService;

    this._roles = [
      new FormUserRole('Editor', 2),
      new FormUserRole('Writer', 3),
    ];
    this._user = null;
    this._commonHttpErrorHandler = (error: any): void => {
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
    };
  }

  public getRoleValues(
    roles?: Array<UserRole> | null | undefined
  ): Array<number> {
    if (roles) return roles.map<number>((role) => role.level!);
    return [];
  }

  @Input()
  set user(user: UserDetailed | null) {
    this._user = user;
  }

  get user(): UserDetailed | null {
    return this._user!;
  }

  get roles(): Array<FormUserRole> {
    return this._roles;
  }
}

class FormUserRole {
  public name: string;
  public level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
