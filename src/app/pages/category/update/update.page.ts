import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormData } from 'src/app/types/category.type';
import { CommonCategoryModifierPage } from '../show/show.page';

@Component({
  selector: 'app-page-category-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class CategoryUpdatePage extends CommonCategoryModifierPage {
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

  public update(category: CategoryFormData | undefined) {
    if (!this._submitting && category && this._category?.uid) {
      this._submitting = true;
      const submitUpdateCategorySubscriber = this._categoryService
        .submitUpdateCategory(this._category.uid, category)
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Category updated.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            setTimeout(() => {
              this._routerService.navigate(['/category']);
            }, 100);
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

      submitUpdateCategorySubscriber.add(() => {
        this._submitting = false;
        submitUpdateCategorySubscriber.unsubscribe();
      });
    }
  }
}
