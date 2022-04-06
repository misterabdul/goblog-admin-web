import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PageService } from 'src/app/services/page.service';
import { PageFormData } from 'src/app/types/page.type';
import { PageShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-page-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class PageUpdatePage extends PageShowPage {
  private _routerService: Router;
  private _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    super(activatedRouteService, snackBarService, pageService);
    this._routerService = routerService;

    this._submitting = false;
  }

  public update(page: PageFormData | undefined) {
    if (!this._submitting && page && this._pageUid) {
      this._pageService
        .submitUpdatePage(this._pageUid, page)
        .pipe(finalize(() => (this._submitting = false)))
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Page updated.', undefined, {
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
