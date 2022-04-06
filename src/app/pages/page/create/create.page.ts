import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PageService } from 'src/app/services/page.service';
import { PageFormData } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-page-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class PageCreatePage {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _pageService: PageService;

  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._pageService = pageService;

    this._submitting = false;
  }

  public create(page: PageFormData | undefined) {
    if (!this._submitting && page) {
      this._submitting = true;
      this._pageService
        .submitNewPage(page)
        .pipe(finalize(() => (this._submitting = false)))
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Draft saved.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            this._routerService.navigate(['/page']);
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
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
