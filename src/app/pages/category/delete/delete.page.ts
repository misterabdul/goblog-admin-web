import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, ObservableInput, of } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CategoryService } from 'src/app/services/category.service';
import { Response } from 'src/app/types/response.type';
import { CategoryDetailed } from 'src/app/types/category.type';
import { BasicDialogData } from 'src/app/types/dialog-data.type';
import { CategoryShowPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-category-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class CategoryDeletePage extends CategoryShowPage {
  private _routerService: Router;
  private _dialogService: MatDialog;
  private _deleting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    dialogService: MatDialog,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    super(activatedRouteService, snackBarService, categoryService);
    this._routerService = routerService;
    this._dialogService = dialogService;

    this._deleting = false;
  }

  public delete(category: CategoryDetailed | undefined) {
    if (!this._deleting && this._categoryId) {
      const dialogRef = this._dialogService.open(SharedBasicDialogComponent, {
        data: new BasicDialogData(
          'Delete Category',
          'Are you sure to delete this category ?',
          'Deleting category'
        ),
      });

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._deleting = true;
                return this._categoryService.submitDeleteCategory(
                  this._categoryId ?? ''
                );
              } else {
                return of(false);
              }
            }
          )
        )
        .subscribe(
          (result) => {
            if (result !== false) {
              dialogRef.close();
              this._snackBarService.open('Category deleted.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/category']);
              }, 100);
            }
          },
          (error) => {
            this._deleting = false;
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
          }
        );
    }
  }

  get deleting(): boolean {
    return this._deleting;
  }
}
