import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, mergeMap, ObservableInput, of } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PageService } from 'src/app/services/page.service';
import { Response } from 'src/app/types/response.type';
import { PageDetailed } from 'src/app/types/page.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { PageShowPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-page-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class PageRestorePage extends PageShowPage {
  private _routerService: Router;
  private _matDialogService: MatDialog;
  private _restoring: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    super(activatedRouteService, snackBarService, pageService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;

    this._restoring = false;
  }

  public restore(page: PageDetailed | undefined) {
    if (!this._restoring && this._pageUid) {
      const dialogRef = this._matDialogService.open(
        SharedBasicDialogComponent,
        {
          data: new BasicDialogData(
            'Restore Page',
            'Are you sure to restore this page ?',
            'Restoring page'
          ),
        }
      );

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._restoring = true;
                return this._pageService.submitRestorePage(this._pageUid ?? '');
              } else {
                return of(false);
              }
            }
          ),
          finalize(() => {
            this._restoring = false;
          })
        )
        .subscribe({
          next: (result) => {
            if (result !== false) {
              dialogRef.close();
              this._snackBarService.open('Page restored.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/page'], {
                  queryParams: {
                    tab: 'trash',
                  },
                });
              }, 100);
            }
          },
          error: (error) => {
            dialogRef.close();
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

  get restoring(): boolean {
    return this._restoring;
  }
}
