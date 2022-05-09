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
import { CommonCategoryModifierPage } from '../show/show.page';
import { SharedBasicDialogComponent } from 'src/app/components/shared/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-page-category-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class CategoryRestorePage extends CommonCategoryModifierPage {
  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    super(
      activatedRouteService,
      routerService,
      matDialogService,
      snackBarService,
      categoryService
    );
  }

  public restore(category: CategoryDetailed | undefined) {
    if (!this._submitting && this._category?.uid) {
      const dialogRef = this._matDialogService.open(
        SharedBasicDialogComponent,
        {
          data: new BasicDialogData(
            'Restore Category',
            'Are you sure to restore this category ?',
            'Restoring category'
          ),
        }
      );

      dialogRef.componentInstance.dialogResult
        .pipe(
          mergeMap<number, ObservableInput<false | Response<any>>>(
            (dialogResult) => {
              if (dialogResult === SharedBasicDialogComponent.RESULT_APPROVED) {
                dialogRef.componentInstance.isProcessing = true;
                this._submitting = true;
                return this._categoryService.submitRestoreCategory(
                  this._category?.uid ?? ''
                );
              } else {
                return of(false);
              }
            }
          )
        )
        .subscribe({
          next: (result) => {
            if (result !== false) {
              this._submitting = false;
              dialogRef.close();
              this._snackBarService.open('Category restored.', undefined, {
                duration: SnackBarConfig.SUCCESS_DURATIONS,
              });
              setTimeout(() => {
                this._routerService.navigate(['/category'], {
                  queryParams: {
                    tab: 'trash',
                  },
                });
              }, 100);
            }
          },
          error: (error) => {
            this._submitting = false;
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
}
