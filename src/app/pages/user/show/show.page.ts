import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { UserService } from 'src/app/services/user.service';
import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-page-user-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class UserShowPage implements AfterViewInit {
  protected _activatedRouteService: ActivatedRoute;
  protected _snackBarService: MatSnackBar;
  protected _userService: UserService;
  protected _userId: string | null;
  protected _user: UserDetailed | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._userService = userService;

    this._userId = null;
    this._user = null;
  }

  public ngAfterViewInit(): void {
    this._activatedRouteService.params
      .pipe(
        mergeMap((params) => {
          if (typeof params['id'] === 'string') {
            this._userId = params['id'];
            return this._userService.getUser(this._userId);
          }
          return throwError(new Error("couldn't find id route parameter"));
        })
      )
      .subscribe(
        (response) => {
          this._user = response.data!;
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch user.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch user.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        }
      );
  }

  get userId(): string {
    return this._userId!;
  }

  get user(): UserDetailed {
    return this._user!;
  }
}
