import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PageService } from 'src/app/services/page.service';
import { PageFormData } from 'src/app/types/page.type';
import { CommonPageModifierPage } from '../show/show.page';

@Component({
  selector: 'app-page-page-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class PageUpdatePage extends CommonPageModifierPage {
  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    super(
      activatedRouteService,
      routerService,
      matDialogService,
      snackBarService,
      pageService
    );
  }

  public update(page: PageFormData | undefined) {
    if (!this._submitting && page && this._page?.uid) {
      this._submitting = true;
      this._pageService.submitUpdatePage(this._page.uid, page).subscribe({
        next: (response) => {
          this._submitting = false;
          this._snackBarService.open('Page updated.', undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          this._routerService.navigate(['/page']);
        },
        error: (error) => {
          this._submitting = false;
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
}
